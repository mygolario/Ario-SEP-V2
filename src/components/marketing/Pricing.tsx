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
    <section id="pricing" className="py-24 bg-background border-t border-slate-50">
      <div className="mx-auto w-full max-w-6xl px-4 text-right" dir="rtl">
        <div className="mb-16 text-center md:text-right">
          <p className="mb-3 text-sm font-bold uppercase tracking-wider text-primary">تعرفه بتا</p>
          <h2 className="text-3xl font-black text-foreground md:text-4xl">
            قیمت‌گذاری شفاف برای شروع
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-muted-foreground">
            نسخه بتا با ظرفیت محدود عرضه شده است تا بتوانیم کیفیت خروجی و پشتیبانی را کنترل کنیم.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Pro Plan Card */}
          <Card className="relative overflow-hidden border-primary bg-primary text-primary-foreground shadow-2xl shadow-primary/30 transform md:scale-105 rounded-3xl">
            <div className="absolute top-0 left-0 w-full h-1 bg-white/20" />
            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-6">
              <div>
                <p className="text-sm font-medium text-blue-100 opacity-90">طرح اصلی بتا</p>
                <CardTitle className="mt-2 text-4xl font-black tracking-tight">
                  ۴۹۰٬۰۰۰ تومان <span className="text-lg font-medium opacity-80">/ ماه</span>
                </CardTitle>
                <p className="mt-3 text-sm text-blue-50/90 font-medium">
                  ماه اول برای ایده‌های اولیه رایگان است.
                </p>
              </div>
              <div className="rounded-full bg-white/20 p-2 ring-1 ring-white/30">
                <BadgeCheck className="h-6 w-6 text-white" />
              </div>
            </CardHeader>
            <CardContent className="space-y-6 pt-0">
              <div className="space-y-4">
                {benefits.map((benefit) => (
                  <div key={benefit} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-5 w-5 text-blue-200 shrink-0 stroke-[3]" />
                    <span className="text-base font-medium">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl border border-white/20 bg-white/10 px-5 py-4 text-xs font-medium text-blue-50 leading-6">
                پرداخت از طریق درگاه‌های ایرانی؛ لغو اشتراک هر زمان ممکن است.
              </div>

              <Link href={ctaHref}>
                <Button className="mt-2 h-14 w-full rounded-2xl bg-white text-primary hover:bg-white/90 font-black text-lg shadow-sm transition-transform hover:scale-[1.02]">
                  ورود / شروع استفاده
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Policy Card */}
          <Card className="border-border bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow rounded-3xl">
            <CardHeader>
              <CardTitle className="text-2xl font-bold tracking-tight">سیاست بتا</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-sm leading-8 text-muted-foreground">
              <p>
                خروجی‌ها برای بررسی ایده و شروع سریع طراحی شده‌اند؛ قبل از انتشار عمومی پیشنهاد
                می‌کنیم توسط متخصص مالی یا حقوقی مرور شوند.
              </p>
              <p>
                در نسخه بتا داده‌های محلی به‌صورت دوره‌ای به‌روزرسانی می‌شوند؛ تغییرات مدل یا
                محدودیت‌ها از طریق ایمیل اطلاع‌رسانی خواهد شد.
              </p>
              <p className="rounded-2xl border border-primary/20 bg-primary/5 px-5 py-4 text-foreground font-medium">
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
