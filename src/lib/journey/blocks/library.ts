import { JourneyBlock } from '@/lib/validators/businessPlan';

export const JOURNEY_BLOCKS: JourneyBlock[] = [
  // 1. Executive Summary (Standard)
  {
    id: 'exec_summary',
    type: 'text',
    title: 'خلاصه مدیریتی',
    content: `
## چشم‌انداز کلی
کسب‌وکار شما، **{{businessName}}**، با هدف ارائه راهکارهای نوآورانه در صنعت **{{industry}}** طراحی شده است.

### چرا این ایده موفق می‌شود؟
- **مزیت رقابتی:** {{uniqueValue}}
- **بازار هدف:** {{audience}}
- **مدل درآمدی:** {{businessModel}}

این طرح بر اساس داده‌های ورودی شما و تحلیل هوش مصنوعی کارنکس تدوین شده است و نقشه‌ی راهی شفاف برای **{{timeline}}** آینده ارائه می‌دهد.
    `,
    metadata: {
      tags: ['general', 'intro'],
      weight: 100,
      actionable: false,
    },
  },

  // 2. Legal / Registration (Iran Specific)
  {
    id: 'iran_legal_enamad',
    type: 'checklist',
    title: 'الزامات قانونی و اینماد',
    content: `
برای فعالیت قانونی در فضای آنلاین ایران، دریافت **اینماد (نماد اعتماد الکترونیکی)** ضروری است.

- [ ] ثبت دامنه در سامانه ایرنیک (برای .ir)
- [ ] طراحی کامل سایت و بارگذاری محصولات/خدمات
- [ ] دریافت کد مالیاتی از Tax.gov.ir
- [ ] ثبت نام در سامانه Enamad.ir
- [ ] دریافت درگاه پرداخت (زرین‌پال/زیبال یا مستقیم)
    `,
    metadata: {
      tags: ['online', 'ecommerce', 'service'],
      weight: 90,
      source: 'Enamad.ir Rules 1403',
      actionable: true,
    },
  },

  // 3. Financial Basics
  {
    id: 'financial_setup',
    type: 'financial',
    title: 'ساختار مالی اولیه',
    content: `
برآورد اولیه برای شروع کار با بودجه **{{budget}}**:

| هزینه | مبلغ تقریبی | توضیحات |
|-------|------------|---------|
| زیرساخت فنی | ۱۰-۵۰ میلیون تومان | سایت، هاست، دامین |
| بازاریابی اولیه | ۲۰-۱۰۰ میلیون تومان | تبلیغات کلیکی، سوشال |
| مجوزها | ۲-۵ میلیون تومان | هزینه‌های اداری |
| **جمع کل** | **بسته به اسکیل** | -- |

> [!TIP]
> برای کاهش هزینه، در ماه اول روی فروش مستقیم تمرکز کنید و از استخدام نیروی ثابت پرهیز کنید.
    `,
    metadata: {
      tags: ['general'],
      weight: 80,
      actionable: true,
    },
  },
];
