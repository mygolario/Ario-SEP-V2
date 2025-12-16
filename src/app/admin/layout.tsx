import { redirect } from 'next/navigation';
import { checkIsAdmin } from '@/lib/admin';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { Topbar } from '@/components/dashboard-v2/Topbar'; // Reusing Topbar for consistency
import { ToastProvider } from '@/components/ui/toast';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const isAdmin = await checkIsAdmin();

  if (!isAdmin) {
    redirect('/dashboard-v2');
  }

  return (
    <ToastProvider>
      <div className="min-h-screen bg-gray-50/50 dark:bg-zinc-950" dir="rtl">
        <AdminSidebar />
        <Topbar />
        <div className="pt-16 mr-64">
          <main className="p-6">{children}</main>
        </div>
      </div>
    </ToastProvider>
  );
}
