export const SECTION_KEYS = [
  'identity',
  'branding',
  'landing',
  'lean_canvas',
  'roadmap',
  'one_page_plan',
] as const;
export type SectionKey = (typeof SECTION_KEYS)[number];
