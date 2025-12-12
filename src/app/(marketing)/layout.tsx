import type { Metadata } from 'next';
import { Navbar } from '@/components/marketing/Navbar';
import { Footer } from '@/components/marketing/Footer';
import { createClient } from '@/utils/supabase/server';

export const metadata: Metadata = {
  title: 'آریو | ساخت سریع برنامه کسب‌وکار (فارسی و راست‌به‌چپ)',
  description:
    'نسخه بتای آریو برای بازار ایران: پلن کسب‌وکار، برآورد مالی اولیه و چک‌لیست اقدام با خروجی فارسی و سازگار با قوانین محلی.',
};

export default async function MarketingLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const ctaHref = user ? '/dashboard' : '/login';
  const supportTelegramUrl = process.env.NEXT_PUBLIC_SUPPORT_TELEGRAM_URL;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-50">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(16,185,129,0.08),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(34,211,238,0.08),transparent_30%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:28px_28px] opacity-30" />
      <div className="relative z-10">
        <Navbar ctaHref={ctaHref} />
        <main className="pt-10">{children}</main>
        <Footer supportTelegramUrl={supportTelegramUrl} siteUrl={siteUrl} />
      </div>
    </div>
  );
}
