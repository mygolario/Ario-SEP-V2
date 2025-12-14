import AuthLayout from '@/components/auth/AuthLayout';
import SignupForm from '@/components/auth/SignupForm';

export default function SignupPage() {
  return (
    <AuthLayout>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-900">ساخت حساب جدید</h2>
        <p className="text-slate-600 mt-2">برای شروع رایگان ثبت نام کنید</p>
      </div>
      <SignupForm />
    </AuthLayout>
  );
}
