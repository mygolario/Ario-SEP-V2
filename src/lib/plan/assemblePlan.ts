import { sanitizeLogoSvg } from '../security/sanitizeSvg';
import { BusinessPlanV1Schema } from '../validators/businessPlan';
import type { BusinessPlanV1 } from '@/types/businessPlan';
import type { SectionKey } from '@/types/sections';

type SectionContentMap = {
  identity: {
    businessName: BusinessPlanV1['businessName'];
    tagline: BusinessPlanV1['tagline'];
    summary: BusinessPlanV1['summary'];
  };
  branding: {
    colorPalette: BusinessPlanV1['colorPalette'];
    logoSVG?: BusinessPlanV1['logoSVG'];
  };
  landing: {
    landingPageCopy: BusinessPlanV1['landingPageCopy'];
  };
  lean_canvas: {
    leanCanvas: BusinessPlanV1['leanCanvas'];
  };
  roadmap: {
    roadmap: BusinessPlanV1['roadmap'];
    marketingSteps: BusinessPlanV1['marketingSteps'];
  };
};

type SectionRecord = {
  section_key: SectionKey;
  content: unknown;
};

export function assemblePlan(sections: SectionRecord[]): BusinessPlanV1 {
  const merged: Partial<SectionContentMap> = {};

  sections.forEach(({ section_key, content }) => {
    if (section_key === 'identity') {
      merged.identity = content as SectionContentMap['identity'];
    } else if (section_key === 'branding') {
      merged.branding = content as SectionContentMap['branding'];
    } else if (section_key === 'landing') {
      merged.landing = content as SectionContentMap['landing'];
    } else if (section_key === 'lean_canvas') {
      merged.lean_canvas = content as SectionContentMap['lean_canvas'];
    } else if (section_key === 'roadmap') {
      merged.roadmap = content as SectionContentMap['roadmap'];
    }
  });

  const planCandidate = {
    businessName: merged.identity?.businessName,
    tagline: merged.identity?.tagline,
    summary: merged.identity?.summary,
    colorPalette: merged.branding?.colorPalette,
    logoSVG: merged.branding?.logoSVG,
    landingPageCopy: merged.landing?.landingPageCopy,
    leanCanvas: merged.lean_canvas?.leanCanvas,
    roadmap: merged.roadmap?.roadmap,
    marketingSteps: merged.roadmap?.marketingSteps,
  };

  const validation = BusinessPlanV1Schema.safeParse(planCandidate);
  if (!validation.success) {
    throw validation.error;
  }

  return { ...validation.data, logoSVG: sanitizeLogoSvg(validation.data.logoSVG) };
}
