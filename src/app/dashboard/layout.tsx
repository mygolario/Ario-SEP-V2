import { createClient } from '@/utils/supabase/server';
import { LayoutShell } from '@/components/dashboard/LayoutShell';
import SentryTest from '@/components/debug/SentryTest';
import { redirect } from 'next/navigation';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <LayoutShell user={user}>
      {children}
      <SentryTest />
    </LayoutShell>
  );
}
