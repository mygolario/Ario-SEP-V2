import { describe, expect, it } from 'vitest';

import { assemblePlan } from './assemblePlan';
import type { SectionKey } from '@/types/sections';

const basePlan = {
  businessName: 'Test Venture',
  tagline: 'Launch fast',
  summary: 'A concise summary for testing.',
  colorPalette: ['#000000', '#ffffff', '#123456', '#abcdef'],
  logoSVG: '<svg><rect width="10" height="10"/></svg>',
  landingPageCopy: {
    headline: 'Headline',
    subheadline: 'Subheadline',
    cta: 'CTA',
    features: [],
    testimonials: [],
  },
  leanCanvas: {
    problem: 'Problem statement',
    solution: 'Solution statement',
    uniqueValue: 'Unique value',
    unfairAdvantage: 'Unfair advantage',
    customerSegments: 'Customer segments',
    channels: 'Channels',
    revenueStream: 'Revenue stream',
    costStructure: 'Cost structure',
  },
  roadmap: [
    { week: 'Week 1', focus: 'Focus 1', tasks: ['Task 1'] },
    { week: 'Week 2', focus: 'Focus 2', tasks: ['Task 2'] },
    { week: 'Week 3', focus: 'Focus 3', tasks: ['Task 3'] },
    { week: 'Week 4', focus: 'Focus 4', tasks: ['Task 4'] },
  ],
  marketingSteps: ['Step 1', 'Step 2', 'Step 3', 'Step 4', 'Step 5'],
  onePagePlan: {
    title: 'One Page Title',
    elevatorPitch: 'Quick pitch text.',
    problem: 'Primary problem',
    solution: 'Primary solution',
    targetCustomer: 'Target audience',
    uniqueValue: 'Differentiator',
    businessModel: 'How we make money',
    goToMarket: ['Step A', 'Step B', 'Step C'],
    keyMetrics: ['Metric A', 'Metric B', 'Metric C'],
    risks: ['Risk A', 'Risk B', 'Risk C'],
    next7Days: ['Task A', 'Task B', 'Task C', 'Task D', 'Task E'],
  },
};

const sectionize = (includeOnePagePlan = true): { section_key: SectionKey; content: unknown }[] => {
  const baseSections = [
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
  ] as { section_key: SectionKey; content: unknown }[];

  if (includeOnePagePlan) {
    baseSections.push({
      section_key: 'one_page_plan',
      content: basePlan.onePagePlan,
    });
  }

  return baseSections;
};

describe('assemblePlan', () => {
  it('assembles a valid plan with one page plan', () => {
    const result = assemblePlan(sectionize());
    expect(result.businessName).toBe(basePlan.businessName);
    expect(result.colorPalette.length).toBe(4);
    expect(result.onePagePlan?.title).toBe(basePlan.onePagePlan.title);
  });

  it('assembles when one_page_plan section is missing', () => {
    const result = assemblePlan(sectionize(false));
    expect(result.onePagePlan).toBeUndefined();
  });

  it('fails when a required section is missing', () => {
    const withoutLanding = sectionize().filter((section) => section.section_key !== 'landing');
    expect(() => assemblePlan(withoutLanding)).toThrow();
  });

  it('fails when section content is invalid', () => {
    const bad: { section_key: SectionKey; content: unknown }[] = sectionize();
    bad[0] = { section_key: 'identity', content: { businessName: '' } };
    expect(() => assemblePlan(bad)).toThrow();
  });
});
