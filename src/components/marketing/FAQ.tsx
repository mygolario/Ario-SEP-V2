import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const faqs = [
  {
    question: 'آریو برای چه مرحله‌ای مناسب است؟',
    answer:
      'برای استارتاپ‌های اولیه، کسب‌وکارهای کوچک و تیم‌هایی که می‌خواهند نسخه اول پلن یا بیزینس کیس داخلی را سریع آماده کنند.',
  },
  {
    question: 'داده‌های بازار ایران از کجا تامین می‌شود؟',
    answer:
      'از ترکیب منابع عمومی، گزارش‌های منتشرشده و ورودی‌های کاربر؛ خروجی قبل از نمایش با قواعد بومی و لحن فارسی تنظیم می‌شود.',
  },
  {
    question: 'آیا خروجی قابل دانلود است؟',
    answer:
      'بله؛ متن قابل کپی است و نسخه PDF اصلی را می‌توانید دانلود کنید. در بتا، فرمت DOCX به‌زودی اضافه می‌شود.',
  },
  {
    question: 'حفظ حریم خصوصی چگونه است؟',
    answer:
      'اطلاعات شما فقط برای تولید خروجی استفاده می‌شود و در زیرساخت داخلی نگهداری می‌گردد. امکان حذف پروژه در هر زمان وجود دارد.',
  },
  {
    question: 'در نسخه بتا چه محدودیت‌هایی داریم؟',
    answer:
      'ظرفیت پروژه‌های فعال محدود است و ممکن است در ساعات اوج، صف کوتاه ایجاد شود. به‌روزرسانی مدل‌ها منظم انجام می‌شود.',
  },
  {
    question: 'برای پشتیبانی چه کانالی وجود دارد؟',
    answer:
      'پشتیبانی تلگرام و ایمیل در ساعات کاری فعال است. درخواست‌های فوری محصولی در کمترین زمان بررسی می‌شود.',
  },
];

type FAQProps = {
  compact?: boolean;
};

export function FAQ({ compact }: FAQProps) {
  const items = compact ? faqs.slice(0, 4) : faqs;

  return (
    <section id="faq" className="pt-16">
      <div className="mx-auto w-full max-w-6xl px-4 text-right" dir="rtl">
        <div className="flex flex-col gap-2">
          <p className="text-sm font-semibold text-emerald-200">سوالات متداول</p>
          <h2 className="text-3xl font-black text-white">پاسخ روشن به دغدغه‌های اصلی</h2>
          <p className="max-w-2xl text-slate-300">
            اگر سوال دیگری دارید، پشتیبانی تلگرام در ساعات کاری پاسخگوست.
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {items.map((item) => (
            <Card key={item.question} className="border-white/10 bg-white/5 text-slate-100">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-white">{item.question}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm leading-7 text-slate-200">{item.answer}</CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export { faqs };
