const steps = [
  {
    title: 'ایده را تعریف کنید',
    detail: 'کسب‌وکار، مخاطب هدف و شهر فعالیت را وارد کنید. نیازی به متن طولانی نیست.',
  },
  {
    title: 'هوش کارنکس تنظیم می‌شود',
    detail: 'خروجی بر اساس داده‌های ایران، محدودیت‌های قانونی و لحن بومی تولید می‌شود.',
  },
  {
    title: 'پلن را تحویل بگیرید',
    detail: 'خلاصه اجرایی، برآورد مالی اولیه و چک‌لیست اقدام را همان لحظه دریافت کنید.',
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-background">
      <div className="mx-auto w-full max-w-6xl px-4 text-right" dir="rtl">
        <div className="flex flex-col gap-3 mb-16 items-center md:items-start text-center md:text-right">
          <p className="text-sm font-bold uppercase tracking-wider text-primary">روند کار</p>
          <h2 className="text-3xl font-black text-foreground md:text-4xl">
            ۳ قدم تا نسخه اول پلن شما
          </h2>
          <p className="max-w-2xl text-muted-foreground text-lg leading-8">
            کل فرایند کمتر از چند دقیقه طول می‌کشد و خروجی برای تیم، شریک یا سرمایه‌گذار قابل ارائه
            است.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="group relative overflow-hidden rounded-3xl border border-border bg-card p-10 text-card-foreground shadow-sm transition-all hover:shadow-lg hover:border-primary/30"
            >
              <div className="absolute -left-10 -top-10 h-32 w-32 rounded-full bg-primary/5 blur-3xl transition-opacity group-hover:opacity-100" />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-xl font-black text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    {index + 1}
                  </div>
                  <div className="rounded-full border border-border bg-secondary px-3 py-1 text-[10px] font-bold text-muted-foreground">
                    کمتر از ۵ دقیقه
                  </div>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">{step.title}</h3>
                <p className="text-muted-foreground leading-7">{step.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
