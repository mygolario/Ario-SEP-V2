'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { navItems } from './nav';

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed start-0 top-0 z-40 h-screen w-64 border-e bg-background transition-transform">
      <div className="flex h-full flex-col overflow-y-auto px-3 py-4">
        <div className="mb-10 mt-2 flex items-center justify-center">
          <h1 className="text-2xl font-bold">آریو سپ</h1>
        </div>
        <ul className="space-y-2 font-medium">
          {navItems
            .filter((item) => item.enabled)
            .map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      'flex items-center rounded-lg p-3 group hover:bg-muted transition-colors',
                      isActive
                        ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                        : 'text-foreground'
                    )}
                  >
                    <item.icon
                      className={cn(
                        'ms-3 h-5 w-5',
                        isActive
                          ? 'text-primary-foreground'
                          : 'text-gray-500 group-hover:text-foreground'
                      )}
                    />
                    <span className="flex-1">{item.title}</span>
                  </Link>
                </li>
              );
            })}
        </ul>
      </div>
    </aside>
  );
}
