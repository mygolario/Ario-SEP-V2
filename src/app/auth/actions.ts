'use server';

import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { ENV } from '@/env';
import { verifyTurnstileToken } from '@/lib/turnstile';
import { sendEmail, EMAIL_TEMPLATES } from '@/lib/brevo';

export type AuthFormState = {
  error?: string;
  message?: string;
  success?: boolean;
};

export async function login(prevState: AuthFormState, formData: FormData): Promise<AuthFormState> {
  const supabase = createClient();
  const email = String(formData.get('email')).trim();
  const password = String(formData.get('password')).trim();

  try {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { error: 'ایمیل یا رمز عبور اشتباه است' };

    // Check verification status if policy requires strict verification
    // But user said "allow access but block sensitive actions".
    // So we just login.
  } catch {
    return { error: 'خطای غیرمنتظره رخ داده است' };
  }

  return redirect('/dashboard?login=success');
}

export async function signup(prevState: AuthFormState, formData: FormData): Promise<AuthFormState> {
  const supabase = createClient();
  const email = String(formData.get('email')).trim();
  const password = String(formData.get('password')).trim();
  const full_name = String(formData.get('full_name')).trim();
  const token = String(formData.get('cf-turnstile-response') || '');

  // 1. Verify Turnstile
  const isHuman = await verifyTurnstileToken(token);
  if (!isHuman) {
    return { error: 'لطفا تایید کنید که ربات نیستید' };
  }

  // 2. Determine Role
  const adminEmails = ENV.ADMIN_EMAILS?.split(',').map((e) => e.trim()) || [];
  const role = adminEmails.includes(email) ? 'ADMIN' : 'USER';

  // 3. Sign Up
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name, role },
      emailRedirectTo: `${ENV.NEXT_PUBLIC_APP_URL}/auth/callback`,
    },
  });

  if (error) {
    console.error('Signup error:', error);
    return { error: error.message || 'خطا در ثبت‌نام' };
  }

  // 4. Send Welcome Email (Optional/Bonus via Brevo)
  if (data.user?.email) {
    // We don't block on this
    sendEmail({
      to: data.user.email,
      subject: 'به کارنکس خوش آمدید | Karnex',
      htmlContent: EMAIL_TEMPLATES.welcome(full_name),
    }).catch(console.error);
  }

  // Redirect to Verify Email page
  return redirect('/auth/verify-email');
}

export async function forgotPassword(
  prevState: AuthFormState,
  formData: FormData
): Promise<AuthFormState> {
  const supabase = createClient();
  const email = String(formData.get('email')).trim();
  const token = String(formData.get('cf-turnstile-response') || '');

  const isHuman = await verifyTurnstileToken(token);
  if (!isHuman) return { error: 'لطفا تایید کنید که ربات نیستید' };

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${ENV.NEXT_PUBLIC_APP_URL}/auth/callback?next=/auth/reset-password`,
  });

  if (error) {
    // Security: Don't reveal if email exists, but helpful error if generic
    console.error('Forgot password error:', error);
    // Rate limit error?
    if (error.message.includes('Too many')) return { error: 'لطفا کمی صبر کنید' };
  }

  return { success: true, message: 'لینک بازیابی ارسال شد' };
}

export async function resetPassword(
  prevState: AuthFormState,
  formData: FormData
): Promise<AuthFormState> {
  const supabase = createClient();
  const password = String(formData.get('password')).trim();

  const { error } = await supabase.auth.updateUser({ password });
  if (error) return { error: 'خطا در تغییر رمز عبور' };

  return redirect('/dashboard');
}

export async function signOut() {
  const supabase = createClient();
  await supabase.auth.signOut();
  return redirect('/login');
}

export async function updateProfile(formData: FormData) {
  const supabase = createClient();
  const full_name = String(formData.get('full_name')).trim();

  const { error } = await supabase.auth.updateUser({ data: { full_name } });
  if (error) return { error: error.message };
  return { success: true };
}

export async function resendVerification() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user?.email) {
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email: user.email,
      options: {
        emailRedirectTo: `${ENV.NEXT_PUBLIC_APP_URL}/auth/callback`,
      },
    });
    if (error) return { error: error.message };
    return { success: true, message: 'ایمیل فعال‌سازی مجددا ارسال شد' };
  }
  return { error: 'کاربر یافت نشد' };
}
