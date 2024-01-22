import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

import mdx from '@astrojs/mdx';
import rehypeKatex from 'rehype-katex'
import remarkMath from 'remark-math'

import tailwind from '@astrojs/tailwind';
import icon from "astro-icon";

import { SITE } from './src/config.mjs';

export default defineConfig({
	site: SITE.origin,
	base: SITE.basePathname,

	output: 'static',

	markdown: {
		syntaxHighlight: 'prism',
		gfm: true,
	},

	integrations: [
		react(),
		mdx({
			remarkPlugins: [remarkMath],
			rehypePlugins: [rehypeKatex]
		}),
		tailwind({
			config: {
				applyBaseStyles: false,
			},
		}),
		icon({
			include: {
				ic: [
					'outline-email',
					'round-alternate-email'
				],
				'ant-design': ['heart-filled'],
				'simple-icons': ['*'],
			},
		}),
	],

	vite: {
		build: {
			target: 'es2021',
			chunkSizeWarningLimit: 1024,
		},
	},
});
