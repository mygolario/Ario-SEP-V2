'use client';

import Link from 'next/link';
import * as Sentry from '@sentry/nextjs';
import { useEffect } from 'react';

import { Button } from '@/components/ui/button';

export default function GlobalError({ error }: { error: Error & { digest?: string } }) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html>
      <body>
        <div
          className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-6"
          dir="rtl"
        >
          <div className="max-w-md w-full space-y-4 text-center">
            <div className="text-sm font-semibold text-primary">خطای سامانه</div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              مشکلی سمت سرور رخ داد
            </h1>
            <p className="text-slate-600 dark:text-slate-300">
              درخواست شما پردازش نشد. لطفاً صفحه را ریفرش کنید یا بعداً دوباره تلاش کنید.
            </p>
            <div className="flex items-center justify-center gap-3">
              <Button onClick={() => location.reload()}>تلاش مجدد</Button>
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
      </body>
    </html>
  );
}
