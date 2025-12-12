import { describe, expect, it } from 'vitest';

import { BusinessPlanV1Schema } from './businessPlan';

const validPlan = {
  businessName: 'نمونه استارتاپ',
  tagline: 'یک شعار کوتاه',
  summary: 'خلاصه‌ای کوتاه از ایده و مزیت رقابتی در بازار ایران.',
  colorPalette: ['#0f172a', '#1e293b', '#3b82f6', '#22d3ee'],
  logoSVG: '<svg><rect width="100" height="100" fill="#0f172a"/></svg>',
  marketingSteps: ['گام اول', 'گام دوم', 'گام سوم', 'گام چهارم', 'گام پنجم'],
  landingPageCopy: {
    headline: 'عنوان جذاب صفحه',
    subheadline: 'توضیح کوتاه و قانع‌کننده برای مخاطب هدف',
    cta: 'شروع کنید',
    features: [{ title: 'ویژگی ۱', description: 'توضیح کوتاه', iconName: 'Star' }],
    testimonials: [{ name: 'مشتری خوشحال', role: 'مدیر محصول', quote: 'واقعا عالی بود' }],
    footer: { copyrightText: 'تمام حقوق محفوظ است', socialLinks: ['Instagram'] },
  },
  leanCanvas: {
    problem: 'مشکل اصلی بازار',
    solution: 'راه‌حل پیشنهادی',
    uniqueValue: 'ارزش متمایز محصول',
    unfairAdvantage: 'مزیت غیر قابل کپی',
    customerSegments: 'مشتریان اولیه',
    channels: 'کانال‌های دسترسی',
    revenueStream: 'مدل درآمدی',
    costStructure: 'ساختار هزینه‌ها',
  },
  roadmap: [
    { week: 'هفته ۱', focus: 'آماده‌سازی', tasks: ['کار اول', 'کار دوم'] },
    { week: 'هفته ۲', focus: 'ساخت MVP', tasks: ['کار سوم', 'کار چهارم'] },
    { week: 'هفته ۳', focus: 'بازاریابی', tasks: ['کار پنجم', 'کار ششم'] },
    { week: 'هفته ۴', focus: 'راه‌اندازی', tasks: ['کار هفتم', 'کار هشتم'] },
  ],
};

describe('BusinessPlanV1Schema', () => {
  it('accepts a valid business plan', () => {
    const result = BusinessPlanV1Schema.safeParse(validPlan);
    expect(result.success).toBe(true);
  });

  it('rejects an invalid business plan', () => {
    const result = BusinessPlanV1Schema.safeParse({
      ...validPlan,
      marketingSteps: ['کوتاه'],
    });
    expect(result.success).toBe(false);
  });

  it('enforces palette hex format and roadmap length', () => {
    const result = BusinessPlanV1Schema.safeParse({
      ...validPlan,
      colorPalette: ['blue', '#123456', '#abcdef', '#000000'],
      roadmap: validPlan.roadmap.slice(0, 2),
    });
    expect(result.success).toBe(false);
  });
});
