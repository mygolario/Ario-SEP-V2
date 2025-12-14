import { Playbook } from '@/types/playbook';

export const PLAYBOOKS: Record<string, Playbook> = {
  company_reg: {
    id: 'pb_company_reg',
    relatedBlockId: 'legal_registration',
    title: 'راهنمای ثبت شرکت و رسمیت کسب‌وکاره',
    description: 'راهنمای جامع برای انتخاب ساختار حقوقی، ثبت شرکت و دریافت کدهای اقتصادی.',
    contents: {
      fast: {
        level: 'fast',
        costEstimate: '۰ تومان',
        timeEstimate: 'آنی',
        steps: [
          {
            id: 's1',
            title: 'فعالیت به صورت حقیقی (فریلنسری)',
            description: 'نیازی به ثبت شرکت رسمی نیست. می‌توانید با کدملی فعالیت کنید.',
          },
          {
            id: 's2',
            title: 'دریافت کد مالیاتی',
            description: 'ثبت نام در my.tax.gov.ir برای دریافت کد رهگیری مالیاتی جهت درگاه پرداخت.',
          },
        ],
        definitionOfDone: ['کد رهگیری مالیاتی دریافت شد', 'اینماد (شخصی) دریافت شد'],
      },
      standard: {
        level: 'standard',
        costEstimate: '۲,۰۰۰,۰۰۰ - ۳,۰۰۰,۰۰۰ تومان',
        timeEstimate: '۱۰ - ۱۴ روز کاری',
        steps: [
          {
            id: 's1',
            title: 'انتخاب نام شرکت',
            description: 'انتخاب ۵ نام سه سیلابی خاص که ریشه فارسی داشته باشند.',
          },
          {
            id: 's2',
            title: 'تنظیم اساسنامه (سهامی خاص)',
            description: 'استفاده از نمونه اساسنامه استاندارد اداره ثبت شرکت‌ها.',
          },
          {
            id: 's3',
            title: 'امضای الکترونیک',
            description: 'دریافت گواهی امضای الکترونیک (Token) برای اعضای هیئت مدیره.',
          },
          {
            id: 's4',
            title: 'ارسال مدارک در سامانه اداره ثبت',
            description: 'بارگذاری مدارک هویتی و صورتجلسات در irsherkat.ssaa.ir',
          },
        ],
        options: [
          {
            title: 'ثبت توسط خودتان',
            description: 'انجام مراحل در سامانه اداره ثبت توسط خود بنیان‌گذاران.',
            pros: ['هزینه کمتر (فقط هزینه‌های دولتی)'],
            cons: ['پیچیدگی اداری', 'احتمال رد شدن نام یا مدارک'],
          },
          {
            title: 'استفاده از شرکت‌های ثبتی',
            description: 'برون‌سپاری به موسسات ثبتی مثل آسان‌ثبت یا ثبت‌یار.',
            pros: ['سرعت بالاتر', 'مشاوره حقوقی', 'احتمال خطای کمتر'],
            cons: ['هزینه کارمزد (۲ تا ۵ میلیون تومان)'],
            recommendation: 'recommended',
          },
        ],
        mistakes: [
          {
            title: 'انتخاب نام تکراری',
            description: 'استفاده از نام‌های عمومی باعث رد درخواست و اتلاف زمان ۲ هفته‌ای می‌شود.',
            severity: 'medium',
          },
          {
            title: 'تعیین موضوع فعالیت محدود',
            description: 'موضوع فعالیت را کلی‌تر بنویسید تا در آینده نیاز به تغیر اساسنامه نباشد.',
            severity: 'low',
          },
        ],
        definitionOfDone: [
          'آگهی تاسیس در روزنامه رسمی منتشر شد',
          'مهر شرکت ساخته شد',
          'دفاتر پلمپ مالیاتی دریافت شد',
        ],
      },
      deep: {
        level: 'deep',
        costEstimate: '۵,۰۰۰,۰۰۰+ تومان',
        timeEstimate: '۳ - ۴ ماه',
        steps: [
          { id: 's1', title: 'ثبت شرکت سهامی خاص', description: 'انجام مراحل ثبت استاندارد.' },
          {
            id: 's2',
            title: 'اخذ مجوز دانش‌بنیان',
            description: 'ارزیابی در سامانه معاونت علمی ریاست جمهوری (daneshbonyan.ir).',
          },
          {
            id: 's3',
            title: 'ثبت برند و علامت تجاری',
            description: 'ثبت لوگو و نام تجاری برای حفاظت قانونی.',
          },
        ],
        definitionOfDone: ['شرکت ثبت شد', 'گواهی دانش‌بنیان (نوپا) دریافت شد', 'برند ثبت شد'],
      },
    },
  },
  payment_gateway: {
    id: 'pb_payment',
    relatedBlockId: 'fin_bank',
    title: 'راهنمای دریافت درگاه پرداخت',
    description: 'چگونه پول مشتریان را دریافت کنیم؟ بررسی روش‌های پرداخت‌یاری و PSP.',
    contents: {
      fast: {
        level: 'fast',
        costEstimate: 'کارمزد ۱٪ تراکنش',
        timeEstimate: '۱ - ۲ روز',
        steps: [
          {
            id: 's1',
            title: 'ثبت نام در پرداخت‌یار',
            description: 'استفاده از سرویس‌هایی مثل زرین‌پال، زیبال یا آیدی‌پی.',
          },
          {
            id: 's2',
            title: 'احراز هویت و اینماد',
            description: 'دریافت اینماد خاکستری (بدون ستاره) که سریع صادر می‌شود.',
          },
          { id: 's3', title: 'دریافت API Key', description: 'اتصال درگاه به وب‌سایت.' },
        ],
        options: [
          {
            title: 'زرین‌پال',
            description: 'قدیمی‌ترین پرداخت‌یار.',
            pros: ['محبوبیت', 'پلاگین‌های آماده'],
            cons: ['تسویه حساب ممکن است با تاخیر باشد'],
            recommendation: 'recommended',
          },
          {
            title: 'زیبال',
            description: 'تمرکز بر پایداری و مسیردهی هوشمند.',
            pros: ['نرخ تراکنش موفق بالا', 'سوئیچینگ هوشمند'],
            cons: [],
            recommendation: 'advanced',
          },
        ],
        definitionOfDone: ['درگاه پرداخت فعال شد', 'تراکنش تستی موفقیت‌آمیز بود'],
      },
      standard: {
        level: 'standard',
        costEstimate: 'بدون کارمزد (یا کم)',
        timeEstimate: '۱ - ۲ هفته',
        steps: [
          {
            id: 's1',
            title: 'دریافت اینماد تک ستاره',
            description: 'تکمیل پروفایل کسب‌وکار و احراز هویت پستی/تلفنی.',
          },
          {
            id: 's2',
            title: 'درخواه درگاه مستقیم (PSP)',
            description: 'درخواست از به‌پرداخت ملت، سامان کیش یا پارسیان.',
          },
        ],
        definitionOfDone: ['قرارداد با PSP امضا شد', 'ترمینال فعال شد'],
      },
      deep: {
        level: 'deep',
        costEstimate: 'توسعه فنی',
        timeEstimate: '۱ ماه',
        steps: [
          {
            id: 's1',
            title: 'پیاده‌سازی Smart Routing',
            description: 'استفاده از چند درگاه همزمان برای افزایش پایداری.',
          },
          {
            id: 's2',
            title: 'کیف پول داخلی',
            description: 'پیاده‌سازی ساختار کیف پول برای کاهش تعداد تراکنش‌های بانکی.',
          },
        ],
        definitionOfDone: ['سیستم مدیریت تراکنش چندگانه فعال است'],
      },
    },
  },
};
