import { describe, it, expect } from 'vitest';
import { regenerateInputSchema } from '../../../lib/validators/regenerate';

describe('Regenerate API Validator', () => {
  it('should accept valid inputs', () => {
    const valid = {
      projectId: '123e4567-e89b-12d3-a456-426614174000',
      sectionKey: 'identity',
    };
    const result = regenerateInputSchema.safeParse(valid);
    expect(result.success).toBe(true);
  });

  it('should reject invalid sectionKey', () => {
    const invalid = {
      projectId: '123e4567-e89b-12d3-a456-426614174000',
      sectionKey: 'hacking',
    };
    const result = regenerateInputSchema.safeParse(invalid);
    expect(result.success).toBe(false);
  });

  it('should reject invalid projectId', () => {
    const invalid = {
      projectId: 'not-a-uuid',
      sectionKey: 'roadmap',
    };
    const result = regenerateInputSchema.safeParse(invalid);
    expect(result.success).toBe(false);
  });
});
