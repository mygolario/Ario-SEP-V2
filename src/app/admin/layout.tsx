import { checkAdmin } from '@/app/actions/admin';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { LayoutDashboard, Users, FileText, ShieldAlert } from 'lucide-react';
import { TooltipProvider } from '@/components/ui/tooltip';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const isAdmin = await checkAdmin();
  if (!isAdmin) {
    redirect('/dashboard-v2');
  }

  return (
    <TooltipProvider>
      <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
        {/* Admin Sidebar */}
        <aside className="w-64 border-l bg-white dark:bg-slate-900 hidden md:flex flex-col">
          <div className="p-6 border-b">
            <Link
              href="/dashboard-v2"
              className="flex items-center gap-2 font-bold text-lg text-primary"
            >
              <ShieldAlert className="h-6 w-6" />
              پنل مدیریت
            </Link>
          </div>
          <nav className="flex-1 p-4 space-y-1">
            <Link
              href="/admin"
              className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg bg-primary/10 text-primary"
            >
              <LayoutDashboard className="h-4 w-4" />
              داشبورد
            </Link>
            <Link
              href="/admin/users"
              className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors"
            >
              <Users className="h-4 w-4" />
              کاربران
            </Link>
            <Link
              href="/admin/audit"
              className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors"
            >
              <FileText className="h-4 w-4" />
              لاگ سیستم
            </Link>
          </nav>
          <div className="p-4 border-t text-xs text-center text-muted-foreground">
            نسخه مدیریت v1.0
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 overflow-y-auto max-h-screen">{children}</main>
      </div>
    </TooltipProvider>
  );
}
