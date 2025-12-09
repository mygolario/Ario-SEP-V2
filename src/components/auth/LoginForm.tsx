'use client';

import { login } from '@/app/auth/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Rocket, AlertTriangle, Eye, EyeOff, Lock, CheckCircle } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useFormStatus } from 'react-dom';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button 
      type="submit" 
      disabled={pending}
      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white h-11 text-base shadow-lg shadow-indigo-500/20"
    >
      {pending ? 'در حال ورود...' : 'ورود به حساب'}
    </Button>
  );
}

export function LoginForm() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full max-w-md mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900">خوش آمدید</h2>
        <p className="text-slate-500">برای دسترسی به پنل مدیریت وارد شوید</p>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
        <form action={login} className="space-y-5">
          
          {error === 'InvalidCredentials' && (
            <Alert variant="destructive" className="bg-rose-50 border-rose-200 text-rose-800">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle className="mr-2">خطا در ورود</AlertTitle>
              <AlertDescription className="mr-2">
                اطلاعات ورود نادرست است. لطفا دوباره تلاش کنید.
              </AlertDescription>
            </Alert>
          )}

          <div className="space-y-4">
            <Button variant="outline" className="w-full h-11 border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-slate-900" type="button">
              <svg className="w-5 h-5 ml-2" viewBox="0 0 24 24">
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
              ورود با گوگل
            </Button>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-slate-500">یا با ایمیل</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">ایمیل</Label>
              <Input 
                id="email" 
                name="email" 
                type="email" 
                placeholder="name@company.com" 
                className="h-11"
                required 
                autoFocus
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">رمز عبور</Label>
                <a href="#" className="text-xs text-indigo-600 hover:text-indigo-500 font-medium">
                  فراموشی رمز عبور؟
                </a>
              </div>
              <div className="relative">
                <Input 
                  id="password" 
                  name="password" 
                  type={showPassword ? "text" : "password"}
                  placeholder="********" 
                  className="h-11 pl-10"
                  required 
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <SubmitButton />
        </form>

        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-500 bg-slate-50 p-2 rounded-lg border border-slate-100">
          <Lock className="h-3 w-3" />
          <span>اطلاعات شما با استاندارد ۲۵۶-بیت رمزگذاری می‌شود</span>
        </div>
      </div>
      
      <p className="text-center text-sm text-slate-500">
        حساب کاربری ندارید؟{" "}
        <a href="/register" className="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors">
          شروع کنید
        </a>
      </p>
    </div>
  );
}
