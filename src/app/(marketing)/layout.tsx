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
    <div className="relative min-h-screen bg-background text-foreground">
      {/* Decorative background for Light Premium - subtle grain or gradient can be added here if needed, but keeping it clean white for now */}

      <div className="relative z-10">
        <Navbar ctaHref={ctaHref} />
        <main className="pt-10">{children}</main>
        <Footer supportTelegramUrl={supportTelegramUrl} siteUrl={siteUrl} />
      </div>
    </div>
  );
}
