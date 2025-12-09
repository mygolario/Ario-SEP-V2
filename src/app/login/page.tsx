import AuthLayout from '@/components/auth/AuthLayout';
import { login } from '@/app/auth/actions';
import Link from 'next/link';

export default function LoginPage({ searchParams }: { searchParams: { error?: string } }) {
  return (
    <AuthLayout>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-900">خوش‌آمدید</h2>
        <p className="text-slate-600 mt-2">لطفا برای ورود اطلاعات خود را وارد کنید</p>
      </div>

      {searchParams.error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm mb-6 border border-red-200 text-right dir-rtl">
          {searchParams.error}
        </div>
      )}

      <form action={login} className="space-y-6 text-right" dir="rtl">
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
           <div className="flex justify-between items-center mb-2">
            <label htmlFor="password" className="block text-sm font-medium text-slate-700">
              رمز عبور
            </label>
          </div>
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
          ورود
        </button>

        <div className="text-center text-sm text-slate-600 mt-4">
          حساب کاربری ندارید؟{' '}
          <Link href="/signup" className="text-indigo-600 hover:text-indigo-500 font-semibold">
            ثبت نام
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
}
