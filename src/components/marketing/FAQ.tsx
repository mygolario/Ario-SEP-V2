import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const faqs = [
  {
    question: 'کارنکس برای چه مرحله‌ای مناسب است؟',
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
    <section id="faq" className="py-24 bg-background border-t border-slate-50">
      <div className="mx-auto w-full max-w-6xl px-4 text-right" dir="rtl">
        <div className="mb-16 text-center md:text-right">
          <p className="mb-3 text-sm font-bold uppercase tracking-wider text-primary">
            سوالات متداول
          </p>
          <h2 className="text-3xl font-black text-foreground md:text-4xl">
            پاسخ روشن به دغدغه‌های اصلی
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-muted-foreground">
            اگر سوال دیگری دارید، پشتیبانی تلگرام در ساعات کاری پاسخگوست.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {items.map((item) => (
            <Card
              key={item.question}
              className="border-border bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow"
            >
              <CardHeader>
                <CardTitle className="text-lg font-bold text-foreground">{item.question}</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground leading-7">{item.answer}</CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export { faqs };
