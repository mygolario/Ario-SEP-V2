import { ProfessionalAuthLayout } from '@/components/auth/ProfessionalAuthLayout';
import { AuthInput, SubmitButton } from '@/components/auth/AuthComponents';
import { login } from '@/app/auth/actions';
import Link from 'next/link';

export default function LoginPage({ searchParams }: { searchParams: { error?: string } }) {
  return (
    <ProfessionalAuthLayout>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">خوش‌آمدید 👋</h2>
        <p className="text-slate-500">لطفاً برای ورود به پنل اطلاعات خود را وارد کنید</p>
      </div>

      {searchParams.error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm mb-6 border border-red-100 text-right dir-rtl flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          {searchParams.error}
        </div>
      )}

      <form action={login} className="space-y-6 text-right" dir="rtl">
        <AuthInput 
            id="email" 
            name="email" 
            type="email" 
            label="ایمیل" 
            required 
            className="ltr text-left"
        />

        <div>
            <AuthInput 
                id="password" 
                name="password" 
                type="password" 
                label="رمز عبور" 
                required 
                className="ltr text-left"
            />
            <div className="flex justify-end mt-2">
                 <Link href="/forgot-password" className="text-xs text-indigo-600 hover:text-indigo-500 font-medium">
                    رمز عبور را فراموش کردید؟
                </Link>
            </div>
        </div>

        <SubmitButton>
          ورود به حساب
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
             <div className="text-slate-600 mb-2">هنوز ثبت‌نام نکرده‌اید؟</div>
            <Link href="/signup" className="text-indigo-600 hover:text-indigo-500 font-bold hover:underline">
             ساخت حساب جدید
          </Link>
        </div>
      </form>
    </ProfessionalAuthLayout>
  );
}
