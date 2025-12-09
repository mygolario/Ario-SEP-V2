'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { 
  Menu, 
  ChevronDown, 
  User, 
  Settings, 
  LogOut,
  Bell
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { signOut } from '@/app/auth/actions';

interface HeaderProps {
  onMenuClick: () => void;
  user: any; // Using any for simplicity as User type might need import from Supabase
}

export function Header({ onMenuClick, user }: HeaderProps) {
  const pathname = usePathname();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Extract initials
  const fullName = user?.user_metadata?.full_name || 'کاربر';
  const initials = fullName
    .split(' ')
    .map((n: string) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const email = user?.email || '';

  // Generate Breadcrumbs from pathname
  // e.g., /dashboard/settings -> داشبورد / تنظیمات
  const getBreadcrumbs = () => {
    const paths = pathname.split('/').filter(Boolean);
    
    // Map of path segments to Persian names
    const pathMap: Record<string, string> = {
      dashboard: 'داشبورد',
      plan: 'بوم کسب‌وکار',
      'deep-plan': 'بیزینس پلن جامع',
      branding: 'هویت بصری',
      website: 'وب‌سایت و لندینگ',
      market: 'تحلیل بازار',
      pitch: 'ارائه به سرمایه‌گذار',
      funding: 'جذب سرمایه',
      coach: 'مربی اجرایی',
      legal: 'امور حقوقی',
      finance: 'پیش‌بینی مالی',
      validator: 'تست و اعتبارسنجی',
      settings: 'تنظیمات',
    };

    return (
      <div className="flex items-center gap-2 text-sm text-slate-500">
        {paths.map((path, index) => {
          const isLast = index === paths.length - 1;
          const name = pathMap[path] || path;
          
          return (
            <React.Fragment key={path}>
              {index > 0 && <span className="text-slate-300">/</span>}
              <span className={cn(isLast && "font-medium text-slate-900")}>
                {name}
              </span>
            </React.Fragment>
          );
        })}
      </div>
    );
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-200 z-30 px-4 md:px-8 flex items-center justify-between" dir="rtl">
      {/* Right Side: Hamburger & Breadcrumbs */}
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden text-slate-500 hover:text-slate-900"
          onClick={onMenuClick}
        >
          <Menu className="h-6 w-6" />
        </Button>

        {getBreadcrumbs()}
      </div>

      {/* Left Side: Actions & Profile */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="text-slate-400 hover:text-slate-600 relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-2.5 right-2.5 h-2 w-2 bg-red-500 rounded-full border border-white"></span>
        </Button>

        <div className="relative">
          <button 
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-3 pl-2 pr-1 py-1 rounded-full hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100"
          >
            <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-sm">
              {initials}
            </div>
            <ChevronDown className={cn("h-4 w-4 text-slate-400 transition-transform", isProfileOpen && "rotate-180")} />
          </button>

          {/* Dropdown Menu */}
          {isProfileOpen && (
            <>
              <div 
                className="fixed inset-0 z-10" 
                onClick={() => setIsProfileOpen(false)}
              />
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-100 py-1 z-20 animate-in fade-in zoom-in-95 duration-100">
                <div className="px-4 py-3 border-b border-slate-50">
                  <p className="text-sm font-medium text-slate-900 truncate">{fullName}</p>
                  <p className="text-xs text-slate-500 truncate">{email}</p>
                </div>
                
                <div className="p-1">
                  <Link 
                    href="/dashboard/profile" 
                    className="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                  >
                    <User className="h-4 w-4" />
                    پروفایل
                  </Link>
                  <Link 
                    href="/dashboard/settings" 
                    className="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                  >
                    <Settings className="h-4 w-4" />
                    تنظیمات
                  </Link>
                  <form action={signOut}>
                    <button 
                      type="submit"
                      className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <LogOut className="h-4 w-4" />
                      خروج
                    </button>
                  </form>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
