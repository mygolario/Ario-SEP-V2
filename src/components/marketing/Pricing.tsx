import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BadgeCheck, Check } from 'lucide-react';

type PricingProps = {
  ctaHref: string;
};

const benefits = [
  'خروجی کامل فارسی (خلاصه اجرایی، بازار، مالی اولیه، چک‌لیست)',
  '۲ پروژه فعال همزمان در نسخه بتا',
  'امکان کپی‌متن و دانلود PDF اصلی',
  'به‌روزرسانی رایگان تا پایان بتا',
  'پشتیبانی تلگرام در ساعات کاری',
];

export function Pricing({ ctaHref }: PricingProps) {
  return (
    <section id="pricing" className="pt-16">
      <div className="mx-auto w-full max-w-6xl px-4 text-right" dir="rtl">
        <div className="flex flex-col gap-2">
          <p className="text-sm font-semibold text-emerald-200">تعرفه بتا</p>
          <h2 className="text-3xl font-black text-white">قیمت‌گذاری شفاف برای شروع</h2>
          <p className="max-w-2xl text-slate-300">
            نسخه بتا با ظرفیت محدود عرضه شده است تا بتوانیم کیفیت خروجی و پشتیبانی را کنترل کنیم.
          </p>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <Card className="border-emerald-300/40 bg-emerald-400/10 text-slate-100 shadow-lg shadow-emerald-500/15">
            <CardHeader className="flex items-start justify-between space-y-0">
              <div>
                <p className="text-sm text-emerald-100">طرح اصلی بتا</p>
                <CardTitle className="mt-1 text-2xl font-bold text-white">
                  ۴۹۰٬۰۰۰ تومان / ماه
                </CardTitle>
                <p className="mt-2 text-sm text-emerald-50">
                  ماه اول برای ایده‌های اولیه رایگان است.
                </p>
              </div>
              <BadgeCheck className="h-5 w-5 text-white" />
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-100">
              {benefits.map((benefit) => (
                <div key={benefit} className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 text-emerald-100" />
                  <span>{benefit}</span>
                </div>
              ))}
              <div className="rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-xs text-slate-200">
                پرداخت از طریق درگاه‌های ایرانی؛ لغو اشتراک هر زمان ممکن است.
              </div>
              <Link href={ctaHref}>
                <Button className="mt-3 h-11 w-full rounded-full bg-white text-slate-900 hover:bg-slate-100">
                  ورود / شروع استفاده
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-white/5 text-slate-100">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-white">سیاست بتا</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm leading-7 text-slate-200">
              <p>
                خروجی‌ها برای بررسی ایده و شروع سریع طراحی شده‌اند؛ قبل از انتشار عمومی پیشنهاد
                می‌کنیم توسط متخصص مالی یا حقوقی مرور شوند.
              </p>
              <p>
                در نسخه بتا داده‌های محلی به‌صورت دوره‌ای به‌روزرسانی می‌شوند؛ تغییرات مدل یا
                محدودیت‌ها از طریق ایمیل اطلاع‌رسانی خواهد شد.
              </p>
              <p className="rounded-lg border border-emerald-300/30 bg-emerald-400/5 px-3 py-2 text-emerald-100">
                هر بازخوردی که از بازار ایران دریافت می‌کنید برای ما ارزشمند است؛ از طریق تلگرام یا
                ایمیل پشتیبانی در میان بگذارید.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
