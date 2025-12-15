import { DriveStep } from 'driver.js';

export const tourSteps: Record<string, DriveStep[]> = {
  bmc: [
    {
      element: '#bmc-header',
      popover: {
        title: 'بوم مدل کسب‌وکار',
        description: 'در این صفحه می‌توانید ۹ جزء اصلی مدل کسب‌وکار خود را طراحی کنید.',
      },
    },
    {
      element: '#bmc-block-segments',
      popover: {
        title: 'بخش‌بندی مشتریان',
        description: 'مخاطبان اصلی خود را مشخص کنید. برای چه کسانی ارزش خلق می‌کنید؟',
      },
    },
    {
      element: '#bmc-block-propositions',
      popover: {
        title: 'ارزش پیشنهادی',
        description: 'چه مشکلی را حل می‌کنید؟ مزیت رقابتی شما چیست؟',
      },
    },
    {
      element: '#bmc-block-revenue',
      popover: {
        title: 'جریان درآمدی',
        description: 'روش‌های کسب درآمد خود را اینجا بنویسید (فروش، اشتراک و ...).',
      },
    },
  ],
  market: [
    {
      element: '#market-category',
      popover: {
        title: 'شروع تحلیل',
        description: 'ابتدا حوزه کاری خود را وارد کنید (مثلا: فروشگاه کفش).',
      },
    },
    {
      element: '#market-generate-btn',
      popover: {
        title: 'تحلیل هوشمند',
        description: 'با کلیک روی این دکمه، هوش مصنوعی رقبای شما را تحلیل می‌کند.',
      },
    },
  ],
  plan: [
    {
      element: '#plan-pro-gate',
      popover: {
        title: 'بیزنس پلن جامع',
        description: 'این بخش مخصوص کاربران حرفه‌ای است و امکان تولید پلن کامل را می‌دهد.',
      },
    },
  ],
};
