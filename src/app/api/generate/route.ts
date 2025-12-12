import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { z } from 'zod';

import { sanitizeLogoSvg } from '@/lib/security/sanitizeSvg';
import { BusinessPlanV1Schema } from '@/lib/validators/businessPlan';
import type { BusinessPlanV1 } from '@/types/businessPlan';
import { createClient } from '@/utils/supabase/server';

export const runtime = 'nodejs';

const model = process.env.OPENROUTER_MODEL ?? 'google/gemini-3-pro-preview';

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: 'https://openrouter.ai/api/v1',
});

const generationInputSchema = z.object({
  idea: z.string().min(1, 'idea is required'),
  audience: z.string().min(1, 'audience is required'),
  vibe: z.string().min(1, 'vibe is required'),
  budget: z.string().min(1, 'budget is required'),
  goal: z.string().min(1, 'goal is required'),
});

const systemPrompt = `
You are an expert Startup Consultant & AI Architect specialized in the Iranian market.
Your task is to generate a concise, production-ready business plan (Farsi-only, RTL-friendly).

Output Format: JSON only. No markdown. No intro/outro text.
Structure (must match exactly):
{
  "businessName": "Creative modern Farsi name",
  "tagline": "Catchy Farsi slogan",
  "summary": "2-3 paragraph executive summary in Farsi",
  "colorPalette": ["#HEX", "#HEX", "#HEX", "#HEX"] (4-6 valid hex values),
  "logoSVG": "<svg...>" optional,
  "marketingSteps": ["Step 1 Farsi", "Step 2 Farsi", "Step 3 Farsi", "Step 4 Farsi", "Step 5 Farsi"],
  "landingPageCopy": {
    "headline": "High-converting H1 in Farsi",
    "subheadline": "Persuasive H2 in Farsi",
    "cta": "Call to action in Farsi",
    "features": [
      { "title": "Feature Farsi", "description": "Benefit Farsi", "iconName": "Zap" }
    ],
    "testimonials": [
      { "name": "Name Farsi", "role": "Role Farsi", "quote": "Quote Farsi" }
    ],
    "footer": { "copyrightText": "Copyright text Farsi", "socialLinks": ["Instagram", "LinkedIn"] }
  },
  "leanCanvas": {
    "problem": "Farsi problem summary",
    "solution": "Farsi solution summary",
    "uniqueValue": "Farsi unique value",
    "unfairAdvantage": "Farsi unfair advantage",
    "customerSegments": "Farsi target segments",
    "channels": "Farsi channels",
    "revenueStream": "Farsi revenue stream",
    "costStructure": "Farsi cost structure"
  },
  "roadmap": [
    { "week": "هفته ۱", "focus": "Farsi focus", "tasks": ["Task 1 Farsi", "Task 2 Farsi"] },
    { "week": "هفته ۲", "focus": "Farsi focus", "tasks": ["Task 1 Farsi", "Task 2 Farsi"] },
    { "week": "هفته ۳", "focus": "Farsi focus", "tasks": ["Task 1 Farsi", "Task 2 Farsi"] },
    { "week": "هفته ۴", "focus": "Farsi focus", "tasks": ["Task 1 Farsi", "Task 2 Farsi"] }
  ]
}

Guardrails:
- All strings must be natural Farsi (no transliteration).
- Keep answers concise and specific to the provided idea, audience, vibe, budget, and goal.
- colorPalette should use valid hex codes and pair well together.
- Roadmap tasks must be actionable for an Iran-based founder.
- Do not add fields outside this structure.
`;

const repairPrompt = `
You are a strict JSON repair bot. Fix the provided JSON so it matches the exact BusinessPlanV1 schema described above.
Rules:
- Output JSON only, no prose.
- Preserve Farsi content.
- Ensure colorPalette entries are valid hex strings and length 4-6.
- marketingSteps must be exactly 5 items, roadmap exactly 4 items.
`;

const sanitizePlan = (plan: BusinessPlanV1): BusinessPlanV1 => ({
  ...plan,
  logoSVG: sanitizeLogoSvg(plan.logoSVG),
});

const parsePlan = (content: string) => {
  try {
    return JSON.parse(content);
  } catch {
    return null;
  }
};

export async function POST(req: Request) {
  try {
    const supabase = createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (!user) {
      console.error('User not authenticated:', authError);
      return NextResponse.json({ error: 'Unauthorized: User not logged in' }, { status: 401 });
    }

    const jsonBody = await req.json();
    const parsedBody = generationInputSchema.safeParse(jsonBody);

    if (!parsedBody.success) {
      return NextResponse.json(
        { error: 'Invalid request payload', details: parsedBody.error.flatten() },
        { status: 400 }
      );
    }

    const { idea, audience, vibe, budget, goal } = parsedBody.data;

    const completion = await openai.chat.completions.create({
      model,
      messages: [
        { role: 'system', content: systemPrompt },
        {
          role: 'user',
          content: `Idea: ${idea}\nAudience: ${audience}\nVibe: ${vibe}\nBudget: ${budget}\nGoal: ${goal}\n\nGenerate the complete JSON business plan.`,
        },
      ],
      response_format: { type: 'json_object' },
    });

    const content = completion.choices[0]?.message?.content;

    if (!content) {
      return NextResponse.json(
        { error: 'پاسخی از مدل دریافت نشد. لطفاً دوباره تلاش کنید.' },
        { status: 500 }
      );
    }

    const initialJson = parsePlan(content);
    const initialValidation = initialJson ? BusinessPlanV1Schema.safeParse(initialJson) : null;

    let parsedPlan: BusinessPlanV1 | undefined = initialValidation?.success
      ? initialValidation.data
      : undefined;

    if (!parsedPlan) {
      const repairCompletion = await openai.chat.completions.create({
        model,
        messages: [
          { role: 'system', content: repairPrompt },
          { role: 'system', content: systemPrompt },
          {
            role: 'user',
            content: `Invalid JSON:\n${content}\n\nFix to match schema exactly and return JSON only.`,
          },
        ],
        response_format: { type: 'json_object' },
      });

      const repairedContent = repairCompletion.choices[0]?.message?.content;
      const repairedJson = repairedContent ? parsePlan(repairedContent) : null;
      const repairedValidation = repairedJson ? BusinessPlanV1Schema.safeParse(repairedJson) : null;

      if (repairedValidation?.success) {
        parsedPlan = repairedValidation.data;
      } else {
        return NextResponse.json(
          {
            error: 'امکان تولید طرح معتبر نبود. لطفاً دوباره تلاش کنید.',
            details: repairedValidation?.error?.flatten?.(),
          },
          { status: 500 }
        );
      }
    }

    const sanitizedPlan = sanitizePlan(parsedPlan);

    // Create project
    const { data: project, error: projectError } = await supabase
      .from('projects')
      .insert({
        user_id: user.id,
        title: idea?.slice(0, 80) || 'پروژه جدید',
        inputs: parsedBody.data,
      })
      .select('id')
      .single();

    if (projectError || !project) {
      console.error('Database Error (project):', projectError);
      return NextResponse.json({ error: 'ثبت پروژه ناموفق بود.' }, { status: 500 });
    }

    // Determine next version
    const { data: latestVersion, error: versionLookupError } = await supabase
      .from('project_versions')
      .select('version')
      .eq('project_id', project.id)
      .order('version', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (versionLookupError) {
      console.error('Database Error (version lookup):', versionLookupError);
      return NextResponse.json({ error: 'ثبت نسخه ناموفق بود.' }, { status: 500 });
    }

    const nextVersion = latestVersion?.version ? latestVersion.version + 1 : 1;

    const { data: versionRow, error: versionInsertError } = await supabase
      .from('project_versions')
      .insert({
        project_id: project.id,
        version: nextVersion,
        status: 'generating',
        model,
      })
      .select('id')
      .single();

    if (versionInsertError || !versionRow) {
      console.error('Database Error (version insert):', versionInsertError);
      return NextResponse.json({ error: 'ثبت نسخه ناموفق بود.' }, { status: 500 });
    }

    // Split into sections
    const sections = [
      {
        section_key: 'identity',
        content: {
          businessName: sanitizedPlan.businessName,
          tagline: sanitizedPlan.tagline,
          summary: sanitizedPlan.summary,
        },
      },
      {
        section_key: 'branding',
        content: {
          colorPalette: sanitizedPlan.colorPalette,
          logoSVG: sanitizedPlan.logoSVG,
        },
      },
      {
        section_key: 'landing',
        content: {
          landingPageCopy: sanitizedPlan.landingPageCopy,
        },
      },
      {
        section_key: 'lean_canvas',
        content: {
          leanCanvas: sanitizedPlan.leanCanvas,
        },
      },
      {
        section_key: 'roadmap',
        content: {
          roadmap: sanitizedPlan.roadmap,
          marketingSteps: sanitizedPlan.marketingSteps,
        },
      },
    ];

    const { error: sectionsError } = await supabase
      .from('project_sections')
      .insert(sections.map((s) => ({ ...s, version_id: versionRow.id })));

    if (sectionsError) {
      console.error('Database Error (sections insert):', sectionsError);
      await supabase
        .from('project_versions')
        .update({ status: 'failed', error: sectionsError.message })
        .eq('id', versionRow.id);
      return NextResponse.json({ error: 'ثبت بخش‌ها ناموفق بود.' }, { status: 500 });
    }

    await supabase.from('project_versions').update({ status: 'done' }).eq('id', versionRow.id);

    return NextResponse.json({ ...sanitizedPlan, projectId: project.id, versionId: versionRow.id });
  } catch (error) {
    console.error('Error generating plan:', error);
    return NextResponse.json(
      { error: 'در فرآیند تولید خطا رخ داد. لطفاً دوباره تلاش کنید.' },
      { status: 500 }
    );
  }
}
