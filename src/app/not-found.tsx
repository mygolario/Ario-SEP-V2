import Link from 'next/link';

import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div
      className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-6"
      dir="rtl"
    >
      <div className="max-w-md w-full space-y-4 text-center">
        <div className="text-sm font-semibold text-primary">صفحه پیدا نشد</div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          آدرس مورد نظر در دسترس نیست
        </h1>
        <p className="text-slate-600 dark:text-slate-300">
          لینک را بررسی کنید یا به صفحه اصلی بازگردید. اگر مشکل ادامه داشت با پشتیبانی تماس بگیرید.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Link href="/dashboard">
            <Button>داشبورد</Button>
          </Link>
          <Link href="/">
            <Button variant="outline">صفحه اصلی</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
