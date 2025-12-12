import { redirect } from 'next/navigation';

import DashboardClient from '@/components/dashboard/DashboardClient';
import { sanitizeLogoSvg } from '@/lib/security/sanitizeSvg';
import { BusinessPlanV1Schema } from '@/lib/validators/businessPlan';
import type { BusinessPlanV1 } from '@/types/businessPlan';
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

  let projectData: BusinessPlanV1 | null = null;

  if (searchParams.projectId) {
    const { data: project } = await supabase
      .from('projects')
      .select('*')
      .eq('id', searchParams.projectId)
      .eq('user_id', user.id)
      .single();

    if (project) {
      const parsedProject = BusinessPlanV1Schema.safeParse(project.business_data);
      if (parsedProject.success) {
        projectData = {
          ...parsedProject.data,
          logoSVG: sanitizeLogoSvg(parsedProject.data.logoSVG),
        };
      }
    }
  }

  if (!projectData) {
    // Fallback to latest
    const { data: projects } = await supabase
      .from('projects')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(1);

    if (projects && projects.length > 0) {
      const parsedProject = BusinessPlanV1Schema.safeParse(projects[0].business_data);
      if (parsedProject.success) {
        projectData = {
          ...parsedProject.data,
          logoSVG: sanitizeLogoSvg(parsedProject.data.logoSVG),
        };
      }
    }
  }

  return <DashboardClient initialData={projectData} />;
}
