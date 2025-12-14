import type {
  BusinessPlanV1 as BusinessPlanV1Type,
  LandingPageCopy as LandingPageCopyType,
  LandingPageFeature as LandingPageFeatureType,
  LeanCanvas as LeanCanvasType,
  OnePagePlan as OnePagePlanType,
  RoadmapItem as RoadmapItemType,
  Testimonial as TestimonialType,
} from '@/lib/validators/businessPlan';

// This file is now primarily for Types that are inferred from Zod.
// Real source of truth is validators/businessPlan.ts
export type LandingPageCopy = LandingPageCopyType;
export type LandingPageFeature = LandingPageFeatureType;
export type Testimonial = TestimonialType;
export type LeanCanvas = LeanCanvasType;
export type RoadmapItem = RoadmapItemType;
export type OnePagePlan = OnePagePlanType;
export type LandingPageFooter = NonNullable<LandingPageCopy['footer']>;
export type BusinessPlanV1 = BusinessPlanV1Type;

export interface UserProfile {
  industry: string;
  city: string; // Iran city or 'Online'
  budget: string; // e.g., 'under_100m', '100m_500m', '500m_plus'
  timeline: string; // e.g., 'asap', '3_months', '6_months'
  skills: string[]; // e.g., ['sales', 'tech', 'management']
  goal: string; // e.g., 'side_hustle', 'startup', 'market_leader'
}

export type JourneyBlockType = 'text' | 'checklist' | 'warning' | 'tip' | 'financial' | 'legal';

export interface JourneyBlock {
  id: string;
  type: JourneyBlockType;
  title?: string;
  content: string; // Markdown supported
  metadata?: {
    tags?: string[];
    weight?: number;
    source?: string; // e.g. 'karnex_legal_db'
    actionable?: boolean;
  };
}

export interface JourneySection {
  id: string;
  title: string;
  description?: string;
  blocks: JourneyBlock[];
  isCollapsed?: boolean;
}

export interface JourneyPlan {
  id: string;
  userProfile: UserProfile;
  sections: JourneySection[];
  createdAt: string;
  seed: number; // For deterministic regeneration
}

// ... existing payload interface ...
export interface GenerationRequestPayload {
  idea: string;
  audience: string;
  vibe: string;
  budget: string;
  goal: string;
  // Phase 6 additions (optional for backward compat until full migration)
  industry?: string;
  city?: string;
  timeline?: string;
  skills?: string[];
}
