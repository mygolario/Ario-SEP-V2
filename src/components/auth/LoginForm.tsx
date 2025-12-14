'use client';

import { useFormState } from 'react-dom';
import { login } from '@/app/auth/actions';
import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Github, Eye, EyeOff } from 'lucide-react';

const initialState = {
  error: '',
  message: '',
};

// Social Login Component
const SocialLogin = () => (
  <div className="grid grid-cols-2 gap-4">
    <Button
      variant="outline"
      type="button"
      className="w-full text-slate-600 hover:text-slate-900 gap-2 h-11"
      disabled
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          fill="#4285F4"
        />
        <path
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          fill="#34A853"
        />
        <path
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          fill="#FBBC05"
        />
        <path
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          fill="#EA4335"
        />
      </svg>
      Google
    </Button>
    <Button
      variant="outline"
      type="button"
      className="w-full text-slate-600 hover:text-slate-900 gap-2 h-11"
      disabled
    >
      <Github className="w-5 h-5" />
      GitHub
    </Button>
  </div>
);

export default function LoginForm() {
  const [state, formAction] = useFormState(login, initialState);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form action={formAction} className="space-y-6 w-full text-right" dir="rtl">
      <SocialLogin />

      <div className="relative">
        <div className="absolute inset-x-0 top-1/2 h-px bg-slate-200"></div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-slate-500 font-medium">یا با ایمیل</span>
        </div>
      </div>

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
