import { describe, expect, it } from 'vitest';

import { sanitizeLogoSvg } from './sanitizeSvg';

describe('sanitizeLogoSvg', () => {
  it('removes script tags and event handlers', () => {
    const dirty = `<svg onload="alert(1)"><script>alert("x")</script><rect width="10" height="10" onclick="hack()" /></svg>`;
    const clean = sanitizeLogoSvg(dirty);

    expect(clean).toBeDefined();
    expect(clean).not.toContain('script');
    expect(clean).not.toContain('onload');
    expect(clean).not.toContain('onclick');
    expect(clean).toContain('<rect');
  });

  it('returns undefined when nothing safe remains', () => {
    const result = sanitizeLogoSvg('<script>alert("x")</script>');
    expect(result).toBeUndefined();
  });
});
