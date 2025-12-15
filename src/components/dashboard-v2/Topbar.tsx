'use client';

import { usePathname } from 'next/navigation';
import { Bell, Search, User } from 'lucide-react';
import { navItems } from './nav';

export function Topbar() {
  const pathname = usePathname();
  const currentNav = navItems.find((item) => item.href === pathname) || { title: 'داشبورد' };

  return (
    <nav className="fixed left-0 right-0 top-0 z-30 mr-64 border-b bg-background px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {/* Breadcrumb-ish title */}
          <h2 className="text-xl font-semibold text-foreground">{currentNav.title}</h2>
        </div>
        <div className="flex items-center gap-4">
          <button className="rounded-full p-2 text-muted-foreground hover:bg-muted">
            <Search className="h-5 w-5" />
          </button>
          <button className="rounded-full p-2 text-muted-foreground hover:bg-muted">
            <Bell className="h-5 w-5" />
          </button>
          <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center overflow-hidden border">
            <User className="h-5 w-5 text-muted-foreground" />
          </div>
        </div>
      </div>
    </nav>
  );
}
