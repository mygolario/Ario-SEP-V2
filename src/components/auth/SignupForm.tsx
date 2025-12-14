'use client';

import { useFormState } from 'react-dom';
import { signup } from '@/app/auth/actions';
import Link from 'next/link';
import TurnstileWidget from '@/components/auth/TurnstileWidget';
import { SubmitButton } from './SubmitButton'; // Relative import to fix resolution

const initialState = {
  error: '',
  message: '',
};

export default function SignupForm() {
  const [state, dispatch] = useFormState(signup, initialState);

  return (
    <form action={dispatch} className="space-y-6 text-right" dir="rtl">
      {state?.error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm border border-red-200">
          {state.error}
        </div>
      )}

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
          dir="ltr"
          className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all outline-none text-left"
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
          dir="ltr"
          className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all outline-none text-left"
          placeholder="••••••••"
        />
      </div>

      <TurnstileWidget />

      <SubmitButton text="ثبت نام" />

      <div className="text-center text-sm text-slate-600 mt-4">
        حساب دارید؟{' '}
        <Link href="/login" className="text-indigo-600 hover:text-indigo-500 font-semibold">
          ورود
        </Link>
      </div>
    </form>
  );
}
