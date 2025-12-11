import { ProfessionalAuthLayout } from '@/components/auth/ProfessionalAuthLayout';
import { AuthInput, SubmitButton } from '@/components/auth/AuthComponents';
import { signup } from '@/app/auth/actions';
import Link from 'next/link';
import { PasswordStrength } from '@/components/auth/PasswordStrengthClient';

export default function SignupPage({ searchParams }: { searchParams: { error?: string } }) {
  return (
    <ProfessionalAuthLayout>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">شروع رایگان 🚀</h2>
        <p className="text-slate-500">کسب‌وکارتان را همین امروز بسازید</p>
      </div>

      {searchParams.error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm mb-6 border border-red-100 text-right dir-rtl flex items-center">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          {searchParams.error}
        </div>
      )}

      <form action={signup} className="space-y-5 text-right" dir="rtl">
        <AuthInput 
            id="full_name" 
            name="full_name" 
            type="text" 
            label="نام و نام خانوادگی" 
            required 
            placeholder="مثال: علی محمدی"
        />

        <AuthInput 
            id="email" 
            name="email" 
            type="email" 
            label="ایمیل" 
            required 
            className="ltr text-left"
        />

        <div className="relative">
            <AuthInput 
                id="password" 
                name="password" 
                type="password" 
                label="رمز عبور" 
                required 
                className="ltr text-left"
            />
            {/* Password Strength Indicator can be added here if we want client interactivity, 
                but cleaner to keep it simple or use a client component wrapper for just this input */}
            <PasswordStrength /> 
        </div>

        <SubmitButton>
          ساخت حساب کاربری
        </SubmitButton>

        <div className="text-center text-sm text-slate-500 mt-6 relative">
             <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-slate-500">یا</span>
            </div>
        </div>

        <div className="text-center">
            <div className="text-slate-600 mb-2">قبلاً ثبت‌نام کرده‌اید؟</div>
            <Link href="/login" className="text-indigo-600 hover:text-indigo-500 font-bold hover:underline">
            ورود به حساب
          </Link>
        </div>
      </form>
    </ProfessionalAuthLayout>
  );
}
