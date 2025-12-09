import AuthLayout from '@/components/auth/AuthLayout';
import { signup } from '@/app/auth/actions';
import Link from 'next/link';

export default function SignupPage({ searchParams }: { searchParams: { error?: string } }) {
  return (
    <AuthLayout>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-900">ساخت حساب جدید</h2>
        <p className="text-slate-600 mt-2">برای شروع رایگان ثبت نام کنید</p>
      </div>

      {searchParams.error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm mb-6 border border-red-200 text-right dir-rtl">
          {searchParams.error}
        </div>
      )}

      <form action={signup} className="space-y-6 text-right" dir="rtl">
        <div>
          <label htmlFor="full_name" className="block text-sm font-medium text-slate-700 mb-2">
            نام و نام خانوادگی
          </label>
          <input
            id="full_name"
            name="full_name"
            type="text"
            required
            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all outline-none"
            placeholder="علی علوی"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
            ایمیل
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all outline-none"
            placeholder="example@mail.com"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
            رمز عبور
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all outline-none"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg transition-colors duration-200"
        >
          ثبت نام
        </button>

        <div className="text-center text-sm text-slate-600 mt-4">
          حساب دارید؟{' '}
          <Link href="/login" className="text-indigo-600 hover:text-indigo-500 font-semibold">
            ورود
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
}
