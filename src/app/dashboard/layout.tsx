import { createClient } from '@/utils/supabase/server';
import { LayoutShell } from '@/components/dashboard/LayoutShell';
import { TourGuide } from '@/components/dashboard/TourGuide';
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
      <TourGuide />
      {children}
    </LayoutShell>
  );
}
