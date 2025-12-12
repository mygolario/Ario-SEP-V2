import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { z } from 'zod';

import { sanitizeLogoSvg } from '@/lib/security/sanitizeSvg';
import {
  BusinessPlanV1Schema,
  landingPageCopySchema,
  leanCanvasSchema,
} from '@/lib/validators/businessPlan';
import { assemblePlan } from '@/lib/plan/assemblePlan';
import type { BusinessPlanV1 } from '@/types/businessPlan';
import type { SectionKey } from '@/types/sections';
import { createClient } from '@/utils/supabase/server';

export const runtime = 'nodejs';

import { regenerateInputSchema } from '@/lib/validators/regenerate';

// Use strict validation for the request body
// imported from lib

// Validators for individual sections
const identitySchema = z.object({
  businessName: z.string().min(1),
  tagline: z.string().min(1),
  summary: z.string().min(1),
});

const brandingSchema = z.object({
  colorPalette: z.array(z.string()).min(4),
  logoSVG: z.string().optional(),
});

const roadmapSchema = z.object({
  marketingSteps: z.array(z.string()).length(5),
  roadmap: z.array(z.custom<unknown>()).length(4), // loose validation
});

// Helper to get schema for a section
const getSectionSchema = (key: SectionKey) => {
  switch (key) {
    case 'identity':
      return identitySchema;
    case 'branding':
      return brandingSchema;
    case 'landing':
      return z.object({ landingPageCopy: landingPageCopySchema });
    case 'lean_canvas':
      return z.object({ leanCanvas: leanCanvasSchema });
    case 'roadmap':
      return roadmapSchema;
    default:
      return z.any();
  }
};

const model = process.env.OPENROUTER_MODEL ?? 'google/gemini-3-pro-preview';

export async function POST(req: Request) {
  try {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const jsonBody = await req.json();
    const parsedBody = regenerateInputSchema.safeParse(jsonBody);

    if (!parsedBody.success) {
      return NextResponse.json(
        { error: 'Invalid request', details: parsedBody.error.flatten() },
        { status: 400 }
      );
    }

    const { projectId, sectionKey } = parsedBody.data;

    // 1. Verify ownership & Get Input Data
    const { data: project, error: projectError } = await supabase
      .from('projects')
      .select('inputs, id')
      .eq('id', projectId)
      .eq('user_id', user.id)
      .single();

    if (projectError || !project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    const inputs = project.inputs; // The original user inputs (idea, audience, etc.)

    // 2. Load latest version and sections to build context
    const { data: latestVersion, error: versionError } = await supabase
      .from('project_versions')
      .select('id, version')
      .eq('project_id', projectId)
      .order('version', { ascending: false })
      .limit(1)
      .single();

    if (versionError || !latestVersion) {
      return NextResponse.json({ error: 'No existing version found' }, { status: 404 });
    }

    const { data: currentSections, error: sectionsError } = await supabase
      .from('project_sections')
      .select('section_key, content')
      .eq('version_id', latestVersion.id);

    if (sectionsError) {
      return NextResponse.json({ error: 'Failed to load sections' }, { status: 500 });
    }

    // Assemble current plan to give AI context
    let currentPlan: BusinessPlanV1;
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      currentPlan = assemblePlan(currentSections as any[]);
    } catch (e) {
      console.warn('Current plan is incomplete, proceeding with partial context', e);
      // Fallback: create a partial object if possible, or just pass what we have
      currentPlan = {} as BusinessPlanV1; // Should mostly accept this if we are careful
    }

    // 3. Create NEW Version Atomically
    const { data: newVersionRows, error: rpcError } = await supabase.rpc('create_project_version', {
      p_project_id: projectId,
      p_model: model,
    });

    if (rpcError || !newVersionRows || newVersionRows.length === 0) {
      console.error('RPC Error:', rpcError);
      return NextResponse.json({ error: 'Failed to create new version' }, { status: 500 });
    }

    const newVersionId = newVersionRows[0].id;

    // 4. Initialize AI
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const openai = new OpenAI({
      apiKey,
      baseURL: 'https://openrouter.ai/api/v1',
    });

    // 5. Generate ONLY the requested section
    // We construct a specific prompt for this section
    const systemPrompt = `
You are an expert Startup Consultant specialized in the Iranian market.
Regenerate ONLY the "${sectionKey}" section of the business plan.
Inputs:
Idea: ${inputs.idea}
Audience: ${inputs.audience}
Vibe: ${inputs.vibe}
Goal: ${inputs.goal}

Current Plan Context (for reference):
${JSON.stringify(currentPlan, null, 2).slice(0, 3000)} ... (truncated)

Output strictly JSON for the requested section.
Language: Farsi (Persian).
`;

    let userPrompt = '';
    // const expectedFormat = {};

    // Define section-specific instructions
    if (sectionKey === 'identity') {
      userPrompt = `Generate valid JSON for:
{
  "businessName": "New creative name",
  "tagline": "New catchy slogan",
  "summary": "Revised executive summary"
}`;
    } else if (sectionKey === 'branding') {
      userPrompt = `Generate valid JSON for:
{
  "colorPalette": ["#hex", "#hex", "#hex", "#hex"],
  "logoSVG": "<svg>..."
}`;
    } else if (sectionKey === 'landing') {
      userPrompt = `Generate valid JSON for:
{
  "landingPageCopy": { ... full schema for landing page ... }
}`;
    } else if (sectionKey === 'lean_canvas') {
      userPrompt = `Generate valid JSON for:
{
  "leanCanvas": { ... full schema for lean canvas ... }
}`;
    } else if (sectionKey === 'roadmap') {
      userPrompt = `Generate valid JSON for:
{
  "marketingSteps": [...],
  "roadmap": [...]
}`;
    }

    const completion = await openai.chat.completions.create({
      model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      response_format: { type: 'json_object' },
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) throw new Error('No content from AI');

    const rawJson = JSON.parse(content);
    // Validate
    const sectionValidator = getSectionSchema(sectionKey);
    const validation = sectionValidator.safeParse(rawJson);

    if (!validation.success) {
      console.error('Validation failed for regenerated section:', validation.error);
      // Verify failed status
      await supabase.from('project_versions').update({ status: 'failed', error: 'Validation failed' }).eq('id', newVersionId);
      return NextResponse.json({ error: 'AI generated invalid data' }, { status: 500 });
    }

    const newSectionData = validation.data;

    // Sanitize if branding
    if (sectionKey === 'branding' && newSectionData.logoSVG) {
      newSectionData.logoSVG = sanitizeLogoSvg(newSectionData.logoSVG);
    }

    // 6. Copy OLD sections + Insert NEW section
    const sectionsToInsert = currentSections
      .filter((s) => s.section_key !== sectionKey) // Exclude old version of this key
      .map((s) => ({
        version_id: newVersionId,
        section_key: s.section_key,
        content: s.content,
      }));

    // Add new section
    sectionsToInsert.push({
      version_id: newVersionId,
      section_key: sectionKey,
      content: newSectionData,
    });

    const { error: insertError } = await supabase
      .from('project_sections')
      .insert(sectionsToInsert);

    if (insertError) {
      console.error('Section insert error:', insertError);
        await supabase.from('project_versions').update({ status: 'failed', error: insertError.message }).eq('id', newVersionId);
      return NextResponse.json({ error: 'Failed to save sections' }, { status: 500 });
    }

    // 7. Mark done
    await supabase.from('project_versions').update({ status: 'done' }).eq('id', newVersionId);

    return NextResponse.json({
      projectId,
      versionId: newVersionId,
      updatedSection: newSectionData,
    });

  } catch (error) {
    console.error('Regeneration error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
