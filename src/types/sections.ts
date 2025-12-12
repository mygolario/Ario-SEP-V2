export const SECTION_KEYS = ['identity', 'branding', 'landing', 'lean_canvas', 'roadmap'] as const;
export type SectionKey = (typeof SECTION_KEYS)[number];
