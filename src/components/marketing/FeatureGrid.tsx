import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, Clock, FileText, Globe2, Shield, Zap } from 'lucide-react';

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
    icon: Clock,
  },
  {
    title: 'ریسک و انطباق',
    description: 'هشدار درباره ریسک‌های رایج ایران و پیشنهاد کنترل هر مورد.',
    icon: Shield,
  },
  {
    title: 'اشتراک امن',
    description: 'دسترسی از داخل ایران، امکان کپی‌متن و دانلود خروجی‌های اصلی.',
    icon: Zap,
  },
];

export function FeatureGrid() {
  return (
    <section id="features" className="py-24 bg-background border-t border-slate-50">
      <div className="mx-auto w-full max-w-6xl px-4 text-right" dir="rtl">
        <div className="mb-16 text-center md:text-right">
          <p className="mb-3 text-sm font-bold uppercase tracking-wider text-primary">
            چرا کارنکس؟
          </p>
          <h2 className="text-3xl font-black text-foreground md:text-4xl">
            خروجی آماده استفاده برای تیم‌های ایرانی
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-muted-foreground">
            همه بخش‌ها به فارسی، راست‌به‌چپ و با فرض شرایط بازار ایران ساخته می‌شوند تا بتوانید بدون
            دوباره‌کاری، پلن اولیه را به تیم یا سرمایه‌گذار نشان دهید.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="group border-border/60 bg-card shadow-sm transition-all hover:shadow-md hover:border-primary/20"
            >
              <CardHeader className="space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <feature.icon className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl font-bold text-foreground">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-7">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
