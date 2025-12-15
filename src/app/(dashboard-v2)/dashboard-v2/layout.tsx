import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import { Sidebar } from '@/components/dashboard-v2/Sidebar';
import { Topbar } from '@/components/dashboard-v2/Topbar';

export default async function DashboardV2Layout({ children }: { children: React.ReactNode }) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login?next=/dashboard-v2');
  }

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-zinc-950" dir="rtl">
      <Sidebar />
      <Topbar />
      <div className="pt-16 mr-64">
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
