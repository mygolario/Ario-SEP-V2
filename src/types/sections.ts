export const SECTION_KEYS = [
  'identity',
  'branding',
  'landing',
  'lean_canvas',
  'roadmap',
  'one_page_plan',
  'journey',
] as const;
export type SectionKey = (typeof SECTION_KEYS)[number];
