import AuthLayout from '@/components/auth/AuthLayout';
import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm';

export default function ForgotPasswordPage() {
  return (
    <AuthLayout>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-900">بازیابی رمز عبور</h2>
        <p className="text-slate-600 mt-2">ایمیل خود را وارد کنید تا لینک بازیابی ارسال شود</p>
      </div>
      <ForgotPasswordForm />
    </AuthLayout>
  );
}
