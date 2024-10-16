import { z, defineCollection } from 'astro:content';

const homeCollection = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
  }),
});

export const collections = {
  home: homeCollection,
};
