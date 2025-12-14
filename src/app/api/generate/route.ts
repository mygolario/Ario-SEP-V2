import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { z } from 'zod';

import { sanitizeLogoSvg } from '@/lib/security/sanitizeSvg';
import { trackServerEvent } from '@/lib/telemetry/trackServerEvent';
import { BusinessPlanV1Schema } from '@/lib/validators/businessPlan';
import type { BusinessPlanV1 } from '@/types/businessPlan';
import { createClient } from '@/utils/supabase/server';
import { JourneyEngine, hydrateContent } from '@/lib/journey/engine';
import { UserProfile } from '@/types/businessPlan';

export const runtime = 'nodejs';

const model = process.env.OPENROUTER_MODEL ?? 'google/gemini-3-pro-preview';

const MAX_LIMIT = 1_000_000;

const parseLimit = (value: string | undefined, fallback: number) => {
  const parsed = Number(value);
  if (Number.isFinite(parsed) && parsed > 0) {
    return Math.min(parsed, MAX_LIMIT);
  }
  return fallback;
};

const GENERATE_DAILY_LIMIT = parseLimit(process.env.GENERATE_DAILY_LIMIT, MAX_LIMIT);

const generationInputSchema = z.object({
  idea: z.string().min(1, 'idea is required'),
  audience: z.string().min(1, 'audience is required'),
  vibe: z.string().min(1, 'vibe is required'),
  budget: z.string().min(1, 'budget is required'),
  goal: z.string().min(1, 'goal is required'),
  projectId: z.string().uuid().optional(),
  // Phase 6
  industry: z.string().optional(),
  city: z.string().optional(),
  timeline: z.string().optional(),
  skills: z.array(z.string()).optional(),
});

const systemPrompt = `
You are an expert Startup Consultant & AI Architect specialized in the Iranian market.
Return the Perfect V1 Pack as a single JSON object only (no markdown or extra prose). All text must be natural Farsi and RTL-friendly.

Schema:
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
    "features": [{ "title": "Feature Farsi", "description": "Benefit Farsi", "iconName": "Zap" }],
    "testimonials": [{ "name": "Name Farsi", "role": "Role Farsi", "quote": "Quote Farsi" }],
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
    { "week": "Week 1", "focus": "Farsi focus", "tasks": ["Task 1 Farsi", "Task 2 Farsi"] },
    { "week": "Week 2", "focus": "Farsi focus", "tasks": ["Task 1 Farsi", "Task 2 Farsi"] },
    { "week": "Week 3", "focus": "Farsi focus", "tasks": ["Task 1 Farsi", "Task 2 Farsi"] },
    { "week": "Week 4", "focus": "Farsi focus", "tasks": ["Task 1 Farsi", "Task 2 Farsi"] }
  ],
  "onePagePlan": {
    "title": "One-page plan title",
    "elevatorPitch": "Short convincing paragraph",
    "problem": "Problem statement",
    "solution": "Solution summary",
    "targetCustomer": "Target customer",
    "uniqueValue": "Unique value proposition",
    "businessModel": "Business model",
    "goToMarket": ["Step 1", "Step 2", "Step 3"],
    "keyMetrics": ["Metric 1", "Metric 2", "Metric 3"],
    "risks": ["Risk 1", "Risk 2", "Risk 3"],
    "next7Days": ["Action 1", "Action 2", "Action 3", "Action 4", "Action 5"]
  }
}

Rules:
- Output JSON only. No markdown/code fences/extra commentary.
- colorPalette must contain 4-6 valid hex colors that pair well.
- marketingSteps must have exactly 5 items.
- roadmap must have exactly 4 items with at least one task each.
- onePagePlan must be present; goToMarket/keyMetrics/risks need >= 3 items; next7Days needs >= 5 items.
- Keep responses concise and specific to the provided idea, audience, vibe, budget, and goal.
`;

const repairPrompt = `
You are a strict JSON repair bot for the Perfect V1 Pack schema described above.
Rules:
- Output JSON only, no prose or markdown.
- Preserve Farsi content.
- Ensure onePagePlan exists and all its fields are present.
- colorPalette entries are valid hex strings (length 4-6).
- marketingSteps must be exactly 5 items, roadmap exactly 4 items with at least one task each.
- goToMarket/keyMetrics/risks must have at least 3 items; next7Days at least 5 items.
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

const ensureOnePagePlan = (plan: BusinessPlanV1 | undefined) =>
  plan?.onePagePlan ? plan : undefined;

type LimitCheckResult = {
  allowed: boolean;
  used: number;
  remaining: number;
};

export async function POST(req: Request) {
  const supabase = createClient();
  const startTime = Date.now();
  let userId: string | null = null;
  let projectIdForTelemetry: string | undefined;
  let versionIdForTelemetry: string | undefined;

  console.log('[Generate API] Started', { method: req.method });

  try {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (!user) {
      console.error('[Generate API] Auth failed or missing user', authError);
      return NextResponse.json({ error: 'Unauthorized: User not logged in' }, { status: 401 });
    }
    console.log('[Generate API] User authenticated', { userId: user.id });

    // Debug OpenRouter Key presence (don't log the key itself!)
    if (!process.env.OPENROUTER_API_KEY) console.error('[Generate API] Missing OPENROUTER_API_KEY');
    else
      console.log(
        '[Generate API] Has OPENROUTER_API_KEY length:',
        process.env.OPENROUTER_API_KEY.length
      );
    console.log('[Generate API] Using Model:', process.env.OPENROUTER_MODEL ?? 'DEFAULT_FALLBACK');

    userId = user.id;

    const jsonBody = await req.json();
    const parsedBody = generationInputSchema.safeParse(jsonBody);

    if (!parsedBody.success) {
      return NextResponse.json(
        { error: 'Invalid request payload', details: parsedBody.error.flatten() },
        { status: 400 }
      );
    }

    const { idea, audience, vibe, budget, goal, projectId, industry, city, timeline, skills } =
      parsedBody.data;
    projectIdForTelemetry = projectId ?? undefined;

    // Phase 6: Journey Engine Setup
    // We prepare this early but hydrate it after we get the main plan (for business name etc)
    // Map industry to keys
    let mappedIndustry = industry || 'general';
    if (industry?.includes('Ecommerce')) mappedIndustry = 'ecommerce';
    else if (industry?.includes('Service')) mappedIndustry = 'service';
    else if (industry?.includes('Tech')) mappedIndustry = 'tech';
    else if (industry?.includes('Education')) mappedIndustry = 'education';

    const userProfile: UserProfile = {
      industry: mappedIndustry,
      city: city || 'tehran',
      budget: budget,
      timeline: timeline || 'asap',
      skills: skills || [],
      goal: goal,
    };
    const engine = new JourneyEngine();
    // We generate the structure now, deterministic based on inputs (or random seed if we prefer uniqueness)
    // Engine uses internal seed.
    const journeyPlan = engine.generate(userProfile);

    const { data: limitRow, error: limitError } = await supabase
      .rpc('check_and_increment_daily', {
        kind: 'generate',
        limit: GENERATE_DAILY_LIMIT,
      })
      .single<LimitCheckResult>();

    if (limitError) {
      console.error('Limit check failed:', limitError);
      await trackServerEvent({
        event: 'generation_failed',
        properties: {
          projectId: projectIdForTelemetry ?? null,
          model,
          error: 'limit_check_failed',
          durationMs: Date.now() - startTime,
        },
        userId,
        supabase,
      });
      return NextResponse.json({ error: 'خطا در بررسی محدودیت روزانه' }, { status: 500 });
    }

    if (!limitRow?.allowed) {
      await trackServerEvent({
        event: 'generation_failed',
        properties: {
          projectId: projectIdForTelemetry ?? null,
          model,
          error: 'limit_reached',
          used: limitRow?.used ?? 0,
          remaining: limitRow?.remaining ?? 0,
          durationMs: Date.now() - startTime,
        },
        userId,
        supabase,
      });
      return NextResponse.json(
        {
          error: 'سقف روزانه تولید به پایان رسیده است.',
          used: limitRow?.used ?? 0,
          remaining: limitRow?.remaining ?? 0,
        },
        { status: 429 }
      );
    }

    const apiKey = process.env.OPENROUTER_API_KEY;

    if (!apiKey) {
      console.error('OPENROUTER_API_KEY not configured');
      return NextResponse.json({ error: 'Configuration error: missing API key' }, { status: 500 });
    }

    await trackServerEvent({
      event: 'generation_started',
      properties: {
        projectId: projectIdForTelemetry ?? null,
        model,
      },
      userId,
      supabase,
    });

    const openai = new OpenAI({
      apiKey,
      baseURL: 'https://openrouter.ai/api/v1',
    });

    console.log('[Generate API] Sending request to OpenRouter...', { model });

    const completion = await openai.chat.completions.create({
      model,
      messages: [
        { role: 'system', content: systemPrompt },
        {
          role: 'user',
          content: `Idea: ${idea}\nAudience: ${audience}\nVibe: ${vibe}\nBudget: ${budget}\nGoal: ${goal}\n\nReturn ONLY the Perfect V1 Pack JSON.`,
        },
      ],
      response_format: { type: 'json_object' },
    });

    const content = completion.choices[0]?.message?.content;

    if (!content) {
      await trackServerEvent({
        event: 'generation_failed',
        properties: {
          projectId: projectIdForTelemetry ?? null,
          model,
          error: 'empty_completion',
          durationMs: Date.now() - startTime,
        },
        userId,
        supabase,
      });
      return NextResponse.json({ error: 'No content returned from model' }, { status: 500 });
    }

    const initialJson = parsePlan(content);
    const initialValidation = initialJson ? BusinessPlanV1Schema.safeParse(initialJson) : null;

    let parsedPlan: BusinessPlanV1 | undefined = ensureOnePagePlan(
      initialValidation?.success ? initialValidation.data : undefined
    );

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

      parsedPlan = ensureOnePagePlan(
        repairedValidation?.success ? repairedValidation.data : undefined
      );

      if (!parsedPlan) {
        await trackServerEvent({
          event: 'generation_failed',
          properties: {
            projectId: projectIdForTelemetry ?? null,
            model,
            error: 'repair_failed',
            durationMs: Date.now() - startTime,
          },
          userId,
          supabase,
        });
        return NextResponse.json(
          { error: 'Unable to repair generation to a valid Perfect V1 Pack' },
          { status: 500 }
        );
      }
    }

    const sanitizedPlan = sanitizePlan(parsedPlan);

    // Phase 6: Hydrate Journey Content
    journeyPlan.sections.forEach((section) => {
      section.blocks.forEach((block) => {
        block.content = hydrateContent(block.content, {
          businessName: sanitizedPlan.businessName,
          industry: userProfile.industry === 'general' ? 'کسب‌وکار شما' : userProfile.industry,
          uniqueValue: sanitizedPlan.onePagePlan?.uniqueValue || 'ارزش پیشنهادی منحصر به فرد',
          audience: audience,
          businessModel: sanitizedPlan.onePagePlan?.businessModel || 'مدل کسب‌وکار',
          timeline: userProfile.timeline === 'asap' ? 'سه ماه آینده' : userProfile.timeline,
          budget: budget,
        });
      });
    });

    if (!sanitizedPlan.onePagePlan) {
      await trackServerEvent({
        event: 'generation_failed',
        properties: {
          projectId: projectIdForTelemetry ?? null,
          model,
          error: 'missing_one_page_plan',
          durationMs: Date.now() - startTime,
        },
        userId,
        supabase,
      });
      return NextResponse.json(
        { error: 'Generated plan is missing onePagePlan section' },
        { status: 500 }
      );
    }

    // Use existing project if provided, otherwise create a new one
    let projectIdToUse: string;

    if (projectId) {
      const { data: existingProject, error: projectLookupError } = await supabase
        .from('projects')
        .select('id')
        .eq('id', projectId)
        .eq('user_id', user.id)
        .maybeSingle();

      if (projectLookupError) {
        console.error('Database Error (project lookup):', projectLookupError);
        return NextResponse.json(
          { error: 'Database error during project lookup' },
          { status: 500 }
        );
      }

      if (!existingProject) {
        return NextResponse.json({ error: 'Project not found' }, { status: 404 });
      }

      projectIdToUse = existingProject.id;
    } else {
      const { data: newProject, error: projectError } = await supabase
        .from('projects')
        .insert({
          user_id: user.id,
          title: idea?.slice(0, 80) || 'New Project',
          inputs: parsedBody.data,
        })
        .select('id')
        .single();

      if (projectError || !newProject) {
        console.error('Database Error (project):', projectError);
        return NextResponse.json({ error: 'Database error creating project' }, { status: 500 });
      }

      projectIdToUse = newProject.id;
    }

    projectIdForTelemetry = projectIdToUse;

    // Determine next version
    const { data: latestVersion, error: versionLookupError } = await supabase
      .from('project_versions')
      .select('version')
      .eq('project_id', projectIdToUse)
      .order('version', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (versionLookupError) {
      console.error('Database Error (version lookup):', versionLookupError);
      return NextResponse.json({ error: 'Database error during version lookup' }, { status: 500 });
    }

    const nextVersion = latestVersion?.version ? latestVersion.version + 1 : 1;

    const { data: versionRow, error: versionInsertError } = await supabase
      .from('project_versions')
      .insert({
        project_id: projectIdToUse,
        version: nextVersion,
        status: 'generating',
        model,
      })
      .select('id')
      .single();

    if (versionInsertError || !versionRow) {
      console.error('Database Error (version insert):', versionInsertError);
      return NextResponse.json({ error: 'Database error creating version' }, { status: 500 });
    }

    versionIdForTelemetry = versionRow.id;

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
      {
        section_key: 'one_page_plan',
        content: sanitizedPlan.onePagePlan,
      },
      // Phase 6
      {
        section_key: 'journey',
        content: journeyPlan,
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

      await trackServerEvent({
        event: 'generation_failed',
        properties: {
          projectId: projectIdForTelemetry ?? null,
          versionId: versionIdForTelemetry ?? null,
          model,
          error: 'sections_insert_failed',
          durationMs: Date.now() - startTime,
        },
        userId,
        supabase,
      });

      return NextResponse.json({ error: 'Database error saving sections' }, { status: 500 });
    }

    await supabase.from('project_versions').update({ status: 'done' }).eq('id', versionRow.id);

    await trackServerEvent({
      event: 'generation_success',
      properties: {
        projectId: projectIdForTelemetry ?? null,
        versionId: versionIdForTelemetry ?? null,
        model,
        durationMs: Date.now() - startTime,
      },
      userId,
      supabase,
    });

    console.log('[Generate API] Success. Returning JSON.');

    return NextResponse.json({
      ...sanitizedPlan,
      projectId: projectIdToUse,
      versionId: versionRow.id,
    });
  } catch (error) {
    console.error('[Generate API] CRITICAL FAILURE:', error);
    if (error instanceof Error) {
      console.error('Error Name:', error.name);
      console.error('Error Message:', error.message);
      console.error('Error Stack:', error.stack);
    }

    await trackServerEvent({
      event: 'generation_failed',
      properties: {
        projectId: projectIdForTelemetry ?? null,
        versionId: versionIdForTelemetry ?? null,
        model,
        error: error instanceof Error ? error.message : 'unknown_error',
        durationMs: Date.now() - startTime,
      },
      userId,
      supabase,
    });

    return NextResponse.json({ error: 'Failed to generate plan' }, { status: 500 });
  }
}
