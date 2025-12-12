import type {
  BusinessPlanV1 as BusinessPlanV1Type,
  LandingPageCopy as LandingPageCopyType,
  LandingPageFeature as LandingPageFeatureType,
  LeanCanvas as LeanCanvasType,
  RoadmapItem as RoadmapItemType,
  Testimonial as TestimonialType,
} from '@/lib/validators/businessPlan';

export type BusinessPlanV1 = BusinessPlanV1Type;
export type LandingPageCopy = LandingPageCopyType;
export type LandingPageFeature = LandingPageFeatureType;
export type Testimonial = TestimonialType;
export type LeanCanvas = LeanCanvasType;
export type RoadmapItem = RoadmapItemType;
export type LandingPageFooter = NonNullable<LandingPageCopy['footer']>;

export interface GenerationRequestPayload {
  idea: string;
  audience: string;
  vibe: string;
  budget: string;
  goal: string;
}
