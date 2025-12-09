'use client';

import { signup } from '@/app/auth/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Sparkles, AlertTriangle, Eye, EyeOff } from 'lucide-react';
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
      {pending ? 'در حال ساخت حساب...' : 'ساخت حساب کاربری'}
    </Button>
  );
}

function SignupForm() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full max-w-md mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900">ساخت حساب کاربری</h2>
        <p className="text-slate-500">مشخصات خود را برای شروع وارد کنید</p>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
        <form action={signup} className="space-y-5">
          
          {error && (
            <Alert variant="destructive" className="bg-rose-50 border-rose-200 text-rose-800">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle className="mr-2">خطا در ثبت نام</AlertTitle>
              <AlertDescription className="mr-2">
                {error}
              </AlertDescription>
            </Alert>
          )}

          <div className="space-y-4">
             <div className="space-y-2">
              <Label htmlFor="full_name">نام و نام خانوادگی</Label>
              <Input 
                id="full_name" 
                name="full_name" 
                type="text" 
                placeholder="علی محمدی" 
                className="h-11"
                required 
                autoFocus
              />
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
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">رمز عبور</Label>
              <div className="relative">
                <Input 
                  id="password" 
                  name="password" 
                  type={showPassword ? "text" : "password"}
                  placeholder="********" 
                  className="h-11 pl-10"
                  required 
                  minLength={8}
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
              <p className="text-xs text-slate-400">حداقل ۸ کاراکتر</p>
            </div>
          </div>

          <SubmitButton />
        </form>
      </div>
      
      <p className="text-center text-sm text-slate-500">
        قبلا ثبت نام کرده‌اید؟{" "}
        <a href="/login" className="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors">
          وارد شوید
        </a>
      </p>
    </div>
  );
}

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-white md:bg-slate-50 flex" dir="rtl">
      
      {/* Left Side: Signup Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 lg:p-12 relative z-10">
        <div className="w-full max-w-md">
           {/* Mobile Logo */}
           <div className="md:hidden flex items-center justify-center gap-2 mb-8">
              <div className="bg-indigo-600 p-2 rounded-lg">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-lg text-slate-900">بیزینس بیلدر</span>
           </div>

           <SignupForm />
        </div>
      </div>

      {/* Right Side: Visual & Quote (Desktop Only) */}
      <div className="hidden md:flex w-1/2 bg-slate-900 relative overflow-hidden flex-col justify-between p-12 lg:p-16 text-white">
        
        {/* Abstract Backgrounds */}
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-500/30 via-slate-900 to-slate-900" />
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-purple-500/20 via-slate-900 to-slate-900" />
        <div className="absolute inset-0 bg-grid-white/[0.04]" />
        
        {/* Brand */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="bg-white/10 backdrop-blur-md p-2 rounded-xl border border-white/10 shadow-lg">
            <Sparkles className="h-6 w-6 text-indigo-400" />
          </div>
          <span className="font-bold text-xl tracking-tight">بیزینس بیلدر</span>
        </div>

        {/* 3D Visual Placeholder - Different from Login */}
        <div className="relative z-10 flex-1 flex items-center justify-center">
            <div className="relative w-full max-w-md aspect-square">
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-500 rounded-full blur-[120px] opacity-40 animate-pulse" style={{ animationDuration: '4s' }} />
                 <div className="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl transform -rotate-3 hover:rotate-0 transition-transform duration-700 ease-out border-t-4 border-l-4 border-t-white/5 border-l-white/5 flex flex-col items-center justify-center text-center">
                    <div className="w-20 h-20 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-2xl mb-6 shadow-xl flex items-center justify-center">
                        <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">شروع موفقیت</h3>
                    <p className="text-slate-400">به جمع هزاران کارآفرین موفق بپیوندید</p>
                    
                    <div className="mt-8 flex -space-x-3 space-x-reverse">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className={`w-10 h-10 rounded-full border-2 border-slate-800 bg-slate-700 flex items-center justify-center text-xs font-bold ring-2 ring-indigo-500/50`}>
                                U{i}
                            </div>
                        ))}
                         <div className="w-10 h-10 rounded-full border-2 border-slate-800 bg-indigo-600 flex items-center justify-center text-xs font-bold text-white">
                                +2k
                        </div>
                    </div>
                 </div>
            </div>
        </div>

        {/* Quote */}
        <div className="relative z-10">
          <blockquote className="text-xl lg:text-3xl font-bold leading-relaxed mb-6 tracking-tight">
            "این ابزار زندگی کاری من را تغییر داد. حالا می‌توانم روی رشد کسب‌وکارم تمرکز کنم."
          </blockquote>
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-bold border-2 border-white text-lg">
                س
             </div>
             <div>
                 <div className="font-semibold text-white text-lg">سارا احمدی</div>
                 <div className="text-slate-400">بنیان‌گذار استارتاپ TechFlow</div>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
}
