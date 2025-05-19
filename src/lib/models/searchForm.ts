import type { z } from 'zod';

import type { apiListParamsSchema } from '@/lib/models/apiParams';

export type SearchForm = z.infer<typeof apiListParamsSchema>;
