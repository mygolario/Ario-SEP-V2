import { z } from 'zod';

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

export const BusinessPlanV1Schema = z
  .object({
    businessName: z.string().min(1, 'Business name is required'),
    tagline: z.string().min(1, 'Tagline is required'),
    summary: z.string().min(1, 'Summary is required'),
    colorPalette: z.array(z.string().min(1)).min(1),
    logoSVG: z.string().min(1).optional(),
    marketingSteps: z.array(z.string().min(1)).min(1),
    landingPageCopy: landingPageCopySchema,
    leanCanvas: leanCanvasSchema,
    roadmap: z.array(roadmapItemSchema).min(1),
  })
  .strict();

export type LandingPageFeature = z.infer<typeof landingPageFeatureSchema>;
export type Testimonial = z.infer<typeof testimonialSchema>;
export type LandingPageCopy = z.infer<typeof landingPageCopySchema>;
export type LeanCanvas = z.infer<typeof leanCanvasSchema>;
export type RoadmapItem = z.infer<typeof roadmapItemSchema>;
export type BusinessPlanV1 = z.infer<typeof BusinessPlanV1Schema>;
