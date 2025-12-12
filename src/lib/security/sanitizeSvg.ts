import sanitizeHtml from 'sanitize-html';

const ALLOWED_TAGS = [
  'svg',
  'path',
  'circle',
  'rect',
  'g',
  'defs',
  'linearGradient',
  'stop',
  'polygon',
  'polyline',
  'ellipse',
  'line',
  'title',
];

const ALLOWED_ATTRIBUTES: Record<string, string[]> = {
  svg: ['xmlns', 'viewBox', 'fill', 'stroke', 'width', 'height', 'role', 'aria-label'],
  path: ['d', 'fill', 'stroke', 'stroke-width', 'stroke-linecap', 'stroke-linejoin', 'opacity'],
  circle: ['cx', 'cy', 'r', 'fill', 'stroke', 'stroke-width', 'opacity'],
  rect: ['x', 'y', 'width', 'height', 'rx', 'ry', 'fill', 'stroke', 'stroke-width', 'opacity'],
  g: ['fill', 'stroke', 'stroke-width', 'opacity'],
  linearGradient: ['id', 'x1', 'x2', 'y1', 'y2', 'gradientUnits'],
  stop: ['offset', 'stop-color', 'stop-opacity'],
  polygon: ['points', 'fill', 'stroke', 'stroke-width', 'opacity'],
  polyline: ['points', 'fill', 'stroke', 'stroke-width', 'opacity'],
  ellipse: ['cx', 'cy', 'rx', 'ry', 'fill', 'stroke', 'stroke-width', 'opacity'],
  line: ['x1', 'x2', 'y1', 'y2', 'stroke', 'stroke-width', 'opacity'],
  title: [],
};

/**
 * Sanitizes an SVG string to drop scripts/event handlers and disallowed tags/attributes.
 * Returns undefined when input is empty or fully stripped.
 */
export function sanitizeLogoSvg(input?: string | null): string | undefined {
  if (!input || typeof input !== 'string') return undefined;

  const cleaned = sanitizeHtml(input, {
    allowedTags: ALLOWED_TAGS,
    allowedAttributes: ALLOWED_ATTRIBUTES,
    allowedSchemes: [],
    transformTags: {
      svg: (tagName, attribs) => ({
        tagName,
        attribs: {
          ...attribs,
          xmlns: attribs.xmlns ?? 'http://www.w3.org/2000/svg',
          role: attribs.role ?? 'img',
        },
      }),
    },
    // Drop inline event handlers and scripts/styles entirely.
    allowedSchemesByTag: {},
    enforceHtmlBoundary: true,
  }).trim();

  return cleaned.length > 0 ? cleaned : undefined;
}
