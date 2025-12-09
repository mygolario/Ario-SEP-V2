import { login } from '../auth/actions'
import Link from 'next/link'

export default function LoginPage({
  searchParams,
}: {
  searchParams: { error?: string }
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4" dir="rtl">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-slate-200">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">ورود به حساب کاربری</h1>
          <p className="text-slate-500 text-sm">برای مدیریت امپراتوری خود وارد شوید</p>
        </div>

        {/* Error Alert */}
        {searchParams.error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-6 border border-red-100 flex items-center gap-2">
            <span>⚠️</span>
            <span>{searchParams.error}</span>
          </div>
        )}

        {/* THE FORM */}
        <form className="space-y-4">
          
          {/* Email Field */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">ایمیل</label>
            <input 
              name="email" 
              type="email" 
              placeholder="name@example.com"
              required 
              className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-left ltr"
            />
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">رمز عبور</label>
            <input 
              name="password" 
              type="password" 
              placeholder="••••••••"
              required 
              className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-left ltr"
            />
          </div>

          {/* Submit Button */}
          <button 
            formAction={login}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-lg transition-all active:scale-[0.98]"
          >
            ورود
          </button>

        </form>

        {/* Footer Link */}
        <div className="mt-6 text-center text-sm">
          <span className="text-slate-500">حساب کاربری ندارید؟ </span>
          <Link href="/signup" className="text-indigo-600 font-medium hover:underline">
            ثبت نام کنید
          </Link>
        </div>

      </div>
    </div>
  )
}
