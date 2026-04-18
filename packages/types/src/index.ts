import { z } from 'zod';

export const TenantConfigSchema = z.object({
  appId: z.string(),
  name: z.string(),
  theme: z.object({
    primaryColor: z.string(),
  }),
  features: z.array(z.string()),
});

export type TenantConfig = z.infer<typeof TenantConfigSchema>;
