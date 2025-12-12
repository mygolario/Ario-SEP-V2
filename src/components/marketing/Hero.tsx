import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, PlayCircle, ShieldCheck, Sparkles } from 'lucide-react';

type HeroProps = {
  ctaHref: string;
};

export function Hero({ ctaHref }: HeroProps) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />
      <div className="absolute -left-24 top-10 h-64 w-64 rounded-full bg-emerald-400/15 blur-3xl" />
      <div className="absolute -right-24 bottom-10 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl" />

      <div
        className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 pt-16 text-right md:flex-row md:items-center md:pt-24"
        dir="rtl"
      >
        <div className="flex-1 space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300/40 bg-white/5 px-3 py-1 text-xs font-medium text-emerald-200 shadow-sm">
            <Sparkles className="h-4 w-4" />
            <span>بتای عمومی | خروجی فارسی و متناسب با بازار ایران</span>
          </div>
          <h1 className="text-4xl font-black leading-tight text-white md:text-5xl">
            همراه هوشمند برای ساخت نسخه اول برنامه کسب‌وکار شما
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-slate-200 md:text-xl">
            ورودی ساده بگیرید، خروجی قابل اجرا تحویل بگیرید: خلاصه اجرایی، تحلیل کوتاه بازار داخلی،
            برآورد اولیه مالی و چک‌لیست اقدام. همه چیز فارسی، سازگار با قوانین و شرایط ایران.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-start">
            <Link href={ctaHref}>
              <Button className="h-12 rounded-full bg-emerald-400 px-6 text-base font-semibold text-slate-900 shadow-lg shadow-emerald-500/30 hover:bg-emerald-300">
                ورود / شروع ساخت
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <Link
              href="#sample"
              className="inline-flex items-center gap-2 text-slate-200 hover:text-white"
            >
              <PlayCircle className="h-5 w-5 text-emerald-300" />
              مشاهده یک خروجی نمونه
            </Link>
          </div>

          <div className="flex flex-wrap gap-6 text-sm text-slate-300">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-300" />
              داده و احراز در زیرساخت داخلی
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-300" />
              محتوا ۱۰۰٪ فارسی و راست‌به‌چپ
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-cyan-300" />
              مناسب برای استارتاپ‌های اولیه و SME
            </div>
          </div>
        </div>

        <div className="flex-1">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/70 shadow-2xl shadow-emerald-500/10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(52,211,153,0.16),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(34,211,238,0.14),transparent_35%)]" />
            <div className="relative space-y-4 p-8">
              <div className="flex items-center justify-between">
                <div className="space-y-1 text-right">
                  <p className="text-xs text-emerald-200">نسخه اولیه پلن</p>
                  <p className="text-xl font-bold text-white">کافه محلی - تهران</p>
                </div>
                <div className="rounded-full bg-white/10 px-4 py-2 text-xs text-slate-200">
                  <span className="font-semibold text-emerald-200">۷</span> گام اجرایی
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-100 shadow-inner">
                <p className="font-semibold text-emerald-200">چک‌لیست اقدام</p>
                <ul className="mt-3 space-y-2 text-slate-200">
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-emerald-400" />
                    بررسی مجوز کسب‌وکار و کد اقتصادی
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-emerald-400" />
                    قرارداد تامین قهوه با روستری محلی
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-emerald-400" />
                    برنامه وفاداری ماه اول برای ۵۰ مشتری اولیه
                  </li>
                </ul>
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs text-slate-300">
                <div className="rounded-xl border border-emerald-400/30 bg-emerald-400/10 p-3">
                  <p className="text-emerald-100">زمان‌بندی</p>
                  <p className="mt-2 text-base font-bold text-white">۶ هفته تا افتتاح</p>
                </div>
                <div className="rounded-xl border border-cyan-400/30 bg-cyan-400/10 p-3">
                  <p className="text-cyan-100">بودجه اولیه</p>
                  <p className="mt-2 text-base font-bold text-white">۳.۵ میلیارد تومان</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-3 col-span-2">
                  <p className="text-slate-200">تمرکز بازار</p>
                  <p className="mt-1 text-sm text-slate-300">
                    مشتریان محلی، ورک‌اسپیس کوچک، همکاری با اینفلوئنسرهای محلی برای جذب اولین ۱۰۰
                    مشتری.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
