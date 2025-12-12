import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { z } from 'zod';

import { assemblePlan } from '@/lib/plan/assemblePlan';
import { sanitizeLogoSvg } from '@/lib/security/sanitizeSvg';
import { onePagePlanSchema } from '@/lib/validators/businessPlan';
import type { BusinessPlanV1 } from '@/types/businessPlan';
import type { SectionKey } from '@/types/sections';
import { createClient } from '@/utils/supabase/server';

export const runtime = 'nodejs';

const model = process.env.OPENROUTER_MODEL ?? 'google/gemini-3-pro-preview';

const regenerateSchema = z.object({
  projectId: z.string().uuid(),
  sectionKey: z.literal('one_page_plan'),
});

const systemPrompt = `
You are regenerating ONLY the onePagePlan object for the Perfect V1 Pack.
Return a JSON object with the onePagePlan fields only (no wrapping object, no markdown, no prose).
Schema:
{
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
Rules:
- All text must be natural Farsi.
- goToMarket/keyMetrics/risks need at least 3 concise bullet items.
- next7Days needs at least 5 concise action items.
- Do not include any fields outside this schema.`;

const repairPrompt = `
You are a strict JSON repair bot for the onePagePlan schema above.
Rules:
- Output JSON only, no markdown or prose.
- Ensure all fields exist and meet the minimum list lengths.
- Preserve Farsi content while fixing structure or formatting.`;

const parseJson = (content: string) => {
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

    const body = await req.json();
    const parsedBody = regenerateSchema.safeParse(body);

    if (!parsedBody.success) {
      return NextResponse.json(
        { error: 'Invalid request payload', details: parsedBody.error.flatten() },
        { status: 400 }
      );
    }

    const { projectId } = parsedBody.data;

    const apiKey = process.env.OPENROUTER_API_KEY;

    if (!apiKey) {
      console.error('OPENROUTER_API_KEY not configured');
      return NextResponse.json({ error: 'Configuration error: missing API key' }, { status: 500 });
    }

    const openai = new OpenAI({
      apiKey,
      baseURL: 'https://openrouter.ai/api/v1',
    });

    const { data: project, error: projectError } = await supabase
      .from('projects')
      .select('id, inputs, user_id')
      .eq('id', projectId)
      .eq('user_id', user.id)
      .single();

    if (projectError || !project) {
      console.error('Database Error (project lookup):', projectError);
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    const { data: latestVersion, error: versionLookupError } = await supabase
      .from('project_versions')
      .select('id, version')
      .eq('project_id', projectId)
      .order('version', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (versionLookupError) {
      console.error('Database Error (version lookup):', versionLookupError);
      return NextResponse.json({ error: 'Database error during version lookup' }, { status: 500 });
    }

    if (!latestVersion) {
      return NextResponse.json({ error: 'No versions found for project' }, { status: 404 });
    }

    const { data: latestSections, error: sectionLookupError } = await supabase
      .from('project_sections')
      .select('section_key, content')
      .eq('version_id', latestVersion.id);

    if (sectionLookupError) {
      console.error('Database Error (sections lookup):', sectionLookupError);
      return NextResponse.json({ error: 'Database error during sections lookup' }, { status: 500 });
    }

    const normalizedSections =
      latestSections?.map((section) => ({
        section_key: section.section_key as SectionKey,
        content: section.content as unknown,
      })) ?? [];

    let currentPlan: BusinessPlanV1;

    try {
      currentPlan = assemblePlan(normalizedSections);
    } catch (err) {
      console.error('Failed to assemble existing plan:', err);
      return NextResponse.json(
        { error: 'Existing plan is incomplete; generate a full plan first' },
        { status: 400 }
      );
    }

    // Build context for the model
    const contextPayload = {
      businessName: currentPlan.businessName,
      summary: currentPlan.summary,
      tagline: currentPlan.tagline,
      leanCanvas: currentPlan.leanCanvas,
      marketingSteps: currentPlan.marketingSteps,
      roadmap: currentPlan.roadmap,
      inputs: project.inputs,
    };

    const completion = await openai.chat.completions.create({
      model,
      messages: [
        { role: 'system', content: systemPrompt },
        {
          role: 'user',
          content: `Use the existing Perfect V1 Pack details below to regenerate ONLY the onePagePlan JSON object.\n\nContext:\n${JSON.stringify(
            contextPayload,
            null,
            2
          )}`,
        },
      ],
      response_format: { type: 'json_object' },
    });

    const content = completion.choices[0]?.message?.content;

    if (!content) {
      return NextResponse.json({ error: 'No content returned from model' }, { status: 500 });
    }

    const parsedJson = parseJson(content);
    const initialValidation = parsedJson ? onePagePlanSchema.safeParse(parsedJson) : null;

    let onePagePlan = initialValidation?.success ? initialValidation.data : undefined;

    if (!onePagePlan) {
      const repairCompletion = await openai.chat.completions.create({
        model,
        messages: [
          { role: 'system', content: repairPrompt },
          { role: 'system', content: systemPrompt },
          {
            role: 'user',
            content: `Invalid onePagePlan JSON:\n${content}\n\nFix to match schema exactly and return JSON only.`,
          },
        ],
        response_format: { type: 'json_object' },
      });

      const repairedContent = repairCompletion.choices[0]?.message?.content;
      const repairedJson = repairedContent ? parseJson(repairedContent) : null;
      const repairedValidation = repairedJson ? onePagePlanSchema.safeParse(repairedJson) : null;

      if (repairedValidation?.success) {
        onePagePlan = repairedValidation.data;
      } else {
        return NextResponse.json(
          { error: 'Unable to repair onePagePlan generation' },
          { status: 500 }
        );
      }
    }

    const sanitizedPlan: BusinessPlanV1 = {
      ...currentPlan,
      logoSVG: sanitizeLogoSvg(currentPlan.logoSVG),
      onePagePlan,
    };

    const nextVersion = latestVersion.version ? latestVersion.version + 1 : 1;

    const { data: versionRow, error: versionInsertError } = await supabase
      .from('project_versions')
      .insert({
        project_id: projectId,
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

    const sectionsToInsert = [
      {
        section_key: 'identity' as const,
        content: {
          businessName: sanitizedPlan.businessName,
          tagline: sanitizedPlan.tagline,
          summary: sanitizedPlan.summary,
        },
        version_id: versionRow.id,
      },
      {
        section_key: 'branding' as const,
        content: {
          colorPalette: sanitizedPlan.colorPalette,
          logoSVG: sanitizedPlan.logoSVG,
        },
        version_id: versionRow.id,
      },
      {
        section_key: 'landing' as const,
        content: {
          landingPageCopy: sanitizedPlan.landingPageCopy,
        },
        version_id: versionRow.id,
      },
      {
        section_key: 'lean_canvas' as const,
        content: {
          leanCanvas: sanitizedPlan.leanCanvas,
        },
        version_id: versionRow.id,
      },
      {
        section_key: 'roadmap' as const,
        content: {
          roadmap: sanitizedPlan.roadmap,
          marketingSteps: sanitizedPlan.marketingSteps,
        },
        version_id: versionRow.id,
      },
      {
        section_key: 'one_page_plan' as const,
        content: sanitizedPlan.onePagePlan,
        version_id: versionRow.id,
      },
    ];

    const { error: sectionsInsertError } = await supabase
      .from('project_sections')
      .insert(sectionsToInsert);

    if (sectionsInsertError) {
      console.error('Database Error (sections insert):', sectionsInsertError);
      await supabase
        .from('project_versions')
        .update({ status: 'failed', error: sectionsInsertError.message })
        .eq('id', versionRow.id);
      return NextResponse.json(
        { error: 'Database error saving regenerated section' },
        { status: 500 }
      );
    }

    await supabase.from('project_versions').update({ status: 'done' }).eq('id', versionRow.id);

    return NextResponse.json({
      ...sanitizedPlan,
      projectId,
      versionId: versionRow.id,
    });
  } catch (error) {
    console.error('Error regenerating plan:', error);
    return NextResponse.json({ error: 'Failed to regenerate section' }, { status: 500 });
  }
}
