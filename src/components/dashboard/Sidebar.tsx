'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Logo } from '@/components/brand/Logo';
import {
  LayoutDashboard,
  LayoutTemplate,
  BookOpen,
  Palette,
  Monitor,
  Users,
  Presentation,
  TrendingUp,
  CheckCircle2,
  Settings,
  Scale,
  Calculator,
  MessageCircle,
} from 'lucide-react';

const MENU_ITEMS = [
  {
    title: 'نمای کلی',
    href: '/dashboard',
    icon: LayoutDashboard,
    exact: true,
  },
  {
    title: 'بوم کسب‌وکار',
    href: '/dashboard/plan',
    icon: LayoutTemplate,
  },
  {
    title: 'بیزینس پلن جامع',
    href: '/dashboard/deep-plan',
    icon: BookOpen,
  },
  {
    title: 'هویت بصری',
    href: '/dashboard/branding',
    icon: Palette,
  },
  {
    title: 'وب‌سایت و لندینگ',
    href: '/dashboard/website',
    icon: Monitor,
  },
  {
    title: 'تحلیل بازار و رقبا',
    href: '/dashboard/market',
    icon: Users,
  },
  {
    title: 'ارائه به سرمایه‌گذار',
    href: '/dashboard/pitch',
    icon: Presentation,
  },
  {
    title: 'جذب سرمایه',
    href: '/dashboard/funding',
    icon: TrendingUp,
  },
  {
    title: 'مربی اجرایی',
    href: '/dashboard/coach',
    icon: CheckCircle2,
  },
  {
    title: 'امور حقوقی و قراردادها',
    href: '/dashboard/legal',
    icon: Scale,
  },
  {
    title: 'پیش‌بینی مالی',
    href: '/dashboard/finance',
    icon: Calculator,
  },
  {
    title: 'تست و اعتبارسنجی',
    href: '/dashboard/validator',
    icon: MessageCircle,
  },
  {
    title: 'تنظیمات',
    href: '/dashboard/settings',
    icon: Settings,
  },
];

import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Sidebar({ isOpen, onClose }: { isOpen?: boolean; onClose?: () => void }) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Overlay */}
      <div
        className={cn(
          'fixed inset-0 bg-slate-900/50 z-40 md:hidden transition-opacity duration-300',
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={onClose}
      />

      {/* Sidebar */}
      <aside
        className={cn(
          'bg-white border-l border-slate-200 flex flex-col h-full shrink-0',
          'md:w-64 md:flex md:relative md:translate-x-0', // Desktop: Fixed width, visible
          'fixed inset-y-0 right-0 z-50 w-72 shadow-2xl transition-transform duration-300 ease-in-out md:shadow-none', // Mobile: Fixed, slide-in
          isOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0'
        )}
        dir="rtl"
      >
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <Link href="/dashboard">
            <Logo showText size={32} />
          </Link>
          {/* Mobile Close Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden -ml-2 text-slate-400 hover:text-slate-600"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
          {MENU_ITEMS.map((item) => {
            const isActive = item.exact ? pathname === item.href : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group font-medium',
                  isActive
                    ? 'bg-indigo-50 text-indigo-700 shadow-sm'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                )}
                onClick={() => onClose?.()} // Close sidebar on navigate (mostly for mobile)
              >
                <item.icon
                  className={cn(
                    'h-5 w-5 transition-colors',
                    isActive ? 'text-indigo-600' : 'text-slate-400 group-hover:text-slate-600'
                  )}
                />
                <span>{item.title}</span>
              </Link>
            );
          })}
        </div>

        <div className="p-4 border-t border-slate-100">
          <div className="bg-slate-50 p-4 rounded-xl">
            <p className="text-xs text-slate-500 mb-2">طرح: رایگان</p>
            <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
              <div className="h-full bg-indigo-500 w-[20%]"></div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
