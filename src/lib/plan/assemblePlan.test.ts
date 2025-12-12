import { describe, expect, it } from 'vitest';

import { assemblePlan } from './assemblePlan';
import type { SectionKey } from '@/types/sections';

const basePlan = {
  businessName: 'نمونه',
  tagline: 'تست',
  summary: 'خلاصه',
  colorPalette: ['#000000', '#ffffff', '#123456', '#abcdef'],
  logoSVG: '<svg><rect width="10" height="10"/></svg>',
  landingPageCopy: {
    headline: 'هدر',
    subheadline: 'زیر هدر',
    cta: 'شروع',
    features: [],
    testimonials: [],
  },
  leanCanvas: {
    problem: 'مساله',
    solution: 'راه حل',
    uniqueValue: 'ارزش',
    unfairAdvantage: 'مزیت',
    customerSegments: 'مشتریان',
    channels: 'کانال‌ها',
    revenueStream: 'درآمد',
    costStructure: 'هزینه',
  },
  roadmap: [
    { week: '۱', focus: 'فوکوس', tasks: ['کار ۱'] },
    { week: '۲', focus: 'فوکوس', tasks: ['کار ۲'] },
    { week: '۳', focus: 'فوکوس', tasks: ['کار ۳'] },
    { week: '۴', focus: 'فوکوس', tasks: ['کار ۴'] },
  ],
  marketingSteps: ['۱', '۲', '۳', '۴', '۵'],
};

const sectionize = (): { section_key: SectionKey; content: unknown }[] => [
  {
    section_key: 'identity',
    content: {
      businessName: basePlan.businessName,
      tagline: basePlan.tagline,
      summary: basePlan.summary,
    },
  },
  {
    section_key: 'branding',
    content: { colorPalette: basePlan.colorPalette, logoSVG: basePlan.logoSVG },
  },
  { section_key: 'landing', content: { landingPageCopy: basePlan.landingPageCopy } },
  { section_key: 'lean_canvas', content: { leanCanvas: basePlan.leanCanvas } },
  {
    section_key: 'roadmap',
    content: { roadmap: basePlan.roadmap, marketingSteps: basePlan.marketingSteps },
  },
];

describe('assemblePlan', () => {
  it('assembles a valid plan', () => {
    const result = assemblePlan(sectionize());
    expect(result.businessName).toBe(basePlan.businessName);
    expect(result.colorPalette.length).toBe(4);
  });

  it('fails when a section is missing', () => {
    expect(() => assemblePlan(sectionize().slice(0, 3))).toThrow();
  });

  it('fails when section content is invalid', () => {
    const bad: { section_key: SectionKey; content: unknown }[] = sectionize();
    bad[0] = { section_key: 'identity', content: { businessName: '' } };
    expect(() => assemblePlan(bad)).toThrow();
  });
});
