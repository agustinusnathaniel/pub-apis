import { z } from 'zod';

export const apiListParamsSchema = z
  .object({
    title: z.string().optional(),
    description: z.string().optional(),
    auth: z.string().optional(),
    https: z.boolean().optional(),
    cors: z.enum(['yes', 'no', 'unknown']).optional(),
    category: z.string().optional(),
  })
  .refine(
    (data) =>
      (data.https && (data.title || data.category || data.description)) ||
      !data.https,
    { path: ['title'], message: 'Title must not be empty' },
  );
