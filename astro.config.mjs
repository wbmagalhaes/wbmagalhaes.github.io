import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

import mdx from '@astrojs/mdx';
import { unified } from '@astrojs/markdown-remark';
import rehypeKatex from 'rehype-katex'
import remarkMath from 'remark-math'

import tailwindcss from '@tailwindcss/vite';
import { vendorChunks } from './vite/vendor-chunks.ts';
import icon from "astro-icon";

import sitemap from '@astrojs/sitemap';
import partytown from '@astrojs/partytown';

import { SITE } from './src/config.ts';

export default defineConfig({
	site: SITE.origin,
	base: SITE.basePathname,

	output: 'static',

	markdown: {
		syntaxHighlight: 'prism',
		processor: unified({
			remarkPlugins: [remarkMath],
			rehypePlugins: [rehypeKatex],
		}),
	},

	integrations: [
		react(),
		mdx(),
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
		plugins: [tailwindcss(), vendorChunks()],
		ssr: {
			noExternal: [
				/^@react-three\//,
				/^three-/,
				/^troika-/,
				'@monogrid/gainmap-js',
				'camera-controls',
				'detect-gpu',
				'maath',
				'meshline',
				'stats-gl',
			],
		},
	},
});
