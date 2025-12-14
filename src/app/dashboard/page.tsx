import { redirect } from 'next/navigation';

import DashboardClient from '@/components/dashboard/DashboardClient';
import { assemblePlan } from '@/lib/plan/assemblePlan';
import { sanitizeLogoSvg } from '@/lib/security/sanitizeSvg';
import { BusinessPlanV1Schema } from '@/lib/validators/businessPlan';
import type { BusinessPlanV1 } from '@/types/businessPlan';
import type { SectionKey } from '@/types/sections';
import { createClient } from '@/utils/supabase/server';

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: { projectId?: string };
}) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  let projectId = searchParams.projectId;
  let projectData: BusinessPlanV1 | null = null;
  let versionId: string | undefined;

  if (!projectId) {
    const { data: projects } = await supabase
      .from('projects')
      .select('id')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false, nullsFirst: false })
      .limit(1);

    if (projects && projects.length > 0) {
      projectId = projects[0].id;
    }
  }

  if (projectId) {
    const { data: latestVersion } = await supabase
      .from('project_versions')
      .select('id')
      .eq('project_id', projectId)
      .order('version', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (latestVersion?.id) {
      versionId = latestVersion.id;
      const { data: sections } = await supabase
        .from('project_sections')
        .select('section_key, content')
        .eq('version_id', latestVersion.id);

      if (sections && sections.length > 0) {
        try {
          const normalized = sections.map((section) => ({
            section_key: section.section_key as SectionKey,
            content: section.content as unknown,
          }));
          projectData = assemblePlan(normalized);
        } catch {
          projectData = null;
        }
      }
    }

    if (!projectData) {
      const { data: project } = await supabase
        .from('projects')
        .select('*')
        .eq('id', projectId)
        .eq('user_id', user.id)
        .single();

      if (project) {
        const parsedProject = BusinessPlanV1Schema.safeParse(
          (project as { business_data?: unknown }).business_data
        );
        if (parsedProject.success) {
          projectData = {
            ...parsedProject.data,
            logoSVG: sanitizeLogoSvg(parsedProject.data.logoSVG),
          };
        }
      }
    }
  }

  return (
    <DashboardClient
      initialData={projectData}
      projectId={projectId}
      versionId={versionId}
      userId={user.id}
    />
  );
}
