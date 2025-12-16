'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { LayoutDashboard, Users, FileText, ShieldCheck } from 'lucide-react';

const sidebarItems = [
  {
    title: 'پیشخوان',
    href: '/admin',
    icon: LayoutDashboard,
  },
  {
    title: 'کاربران',
    href: '/admin/users',
    icon: Users,
  },
  {
    title: 'لاگ‌های سیستم',
    href: '/admin/audit',
    icon: FileText,
  },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed right-0 top-0 z-40 h-screen w-64 border-l bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center border-b px-6">
        <Link href="/admin" className="flex items-center gap-2 font-bold text-xl text-primary">
          <ShieldCheck className="h-6 w-6" />
          <span>پنل مدیریت</span>
        </Link>
      </div>
      <div className="flex flex-col gap-1 p-4">
        {sidebarItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.title}
            </Link>
          );
        })}
      </div>
      <div className="absolute bottom-4 w-full px-4">
        <Link
          href="/dashboard-v2"
          className={cn(
            'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors text-muted-foreground hover:bg-muted hover:text-foreground'
          )}
        >
          <LayoutDashboard className="h-4 w-4" />
          بازگشت به اپلیکیشن
        </Link>
      </div>
    </aside>
  );
}
