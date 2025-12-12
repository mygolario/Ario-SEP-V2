import { describe, expect, it } from 'vitest';

import { BusinessPlanV1Schema } from './businessPlan';

const validPlan = {
  businessName: 'Test Company',
  tagline: 'Building great things',
  summary: 'A concise summary of the business plan.',
  colorPalette: ['#0f172a', '#1e293b', '#3b82f6', '#22d3ee'],
  logoSVG: '<svg><rect width="100" height="100" fill=\"#0f172a\"/></svg>',
  marketingSteps: ['Step 1', 'Step 2', 'Step 3', 'Step 4', 'Step 5'],
  landingPageCopy: {
    headline: 'Headline text',
    subheadline: 'Subheadline text',
    cta: 'Call to action',
    features: [{ title: 'Feature', description: 'Benefit', iconName: 'Star' }],
    testimonials: [{ name: 'Name', role: 'Role', quote: 'Quote' }],
    footer: { copyrightText: 'Copyright text', socialLinks: ['Instagram'] },
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
    { week: 'Week 1', focus: 'Focus 1', tasks: ['Task 1', 'Task 2'] },
    { week: 'Week 2', focus: 'Focus 2', tasks: ['Task 1', 'Task 2'] },
    { week: 'Week 3', focus: 'Focus 3', tasks: ['Task 1', 'Task 2'] },
    { week: 'Week 4', focus: 'Focus 4', tasks: ['Task 1', 'Task 2'] },
  ],
};

const onePagePlan = {
  title: 'One Page Title',
  elevatorPitch: 'Short convincing paragraph.',
  problem: 'Problem statement',
  solution: 'Solution summary',
  targetCustomer: 'Target customer',
  uniqueValue: 'Unique value proposition',
  businessModel: 'Business model',
  goToMarket: ['Step A', 'Step B', 'Step C'],
  keyMetrics: ['Metric A', 'Metric B', 'Metric C'],
  risks: ['Risk A', 'Risk B', 'Risk C'],
  next7Days: ['Task A', 'Task B', 'Task C', 'Task D', 'Task E'],
};

describe('BusinessPlanV1Schema', () => {
  it('accepts a valid business plan without onePagePlan (backward compatible)', () => {
    const result = BusinessPlanV1Schema.safeParse(validPlan);
    expect(result.success).toBe(true);
  });

  it('accepts a valid business plan with onePagePlan', () => {
    const result = BusinessPlanV1Schema.safeParse({ ...validPlan, onePagePlan });
    expect(result.success).toBe(true);
  });

  it('rejects an invalid business plan', () => {
    const result = BusinessPlanV1Schema.safeParse({
      ...validPlan,
      marketingSteps: ['Only one step'],
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

  it('enforces onePagePlan list minimums', () => {
    const result = BusinessPlanV1Schema.safeParse({
      ...validPlan,
      onePagePlan: { ...onePagePlan, goToMarket: ['Only one'], next7Days: ['Task 1', 'Task 2'] },
    });
    expect(result.success).toBe(false);
  });
});
