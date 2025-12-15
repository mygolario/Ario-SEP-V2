import { Home, Folder, HelpCircle, Settings, type LucideIcon } from 'lucide-react';

export interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
  enabled: boolean;
}

export const navItems: NavItem[] = [
  {
    title: 'پیشخوان', // Dashboard/Overview
    href: '/dashboard-v2',
    icon: Home,
    enabled: true,
  },
  {
    title: 'پروژه‌ها', // Projects
    href: '/dashboard-v2/projects',
    icon: Folder,
    enabled: true,
  },
  {
    title: 'راهنما', // Help
    href: '/dashboard-v2/help',
    icon: HelpCircle,
    enabled: true,
  },
  {
    title: 'تنظیمات', // Settings
    href: '/dashboard-v2/settings',
    icon: Settings,
    enabled: true,
  },
];
