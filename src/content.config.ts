import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const homeCollection = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/home' }),
  schema: z.object({
    title: z.string(),
    subtitle: z.optional(z.string()),
  }),
});

export const collections = {
  home: homeCollection,
};
