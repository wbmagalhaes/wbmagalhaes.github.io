import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

import mdx from '@astrojs/mdx';
import rehypeKatex from 'rehype-katex'
import remarkMath from 'remark-math'

import tailwind from '@astrojs/tailwind';
import icon from "astro-icon";

import sitemap from '@astrojs/sitemap';
import partytown from '@astrojs/partytown';

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
				ic: ['*'],
				'ant-design': ['heart-filled'],
				'simple-icons': ['*'],
			},
		}),
		sitemap(),
		partytown({
			config: {
				debug: false,
				forward: ['dataLayer.push', 'gtag'],
			},
		}),
	],

	vite: {
		css: {
			preprocessorOptions: {
				scss: {
					api: "modern-compiler",
				},
			},
		},
	},
});
