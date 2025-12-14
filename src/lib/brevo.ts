import * as Brevo from '@getbrevo/brevo';
import { ENV } from '@/env';

// Initialize Brevo API
const apiInstance = new Brevo.TransactionalEmailsApi();
// Configure API key authorization: apiKey
if (ENV.BREVO_API_KEY) {
  apiInstance.setApiKey(Brevo.TransactionalEmailsApiApiKeys.apiKey, ENV.BREVO_API_KEY);
}

interface SendEmailParams {
  to: string;
  subject: string;
  htmlContent: string;
}

export const sendEmail = async ({ to, subject, htmlContent }: SendEmailParams) => {
  if (!ENV.BREVO_API_KEY) {
    console.warn('⚠️ BREVO_API_KEY is missing. Email not sent:', { to, subject });
    return { success: false, error: 'BREVO_API_KEY missing' };
  }

  const sendSmtpEmail = new Brevo.SendSmtpEmail();

  sendSmtpEmail.subject = subject;
  sendSmtpEmail.htmlContent = htmlContent;
  sendSmtpEmail.sender = {
    name: 'کارنکس | Karnex',
    email: ENV.BREVO_SENDER_EMAIL || 'kavehtkts@gmail.com',
  };
  sendSmtpEmail.to = [{ email: to }];
  sendSmtpEmail.replyTo = { email: 'support@karnex.ir', name: 'Karnex Support' };

  try {
    const data = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.info('✅ Email sent successfully. Message ID:', data.body.messageId);
    return { success: true, data };
  } catch (error) {
    console.error('❌ Error sending email via Brevo:', error);
    return { success: false, error };
  }
};

/**
 * Templates for common emails
 */
export const EMAIL_TEMPLATES = {
  verification: (code: string) => `
    <div dir="rtl" style="font-family: Tahoma, Arial, sans-serif; line-height: 1.6; color: #333;">
      <h2 style="color: #2563eb;">کد تایید کارنکس</h2>
      <p>با سلام،</p>
      <p>برای تکمیل ثبت‌نام خود در کارنکس، لطفا از کد زیر استفاده کنید:</p>
      <div style="background: #f3f4f6; padding: 15px; text-align: center; font-size: 24px; letter-spacing: 5px; font-weight: bold; border-radius: 8px; margin: 20px 0;">
        ${code}
      </div>
      <p>این کد تا ۱۰ دقیقه معتبر است.</p>
      <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
      <p style="font-size: 12px; color: #888;">اگر شما این درخواست را نداده‌اید، لطفا این ایمیل را نادیده بگیرید.</p>
    </div>
  `,

  resetPassword: (link: string) => `
    <div dir="rtl" style="font-family: Tahoma, Arial, sans-serif; line-height: 1.6; color: #333;">
      <h2 style="color: #2563eb;">بازیابی رمز عبور</h2>
      <p>با سلام،</p>
      <p>برای بازیابی رمز عبور حساب کارنکس خود، روی لینک زیر کلیک کنید:</p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${link}" style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
          تغییر رمز عبور
        </a>
      </div>
      <p>اگر لینک بالا کار نمی‌کند، آدرس زیر را در مرورگر خود کپی کنید:</p>
      <p dir="ltr" style="font-family: monospace; color: #666; word-break: break-all;">${link}</p>
      <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
      <p style="font-size: 12px; color: #888;">اگر شما این درخواست را نداده‌اید، لطفا این ایمیل را نادیده بگیرید.</p>
    </div>
  `,
};
