import { z, defineCollection } from 'astro:content';

const homeCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    subtitle: z.optional(z.string()),
  }),
});

export const collections = {
  home: homeCollection,
};
