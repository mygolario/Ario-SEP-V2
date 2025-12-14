'use client';

import { useFormState } from 'react-dom';
import { login } from '@/app/auth/actions';
import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff } from 'lucide-react';

const initialState = {
  error: '',
  message: '',
};

export default function LoginForm() {
  const [state, formAction] = useFormState(login, initialState);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form action={formAction} className="space-y-6 w-full text-right" dir="rtl">
      {state?.error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm border border-red-200 animate-in slide-in-from-top-2">
          {state.error}
        </div>
      )}

      <div className="space-y-5">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">ایمیل</label>
          <Input
            name="email"
            type="email"
            required
            placeholder="name@company.com"
            dir="ltr"
            className="h-12 border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/20 transition-all rounded-xl text-left"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold text-slate-700">رمز عبور</label>
            <Link
              href="/auth/forgot-password"
              className="text-xs text-indigo-600 hover:text-indigo-800 font-medium"
            >
              فراموشی رمز؟
            </Link>
          </div>
          <div className="relative">
            <Input
              name="password"
              type={showPassword ? 'text' : 'password'}
              required
              placeholder="••••••••"
              dir="ltr"
              className="h-12 border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/20 transition-all rounded-xl text-left pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-slate-400 hover:text-slate-600"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>
      </div>

      <Button
        type="submit"
        className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 transition-all hover:shadow-indigo-300"
      >
        ورود به حساب
      </Button>

      <div className="text-center text-sm text-slate-500 mt-6">
        حساب کاربری ندارید؟{' '}
        <Link
          href="/signup"
          className="text-indigo-600 hover:text-indigo-700 font-bold transition-colors"
        >
          ثبت نام کنید
        </Link>
      </div>
    </form>
  );
}
