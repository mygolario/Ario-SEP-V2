import { createClient } from '@/utils/supabase/server';
import { LayoutShell } from '@/components/dashboard/LayoutShell';
import { redirect } from 'next/navigation';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const { data: projects } = await supabase
    .from('projects')
    .select('id, title')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  return (
    <LayoutShell user={user} projects={projects || []}>
      {children}
    </LayoutShell>
  );
}
