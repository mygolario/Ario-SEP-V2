import AuthLayout from '@/components/auth/AuthLayout';
import LoginForm from '@/components/auth/LoginForm';

export default function LoginPage() {
  return (
    <AuthLayout>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-900">خوش‌آمدید</h2>
        <p className="text-slate-600 mt-2">لطفا برای ورود اطلاعات خود را وارد کنید</p>
      </div>
      <LoginForm />
    </AuthLayout>
  );
}
