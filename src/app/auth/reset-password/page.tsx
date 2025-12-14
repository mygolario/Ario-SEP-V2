import AuthLayout from '@/components/auth/AuthLayout';
import ResetPasswordForm from '@/components/auth/ResetPasswordForm';

export default function ResetPasswordPage() {
  return (
    <AuthLayout>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-900">تغییر رمز عبور</h2>
        <p className="text-slate-600 mt-2">رمز عبور جدید خود را وارد کنید</p>
      </div>
      <ResetPasswordForm />
    </AuthLayout>
  );
}
