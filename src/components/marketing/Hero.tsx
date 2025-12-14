import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, PlayCircle, ShieldCheck, Sparkles } from 'lucide-react';

type HeroProps = {
  ctaHref: string;
};

export function Hero({ ctaHref }: HeroProps) {
  return (
    <section className="relative overflow-hidden pt-20 pb-32">
      {/* Background Gradients - Light Premium */}
      {/* Background Gradients - Light Premium */}
      <div className="absolute inset-0 -z-10 bg-background" />
      <div className="absolute -left-20 top-20 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute -right-20 bottom-20 h-72 w-72 rounded-full bg-blue-400/10 blur-3xl" />

      <div
        className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-4 pt-10 text-right md:flex-row md:items-center"
        dir="rtl"
      >
        <div className="flex-1 space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-medium text-primary shadow-sm">
            <Sparkles className="h-4 w-4" />
            <span>بتای عمومی | خروجی فارسی و متناسب با بازار ایران</span>
          </div>

          <h1 className="text-5xl font-black leading-tight text-foreground tracking-tight md:text-6xl">
            همراه هوشمند برای ساخت <span className="text-primary">برنامه کسب‌وکار</span> شما
          </h1>

          <p className="max-w-2xl text-xl leading-9 text-muted-foreground">
            ورودی ساده بگیرید، خروجی قابل اجرا تحویل بگیرید: خلاصه اجرایی، تحلیل کوتاه بازار داخلی،
            برآورد اولیه مالی و چک‌لیست اقدام. همه چیز فارسی، سازگار با قوانین و شرایط ایران.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-start">
            <Link href={ctaHref}>
              <Button size="lg" className="rounded-full px-8 text-lg shadow-xl shadow-primary/20">
                ورود / شروع ساخت
                <ArrowLeft className="mr-2 h-5 w-5" />
              </Button>
            </Link>
            <Link
              href="#sample"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors px-4 py-2"
            >
              <PlayCircle className="h-5 w-5" />
              مشاهده یک خروجی نمونه
            </Link>
          </div>

          <div className="flex flex-wrap gap-6 text-sm text-muted-foreground pt-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-primary" />
              داده و احراز در زیرساخت داخلی
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-primary" />
              محتوا ۱۰۰٪ فارسی و راست‌به‌چپ
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-yellow-500" />
              مناسب برای استارتاپ‌های اولیه و SME
            </div>
          </div>
        </div>

        <div className="flex-1">
          <div className="relative isolate">
            {/* Decorative blob behind the card */}
            <div className="absolute inset-0 -z-10 transform-gpu blur-2xl opacity-40 bg-gradient-to-tr from-primary to-purple-400 rounded-full" />

            <div className="relative overflow-hidden rounded-3xl border border-border bg-card/80 backdrop-blur-sm shadow-2xl">
              <div className="p-8 space-y-6">
                <div className="flex items-center justify-between border-b pb-4">
                  <div className="space-y-1 text-right">
                    <p className="text-xs font-semibold text-primary uppercase tracking-wider">
                      نسخه اولیه پلن
                    </p>
                    <p className="text-xl font-bold text-foreground">کافه محلی - تهران</p>
                  </div>
                  <div className="rounded-full bg-secondary px-4 py-1.5 text-xs font-medium text-secondary-foreground">
                    <span className="font-bold text-primary">۷</span> گام اجرایی
                  </div>
                </div>

                <div className="rounded-2xl bg-muted/50 p-5 text-sm">
                  <p className="font-semibold text-foreground mb-3">چک‌لیست اقدام</p>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-3">
                      <span className="mt-1.5 h-2 w-2 rounded-full bg-primary shrink-0" />
                      بررسی مجوز کسب‌وکار و کد اقتصادی از اتحادیه
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-1.5 h-2 w-2 rounded-full bg-primary shrink-0" />
                      قرارداد تامین قهوه با روستری‌های منطقه ۶
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-1.5 h-2 w-2 rounded-full bg-primary shrink-0" />
                      طراحی منوی دیجیتال و راه‌اندازی اینستاگرام
                    </li>
                  </ul>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl border bg-card p-4 shadow-sm">
                    <p className="text-xs text-muted-foreground">زمان‌بندی</p>
                    <p className="mt-1 text-lg font-bold text-foreground">۶ هفته تا افتتاح</p>
                  </div>
                  <div className="rounded-xl border bg-card p-4 shadow-sm">
                    <p className="text-xs text-muted-foreground">بودجه اولیه</p>
                    <p className="mt-1 text-lg font-bold text-foreground">۳.۵ میلیارد تومان</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
