import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MessageCircle, ExternalLink, ShieldCheck } from 'lucide-react';

type FooterProps = {
  supportTelegramUrl?: string;
  siteUrl?: string;
};

export function Footer({ supportTelegramUrl, siteUrl }: FooterProps) {
  return (
    <footer className="mt-24 border-t border-border bg-muted/30">
      <div
        className="mx-auto grid w-full max-w-6xl gap-12 px-4 py-16 text-right text-muted-foreground md:grid-cols-4"
        dir="rtl"
      >
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center gap-2 text-foreground">
            <ShieldCheck className="h-6 w-6 text-primary" />
            <span className="text-lg font-black tracking-tight">کارنکس | Karnex</span>
          </div>
          <p className="text-muted-foreground leading-8 text-sm">
            کارنکس یک دستیار هوشمند برای تدوین برنامه کسب‌وکار، برآورد اولیه مالی و چک‌لیست اقدام
            است. همه محتوا به فارسی و با در نظر گرفتن واقعیت‌های بازار ایران تولید می‌شود.
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-2">
            {siteUrl && (
              <Button
                asChild
                variant="outline"
                size="sm"
                className="bg-background text-foreground hover:bg-muted"
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
                size="sm"
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <a href={supportTelegramUrl} target="_blank" rel="noreferrer">
                  <MessageCircle className="ml-2 h-4 w-4" />
                  پشتیبانی تلگرام
                </a>
              </Button>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div className="text-sm font-bold text-foreground">مسیرها</div>
          <ul className="space-y-3 text-sm">
            <li>
              <Link href="/" className="hover:text-primary transition-colors">
                صفحه اصلی
              </Link>
            </li>
            <li>
              <Link href="/pricing" className="hover:text-primary transition-colors">
                تعرفه‌ها
              </Link>
            </li>
            <li>
              <Link href="/faq" className="hover:text-primary transition-colors">
                سوالات متداول
              </Link>
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <div className="text-sm font-bold text-foreground">قوانین</div>
          <ul className="space-y-3 text-sm">
            <li>
              <Link href="/terms" className="hover:text-primary transition-colors">
                شرایط استفاده
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-primary transition-colors">
                حریم خصوصی
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border bg-muted/50">
        <div
          className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-6 text-xs text-muted-foreground"
          dir="rtl"
        >
          <span>© {new Date().getFullYear()} کارنکس - کلیه حقوق محفوظ است.</span>
          <span>ساخته شده با تمرکز بر بازار ایران</span>
        </div>
      </div>
    </footer>
  );
}
