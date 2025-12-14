'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { signup } from '@/app/auth/actions';
import Link from 'next/link';
import TurnstileWidget from '@/components/auth/TurnstileWidget';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff } from 'lucide-react';

const initialState = {
  error: '',
  message: '',
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 transition-all hover:shadow-indigo-300"
      disabled={pending}
    >
      {pending ? 'در حال ثبت‌نام...' : 'ایجاد حساب کاربری'}
    </Button>
  );
}

export default function SignupForm() {
  const [state, formAction] = useFormState(signup, initialState);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [clientError, setClientError] = useState('');

  // Simple strength check
  const strength = {
    length: password.length >= 8,
    number: /\d/.test(password),
    special: /[!@#$%^&*]/.test(password),
  };

  const score = Object.values(strength).filter(Boolean).length;

  const getStrengthColor = () => {
    if (score === 0) return 'bg-slate-200';
    if (score === 1) return 'bg-red-500';
    if (score === 2) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const handleSubmit = (formData: FormData) => {
    // Client-side validation
    if (!fullName.trim() || !email.trim() || !password.trim()) {
      setClientError('لطفا تمام فیلدها را پر کنید');
      return;
    }
    if (password.length < 8) {
      setClientError('رمز عبور باید حداقل ۸ کاراکتر باشد');
      return;
    }
    setClientError('');
    formAction(formData);
  };

  const displayError = clientError || state?.error;

  return (
    <form action={handleSubmit} className="space-y-6 w-full text-right" dir="rtl" noValidate>
      {displayError && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm border border-red-200 animate-in slide-in-from-top-2">
          {displayError}
        </div>
      )}

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">نام و نام خانوادگی</label>
          <Input
            name="full_name"
            type="text"
            placeholder="علی علوی"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="h-12 border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/20 transition-all rounded-xl"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">ایمیل</label>
          <Input
            name="email"
            type="email"
            placeholder="name@company.com"
            dir="ltr"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-12 border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/20 transition-all rounded-xl text-left"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">رمز عبور</label>
          <div className="relative">
            <Input
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              dir="ltr"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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

          {/* Strength Meter */}
          {password.length > 0 && (
            <div className="mt-2 space-y-2">
              <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${getStrengthColor()}`}
                  style={{ width: `${(score / 3) * 100}%` }}
                ></div>
              </div>
              <div className="flex gap-4 text-xs text-slate-500">
                <span className={strength.length ? 'text-green-600 font-medium' : ''}>
                  ۸ کاراکتر
                </span>
                <span className={strength.number ? 'text-green-600 font-medium' : ''}>عدد</span>
                <span className={strength.special ? 'text-green-600 font-medium' : ''}>
                  نماد خاص
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="pt-2">
        <TurnstileWidget />
      </div>

      <SubmitButton />

      <div className="text-center text-sm text-slate-500 mt-6">
        حساب کاربری دارید؟{' '}
        <Link
          href="/login"
          className="text-indigo-600 hover:text-indigo-700 font-bold transition-colors"
        >
          وارد شوید
        </Link>
      </div>
    </form>
  );
}
