const steps = [
  {
    title: 'ایده را تعریف کنید',
    detail: 'کسب‌وکار، مخاطب هدف و شهر فعالیت را وارد کنید. نیازی به متن طولانی نیست.',
  },
  {
    title: 'هوش آریو تنظیم می‌شود',
    detail: 'خروجی بر اساس داده‌های ایران، محدودیت‌های قانونی و لحن بومی تولید می‌شود.',
  },
  {
    title: 'پلن را تحویل بگیرید',
    detail: 'خلاصه اجرایی، برآورد مالی اولیه و چک‌لیست اقدام را همان لحظه دریافت کنید.',
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="pt-16">
      <div className="mx-auto w-full max-w-6xl px-4 text-right" dir="rtl">
        <div className="flex flex-col gap-2">
          <p className="text-sm font-semibold text-emerald-200">چگونه کار می‌کند</p>
          <h2 className="text-3xl font-black text-white">۳ قدم تا نسخه اول پلن شما</h2>
          <p className="max-w-2xl text-slate-300">
            کل فرایند کمتر از چند دقیقه طول می‌کشد و خروجی برای تیم، شریک یا سرمایه‌گذار قابل ارائه
            است.
          </p>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 text-slate-100 shadow-sm"
            >
              <div className="absolute -left-10 -top-10 h-24 w-24 rounded-full bg-emerald-400/10 blur-3xl" />
              <div className="flex items-center justify-between">
                <div className="text-4xl font-black text-emerald-300">{index + 1}</div>
                <div className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-200">
                  کمتر از ۵ دقیقه
                </div>
              </div>
              <h3 className="mt-6 text-xl font-semibold text-white">{step.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">{step.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
