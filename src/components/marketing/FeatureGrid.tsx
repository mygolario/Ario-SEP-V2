import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, ClipboardCheck, FileText, Globe2, ShieldCheck, Wallet } from 'lucide-react';

const features = [
  {
    title: 'بسته Perfect V1',
    description: 'خلاصه اجرایی، ارزش پیشنهادی و پرسونای اولیه مشتری بر اساس داده‌های بازار داخلی.',
    icon: FileText,
  },
  {
    title: 'تحلیل بازار محلی',
    description: 'بررسی مختصر اندازه بازار و روندهای ایران برای شروع تصمیم‌گیری سریع.',
    icon: Globe2,
  },
  {
    title: 'برآورد مالی اولیه',
    description: 'هزینه راه‌اندازی، پیش‌بینی درآمد ساده و نقطه سربه‌سر به تومان.',
    icon: BarChart3,
  },
  {
    title: 'چک‌لیست اقدام',
    description: '۳ تا ۷ کار اجرایی اول شامل مجوزها، تامین و بازاریابی.',
    icon: ClipboardCheck,
  },
  {
    title: 'ریسک و انطباق',
    description: 'هشدار درباره ریسک‌های رایج ایران و پیشنهاد کنترل هر مورد.',
    icon: ShieldCheck,
  },
  {
    title: 'اشتراک امن',
    description: 'دسترسی از داخل ایران، امکان کپی‌متن و دانلود خروجی‌های اصلی.',
    icon: Wallet,
  },
];

export function FeatureGrid() {
  return (
    <section id="features" className="pt-16">
      <div className="mx-auto w-full max-w-6xl px-4 text-right" dir="rtl">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold text-emerald-200">چرا آریو</p>
            <h2 className="mt-2 text-3xl font-black text-white">
              خروجی آماده استفاده برای تیم‌های ایرانی
            </h2>
            <p className="mt-3 max-w-2xl text-slate-300">
              همه بخش‌ها به فارسی، راست‌به‌چپ و با فرض شرایط بازار ایران ساخته می‌شوند تا بتوانید
              بدون دوباره‌کاری، پلن اولیه را به تیم یا سرمایه‌گذار نشان دهید.
            </p>
          </div>
          <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-slate-200">
            دسترسی سریع · بدون نیاز به کارت خارجی
          </div>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="h-full border-white/10 bg-white/5 text-slate-100 transition hover:-translate-y-1 hover:border-emerald-300/40 hover:bg-white/10"
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-lg font-semibold text-white">{feature.title}</CardTitle>
                <feature.icon className="h-5 w-5 text-emerald-300" />
              </CardHeader>
              <CardContent className="text-sm leading-7 text-slate-300">
                {feature.description}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
