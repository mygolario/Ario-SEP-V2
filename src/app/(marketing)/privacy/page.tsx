import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'حریم خصوصی آریو',
  description: 'نحوه جمع‌آوری و استفاده از داده‌های کاربران در نسخه بتای آریو.',
};

export default function PrivacyPage() {
  return (
    <div
      className="mx-auto w-full max-w-4xl space-y-8 px-4 py-10 text-right text-slate-100"
      dir="rtl"
    >
      <div>
        <h1 className="text-3xl font-black text-white">حریم خصوصی</h1>
        <p className="mt-3 text-slate-300">
          ما متعهد به حفاظت از اطلاعات شما هستیم. در این صفحه خلاصه‌ای از نحوه جمع‌آوری، نگهداری و
          استفاده از داده‌ها را می‌خوانید.
        </p>
      </div>

      <div className="space-y-4 text-sm leading-7 text-slate-200">
        <p>
          ۱) اطلاعات واردشده در پروژه‌ها برای تولید خروجی استفاده می‌شود و در زیرساخت داخلی نگهداری
          می‌گردد. می‌توانید هر زمان پروژه را حذف کنید.
        </p>
        <p>
          ۲) برای بهبود کیفیت محصول، لاگ‌های فنی و رویدادهای کلی بدون جزئیات حساس ذخیره می‌شود. این
          اطلاعات در دسترس اشخاص ثالث قرار نمی‌گیرد.
        </p>
        <p>
          ۳) در نسخه بتا از کوکی و session برای ورود امن استفاده می‌کنیم. لطفاً از مرورگرهای مطمئن
          استفاده کنید و خروج از حساب را فراموش نکنید.
        </p>
        <p>
          ۴) در صورت استفاده از لینک‌های خارجی (مانند تلگرام)، سیاست حریم خصوصی سرویس مقصد بر عهده
          همان سرویس است.
        </p>
      </div>

      <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200">
        درخواست حذف یا دریافت اطلاعات خود را می‌توانید از طریق کانال‌های پشتیبانی ارسال کنید.
      </div>
    </div>
  );
}
