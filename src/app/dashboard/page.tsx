import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import DashboardClient from '@/components/dashboard/DashboardClient';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Manage your startup empire',
};

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: { projectId?: string }
}) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  let projectData = null;

  if (searchParams.projectId) {
     const { data: project } = await supabase
        .from('projects')
        .select('*')
        .eq('id', searchParams.projectId)
        .eq('user_id', user.id)
        .single();
     
     if (project) {
        projectData = project.business_data;
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
          projectData = projects[0].business_data;
      }
  }

  return <DashboardClient initialData={projectData} />;
}
