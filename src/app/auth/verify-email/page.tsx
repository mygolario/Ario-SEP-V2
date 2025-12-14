import AuthLayout from '@/components/auth/AuthLayout';
import Link from 'next/link';

export default function VerifyEmailPage() {
  return (
    <AuthLayout>
      <div className="text-center mb-8 dir-rtl">
        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <svg
            className="w-8 h-8 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-slate-900 mb-2">ایمیل خود را بررسی کنید</h2>
        <p className="text-slate-600">
          لینک فعال‌سازی به ایمیل شما ارسال شد. لطفا برای تکمیل ثبت‌نام روی آن کلیک کنید.
        </p>
      </div>

      <div className="space-y-4 text-center">
        <div className="bg-slate-50 p-4 rounded-lg flex flex-col items-center">
          <p className="text-sm text-slate-600 mb-4">ایمیلی دریافت نکردید؟</p>
          <form
            action={async () => {
              'use server';
              const { resendVerification } = await import('@/app/auth/actions');
              await resendVerification();
            }}
          >
            <button className="text-indigo-600 font-semibold hover:text-indigo-500 text-sm">
              ارسال مجدد لینک
            </button>
          </form>
        </div>

        <div className="text-sm">
          <Link href="/login" className="text-slate-500 hover:text-slate-700">
            بازگشت به صفحه ورود
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}
