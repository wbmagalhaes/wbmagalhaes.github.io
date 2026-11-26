import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const homeCollection = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/home' }),
  schema: z.object({
    title: z.string(),
    subtitle: z.optional(z.string()),
    balloons: z.optional(z.array(z.string())),
    panels: z.optional(z.array(z.object({ caption: z.string(), title: z.string(), text: z.string() }))),
  }),
});

export const collections = {
  home: homeCollection,
};
