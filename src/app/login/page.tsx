'use client';

import { Suspense } from 'react';
import { LoginForm } from '@/components/auth/LoginForm';
import { Sparkles, Star } from 'lucide-react';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-white md:bg-slate-50 flex" dir="rtl">
      
      {/* Left Side: Login Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 lg:p-12 relative z-10">
        <div className="w-full max-w-md">
           {/* Mobile Logo (only visible on mobile) */}
           <div className="md:hidden flex items-center justify-center gap-2 mb-8">
              <div className="bg-indigo-600 p-2 rounded-lg">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-lg text-slate-900">بیزینس بیلدر</span>
           </div>

           <Suspense fallback={<div className="flex justify-center"><div className="animate-spin h-8 w-8 border-4 border-indigo-500 border-t-transparent rounded-full"></div></div>}>
             <LoginForm />
           </Suspense>
        </div>
      </div>

      {/* Right Side: Visual & Testimonial (Desktop Only) */}
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

        {/* 3D Visual Placeholder */}
        <div className="relative z-10 flex-1 flex items-center justify-center">
            <div className="relative w-full max-w-md aspect-square">
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500 rounded-full blur-[100px] opacity-50 animate-pulse" />
                 <div className="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl transform rotate-6 hover:rotate-0 transition-transform duration-700 ease-out border-b-4 border-r-4 border-b-white/5 border-r-white/5">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 rounded-full bg-indigo-500 flex items-center justify-center shadow-lg shadow-indigo-500/40">
                             <Sparkles className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <div className="h-2 w-24 bg-white/20 rounded-full mb-2" />
                            <div className="h-2 w-16 bg-white/10 rounded-full" />
                        </div>
                    </div>
                    <div className="space-y-3">
                        <div className="h-2 w-full bg-white/5 rounded-full" />
                        <div className="h-2 w-5/6 bg-white/5 rounded-full" />
                        <div className="h-2 w-4/6 bg-white/5 rounded-full" />
                    </div>
                    <div className="mt-6 flex gap-2">
                        <div className="h-8 w-20 bg-indigo-500/20 rounded-lg border border-indigo-500/30" />
                        <div className="h-8 w-20 bg-white/5 rounded-lg border border-white/10" />
                    </div>
                 </div>
            </div>
        </div>

        {/* Testimonial */}
        <div className="relative z-10">
          <div className="flex gap-1 mb-4 text-amber-400">
            <Star className="h-5 w-5 fill-current" />
            <Star className="h-5 w-5 fill-current" />
            <Star className="h-5 w-5 fill-current" />
            <Star className="h-5 w-5 fill-current" />
            <Star className="h-5 w-5 fill-current" />
          </div>
          <blockquote className="text-xl lg:text-2xl font-medium leading-relaxed mb-6">
            "این ابزار واقعاً شگفت‌انگیز است. در کمتر از چند دقیقه توانستم یک بیزینس پلن کامل برای استارتاپم بسازم. ۲۰ ساعت در وقتم صرفه‌جویی شد!"
          </blockquote>
          <div className="flex items-center gap-4">
             <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold border-2 border-white">
                م
             </div>
             <div>
                 <div className="font-semibold text-white">مهرداد اکبری</div>
                 <div className="text-sm text-slate-400">مدیرعامل پینکت</div>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
}
