import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MessageCircle, ExternalLink, ShieldCheck } from 'lucide-react';

type FooterProps = {
  supportTelegramUrl?: string;
  siteUrl?: string;
};

export function Footer({ supportTelegramUrl, siteUrl }: FooterProps) {
  return (
    <footer className="mt-24 border-t border-white/10 bg-slate-900/60">
      <div
        className="mx-auto grid w-full max-w-6xl gap-12 px-4 py-12 text-right text-slate-200 md:grid-cols-4"
        dir="rtl"
      >
        <div className="md:col-span-2 space-y-3">
          <div className="flex items-center gap-2 text-emerald-200">
            <ShieldCheck className="h-5 w-5" />
            <span className="text-sm font-semibold">آریو - بتای بازار ایران</span>
          </div>
          <p className="text-slate-400 leading-7">
            آریو یک دستیار هوشمند برای تدوین برنامه کسب‌وکار، برآورد اولیه مالی و چک‌لیست اقدام است.
            همه محتوا به فارسی و با در نظر گرفتن واقعیت‌های بازار ایران تولید می‌شود.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            {siteUrl && (
              <Button
                asChild
                variant="outline"
                className="border-white/15 bg-white/5 text-slate-100 hover:bg-white/10"
              >
                <a href={siteUrl} target="_blank" rel="noreferrer">
                  <ExternalLink className="ml-2 h-4 w-4" />
                  سایت اصلی
                </a>
              </Button>
            )}
            {supportTelegramUrl && (
              <Button
                asChild
                className="rounded-full bg-emerald-400 text-slate-900 hover:bg-emerald-300"
              >
                <a href={supportTelegramUrl} target="_blank" rel="noreferrer">
                  <MessageCircle className="ml-2 h-4 w-4" />
                  پشتیبانی تلگرام
                </a>
              </Button>
            )}
          </div>
        </div>

        <div className="space-y-3">
          <div className="text-sm font-semibold text-white">مسیرها</div>
          <ul className="space-y-2 text-sm text-slate-300">
            <li>
              <Link href="/" className="hover:text-emerald-300">
                صفحه اصلی
              </Link>
            </li>
            <li>
              <Link href="/pricing" className="hover:text-emerald-300">
                تعرفه‌ها
              </Link>
            </li>
            <li>
              <Link href="/faq" className="hover:text-emerald-300">
                سوالات متداول
              </Link>
            </li>
          </ul>
        </div>

        <div className="space-y-3">
          <div className="text-sm font-semibold text-white">قوانین</div>
          <ul className="space-y-2 text-sm text-slate-300">
            <li>
              <Link href="/terms" className="hover:text-emerald-300">
                شرایط استفاده
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-emerald-300">
                حریم خصوصی
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 bg-slate-950/50">
        <div
          className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 text-xs text-slate-400"
          dir="rtl"
        >
          <span>© {new Date().getFullYear()} آریو - کلیه حقوق محفوظ است.</span>
          <span>ساخته شده با تمرکز بر بازار ایران</span>
        </div>
      </div>
    </footer>
  );
}
