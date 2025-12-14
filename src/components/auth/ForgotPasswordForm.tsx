'use client';

import { useFormState } from 'react-dom';
import { forgotPassword, AuthFormState } from '@/app/auth/actions';
import TurnstileWidget from '@/components/auth/TurnstileWidget';
import Link from 'next/link';

const initialState: AuthFormState = { error: '', message: '', success: false };

export default function ForgotPasswordForm() {
  const [state, dispatch] = useFormState(forgotPassword, initialState);

  if (state?.success) {
    return (
      <div className="text-center space-y-4">
        <div className="bg-green-50 text-green-700 p-4 rounded-lg">{state.message}</div>
        <Link href="/login" className="block text-indigo-600 hover:text-indigo-500">
          بازگشت به ورود
        </Link>
      </div>
    );
  }

  return (
    <form action={dispatch} className="space-y-6 text-right" dir="rtl">
      {state?.error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm border border-red-200">
          {state.error}
        </div>
      )}

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

      <TurnstileWidget />

      <button
        type="submit"
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg transition-colors duration-200"
      >
        ارسال لینک بازیابی
      </button>

      <div className="text-center text-sm">
        <Link href="/login" className="text-slate-500 hover:text-slate-700">
          انصراف
        </Link>
      </div>
    </form>
  );
}
