'use client';

import Link from 'next/link';
import { useEffect } from 'react';

import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div
      className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-6"
      dir="rtl"
    >
      <div className="max-w-md w-full space-y-4 text-center">
        <div className="text-sm font-semibold text-primary">خطای غیرمنتظره</div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">مشکلی پیش آمده است</h1>
        <p className="text-slate-600 dark:text-slate-300">
          لطفاً دوباره تلاش کنید یا به داشبورد برگردید. اگر مشکل ادامه داشت تیم ما را باخبر کنید.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Button onClick={() => reset()}>تلاش مجدد</Button>
          <Link href="/dashboard">
            <Button variant="outline">بازگشت به داشبورد</Button>
          </Link>
        </div>
        {error.digest ? (
          <p className="text-xs text-slate-400" dir="ltr">
            {error.digest}
          </p>
        ) : null}
      </div>
    </div>
  );
}
