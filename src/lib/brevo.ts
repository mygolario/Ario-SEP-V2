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

/**
 * Professional HTML Email Wrapper
 */
const getHtmlTemplate = (
  title: string,
  bodyContent: string,
  cta?: { text: string; url: string }
) => `
<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>
    @import url('https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.003/Vazirmatn-font-face.css');
    
    body { 
      font-family: 'Vazirmatn', Tahoma, sans-serif; 
      background-color: #f1f5f9; 
      margin: 0; 
      padding: 0; 
      line-height: 1.8; 
      color: #334155; 
      -webkit-font-smoothing: antialiased;
    }

    .wrapper {
      width: 100%;
      background-color: #f1f5f9;
      padding: 40px 0;
    }

    .container { 
      max-width: 600px; 
      margin: 0 auto; 
      background-color: #ffffff; 
      border-radius: 16px; 
      overflow: hidden; 
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.01);
    }

    .header { 
      background-color: #0f172a; 
      padding: 40px 20px; 
      text-align: center; 
      background-image: linear-gradient(to right, #0f172a, #1e293b);
    }
    
    .logo-text {
      color: #ffffff;
      font-size: 26px;
      font-weight: 800;
      letter-spacing: -1px;
      margin: 0;
    }
    
    .logo-sub {
      color: #94a3b8;
      font-size: 13px;
      margin-top: 5px;
      font-weight: 400;
    }

    .content { 
      padding: 40px 30px; 
      direction: rtl;
      text-align: right;
    }

    .greeting { 
      font-size: 20px; 
      font-weight: 800; 
      margin-bottom: 25px; 
      color: #0f172a; 
      text-align: right;
    }

    .message { 
      margin-bottom: 30px; 
      font-size: 16px; 
      color: #475569;
      text-align: right;
      line-height: 1.8;
    }

    .highlight-box { 
      background-color: #f8fafc; 
      border: 1px solid #e2e8f0;
      padding: 25px; 
      margin: 30px 0; 
      border-radius: 12px; 
      text-align: center; 
    }

    .code { 
      font-family: monospace; 
      font-size: 36px; 
      letter-spacing: 8px; 
      font-weight: 800; 
      color: #4f46e5; 
    }

    .cta-container {
      text-align: center;
      margin-top: 35px;
      margin-bottom: 20px;
    }

    .cta-button { 
      display: inline-block; 
      background-color: #4f46e5; 
      color: #ffffff !important; 
      padding: 16px 32px; 
      text-decoration: none; 
      border-radius: 12px; 
      font-weight: 700; 
      font-size: 16px; 
      box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);
      transition: all 0.2s ease;
      text-align: center;
    }

    .support-box {
      background-color: #f0f9ff;
      border-right: 4px solid #0ea5e9;
      padding: 20px;
      border-radius: 8px;
      margin: 20px 0;
      font-size: 15px;
    }
    
    .ticket-badge {
      display: inline-block;
      background-color: #e2e8f0;
      color: #475569;
      padding: 4px 12px;
      border-radius: 99px;
      font-size: 12px;
      font-weight: 600;
      margin-bottom: 15px;
    }

    .footer { 
      background-color: #f8fafc; 
      padding: 30px; 
      text-align: center; 
      font-size: 13px; 
      color: #64748b; 
      border-top: 1px solid #e2e8f0; 
    }

    .footer-links {
      margin-top: 15px;
    }

    .footer a { 
      color: #475569; 
      text-decoration: none; 
      margin: 0 8px; 
      font-weight: 500;
    }

    @media only screen and (max-width: 600px) {
      .wrapper { padding: 0; }
      .container { width: 100% !important; border-radius: 0 !important; box-shadow: none; }
      .content { padding: 30px 20px; }
      .header { padding: 30px 20px; }
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="container">
      <div class="header">
        <h1 class="logo-text">کارنکس</h1>
        <div class="logo-sub">دستیار هوشمند راه‌اندازی استارتاپ</div>
      </div>
      <div class="content">
        <div class="greeting">${title}</div>
        <div class="message">
          ${bodyContent}
        </div>
        ${
          cta
            ? `
          <div class="cta-container">
            <a href="${cta.url}" class="cta-button">${cta.text}</a>
          </div>
        `
            : ''
        }
      </div>
      <div class="footer">
        <p>این ایمیل برای اطلاع‌رسانی به شما ارسال شده است.</p>
        <div class="footer-links">
          <a href="https://karnex.ir">وب‌سایت</a> • 
          <a href="https://karnex.ir/dashboard-v2">داشبورد</a> • 
          <a href="https://karnex.ir/support">پشتیبانی</a>
        </div>
        <p style="margin-top: 20px; font-size: 11px; opacity: 0.7;">
          © ${new Date().getFullYear()} کارنکس. تمامی حقوق محفوظ است.
        </p>
      </div>
    </div>
  </div>
</body>
</html>
`;

export const EMAIL_TEMPLATES = {
  verification: (code: string) =>
    getHtmlTemplate(
      'تایید ایمیل',
      `
      <p>خوشحالیم که به خانواده کارنکس پیوستید.</p>
      <p>برای ایمن‌سازی حساب کاربری و تکمیل ثبت‌نام، لطفا از کد تایید زیر استفاده کنید:</p>
      <div class="highlight-box">
        <span class="code">${code}</span>
      </div>
      <p style="text-align: center; font-size: 14px; opacity: 0.8;">اعتبار این کد ۱۰ دقیقه می‌باشد.</p>
    `
    ),

  resetPassword: (link: string) =>
    getHtmlTemplate(
      'بازنشانی رمز عبور',
      `
      <p>درخواستی برای تغییر رمز عبور حساب کاربری شما دریافت کردیم.</p>
      <p>اگر شما این درخواست را ارسال کردید، برای تنظیم رمز عبور جدید روی دکمه زیر کلیک کنید:</p>
    `,
      { text: 'تغییر رمز عبور', url: link }
    ),

  welcome: (name: string) =>
    getHtmlTemplate(
      `سلام ${name}، خوش آمدید!`,
      `
      <p>از اینکه کارنکس را برای مسیر کارآفرینی خود انتخاب کردید، سپاسگزاریم.</p>
      <p>ما اینجا هستیم تا ایده شما را به یک نقشه راه عملی و موفق تبدیل کنیم. همه ابزارهای لازم در داشبورد شما آماده‌ هستند.</p>
      <div class="support-box">
        <strong>💡 نکته شروع:</strong>
        <br/>
        اولین پروژه خود را بسازید تا قدرت هوش مصنوعی کارنکس را تجربه کنید.
      </div>
    `,
      { text: 'ورود به داشبورد', url: 'https://karnex.ir/dashboard-v2' }
    ),

  supportReply: (ticketId: string, replyContent: string) =>
    getHtmlTemplate(
      'پاسخ پشتیبانی',
      `
          <div class="ticket-badge">تیکت #${ticketId}</div>
          <p>همکاران ما پیام شما را بررسی کردند. پاسخ زیر جهت راهنمایی ارسال می‌گردد:</p>
          <div class="support-box" style="background-color: #f8fafc; border-color: #cbd5e1; color: #334155;">
             ${replyContent}
          </div>
          <p>امیدواریم این پاسخ برای شما راهگشا باشد. در صورت نیاز به راهنمایی بیشتر، همین ایمیل را پاسخ دهید.</p>
          `
    ),

  weeklyOverview: (stats: { projects: number; tasksCompleted: number; daysActive: number }) =>
    getHtmlTemplate(
      'گزارش هفتگی شما در کارنکس',
      `
      <p>هفته پرباری داشته‌اید! نگاهی به عملکرد ۷ روز گذشته شما:</p>
      
      <div style="display: flex; gap: 10px; margin: 30px 0; justify-content: center;">
        <div style="background: #f1f5f9; padding: 15px; border-radius: 12px; text-align: center; flex: 1;">
          <div style="font-size: 24px; font-weight: 800; color: #4f46e5;">${stats.projects}</div>
          <div style="font-size: 12px; color: #64748b;">پروژه‌های فعال</div>
        </div>
        <div style="background: #f1f5f9; padding: 15px; border-radius: 12px; text-align: center; flex: 1;">
          <div style="font-size: 24px; font-weight: 800; color: #10b981;">${stats.tasksCompleted}</div>
          <div style="font-size: 12px; color: #64748b;">وظایف تکمیل شده</div>
        </div>
        <div style="background: #f1f5f9; padding: 15px; border-radius: 12px; text-align: center; flex: 1;">
          <div style="font-size: 24px; font-weight: 800; color: #f59e0b;">${stats.daysActive}</div>
          <div style="font-size: 12px; color: #64748b;">روز فعالیت</div>
        </div>
      </div>

      <p>آماده‌اید قدم بعدی را بردارید؟ ادامه دهید و به اهداف خود نزدیک‌تر شوید.</p>
    `,
      { text: 'مشاهده داشبورد', url: 'https://karnex.ir/dashboard-v2' }
    ),

  inactivityReminder: (days: number) =>
    getHtmlTemplate(
      'دلمان برایتان تنگ شده!',
      `
      <p>حدود ${days} روز است که به پروژه خود سر نزده‌اید.</p>
      <p>رقیبان شما در حال پیشرفت هستند. ایده شما پتانسیل بالایی دارد، حیف است که نیمه‌کاره بماند.</p>
      <div class="support-box" style="border-right-color: #f59e0b; background-color: #fffbeb;">
        <strong>🚀 پیشنهاد ما:</strong>
        <br/>
        فقط ۵ دقیقه وقت بگذارید و یکی از کارهای کوچک لیست خود را انجام دهید. همین قدم کوچک انگیزه شما را برمی‌گرداند.
      </div>
    `,
      { text: 'بازگشت به پروژه', url: 'https://karnex.ir/dashboard-v2' }
    ),

  adminAlert: (type: 'NEW_USER' | 'PAYMENT' | 'System', details: string) =>
    getHtmlTemplate(
      `🔔 هشدار سیستم: ${type}`,
      `
      <div class="ticket-badge" style="background-color: #fee2e2; color: #991b1b;">ADMIN ALERT</div>
      <p>یک رویداد جدید در سیستم ثبت شد:</p>
      <div style="background: #1e293b; color: #e2e8f0; padding: 20px; border-radius: 8px; font-family: monospace; direction: ltr; text-align: left; font-size: 13px;">
${details}
      </div>
      <p>لطفا در صورت نیاز بررسی لازم را انجام دهید.</p>
    `,
      { text: 'پنل مدیریت', url: 'https://karnex.ir/admin' }
    ),
};
