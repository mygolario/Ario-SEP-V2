import { z } from 'zod';

const hexColor = z
  .string()
  .regex(/^#(?:[0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/, 'Color must be a valid hex code');

export const landingPageFeatureSchema = z
  .object({
    title: z.string().min(1, 'Feature title is required'),
    description: z.string().min(1, 'Feature description is required'),
    iconName: z.string().min(1).optional(),
  })
  .strict();

export const testimonialSchema = z
  .object({
    name: z.string().min(1, 'Testimonial name is required'),
    role: z.string().min(1).optional(),
    quote: z.string().min(1, 'Testimonial quote is required'),
  })
  .strict();

export const landingPageCopySchema = z
  .object({
    headline: z.string().min(1, 'Landing page headline is required'),
    subheadline: z.string().min(1, 'Landing page subheadline is required'),
    cta: z.string().min(1, 'Call to action text is required'),
    features: z.array(landingPageFeatureSchema).default([]),
    testimonials: z.array(testimonialSchema).default([]),
    footer: z
      .object({
        copyrightText: z.string().min(1).optional(),
        socialLinks: z.array(z.string().min(1)).optional(),
      })
      .partial()
      .optional(),
  })
  .strict();

export const leanCanvasSchema = z
  .object({
    problem: z.string().min(1, 'Problem statement is required'),
    solution: z.string().min(1, 'Solution statement is required'),
    uniqueValue: z.string().min(1, 'Unique value proposition is required'),
    unfairAdvantage: z.string().min(1, 'Unfair advantage is required'),
    customerSegments: z.string().min(1, 'Customer segments are required'),
    channels: z.string().min(1, 'Channels are required'),
    revenueStream: z.string().min(1, 'Revenue stream is required'),
    costStructure: z.string().min(1, 'Cost structure is required'),
  })
  .strict();

export const roadmapItemSchema = z
  .object({
    week: z.string().min(1, 'Week label is required'),
    focus: z.string().min(1, 'Focus is required'),
    tasks: z.array(z.string().min(1, 'Task is required')).min(1),
  })
  .strict();

export const onePagePlanSchema = z
  .object({
    title: z.string().min(1, 'Title is required'),
    elevatorPitch: z.string().min(1, 'Elevator pitch is required'),
    problem: z.string().min(1, 'Problem is required'),
    solution: z.string().min(1, 'Solution is required'),
    targetCustomer: z.string().min(1, 'Target customer is required'),
    uniqueValue: z.string().min(1, 'Unique value is required'),
    businessModel: z.string().min(1, 'Business model is required'),
    goToMarket: z.array(z.string().min(1)).min(3, 'At least 3 go-to-market steps'),
    keyMetrics: z.array(z.string().min(1)).min(3, 'At least 3 key metrics'),
    risks: z.array(z.string().min(1)).min(3, 'At least 3 risks'),
    next7Days: z.array(z.string().min(1)).min(5, 'At least 5 items for next 7 days'),
  })
  .strict();

// Phase 6: Journey Engine Schemas

export const userProfileSchema = z.object({
  industry: z.string().default('general'),
  city: z.string().default('tehran'),
  budget: z.string().default('unknown'),
  timeline: z.string().default('asap'),
  skills: z.array(z.string()).default([]),
  goal: z.string().default('start'),
});

export const journeyBlockTypeSchema = z.enum([
  'text',
  'checklist',
  'warning',
  'tip',
  'financial',
  'legal',
]);

export const journeyBlockSchema = z.object({
  id: z.string(),
  type: journeyBlockTypeSchema,
  title: z.string().optional(),
  content: z.string(),
  metadata: z
    .object({
      tags: z.array(z.string()).optional(),
      weight: z.number().optional(),
      source: z.string().optional(),
      actionable: z.boolean().optional(),
    })
    .optional(),
});

export const journeySectionSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  blocks: z.array(journeyBlockSchema),
  isCollapsed: z.boolean().optional(),
});

export const journeyPlanSchema = z.object({
  id: z.string(),
  userProfile: userProfileSchema,
  sections: z.array(journeySectionSchema),
  createdAt: z.string(),
  seed: z.number(),
});

export const BusinessPlanV1Schema = z
  .object({
    businessName: z.string().min(1, 'Business name is required'),
    tagline: z.string().min(1, 'Tagline is required'),
    summary: z.string().min(1, 'Summary is required'),
    colorPalette: z.array(hexColor).min(4).max(6),
    logoSVG: z.string().min(1).optional(),
    marketingSteps: z.array(z.string().min(1)).length(5),
    landingPageCopy: landingPageCopySchema,
    leanCanvas: leanCanvasSchema,
    roadmap: z.array(roadmapItemSchema).length(4),
    onePagePlan: onePagePlanSchema.optional(),
    // Phase 6 Extension
    journey: journeyPlanSchema.optional(),
  })
  .strict();

export type LandingPageFeature = z.infer<typeof landingPageFeatureSchema>;
export type Testimonial = z.infer<typeof testimonialSchema>;
export type LandingPageCopy = z.infer<typeof landingPageCopySchema>;
export type LeanCanvas = z.infer<typeof leanCanvasSchema>;
export type RoadmapItem = z.infer<typeof roadmapItemSchema>;
export type OnePagePlan = z.infer<typeof onePagePlanSchema>;
export type UserProfile = z.infer<typeof userProfileSchema>;
export type JourneyBlock = z.infer<typeof journeyBlockSchema>;
export type JourneySection = z.infer<typeof journeySectionSchema>;
export type JourneyPlan = z.infer<typeof journeyPlanSchema>;
export type BusinessPlanV1 = z.infer<typeof BusinessPlanV1Schema>;
