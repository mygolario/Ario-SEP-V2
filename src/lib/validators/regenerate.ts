import { z } from 'zod';

export const regenerateInputSchema = z.object({
  projectId: z.string().uuid(),
  sectionKey: z.enum(['identity', 'branding', 'landing', 'lean_canvas', 'roadmap']),
});
