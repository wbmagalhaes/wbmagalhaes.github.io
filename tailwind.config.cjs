const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
	mode: 'jit',
	content: [
		'./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
		'./src/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
	],
	theme: {
		extend: {
			backgroundImage: {
				'footer-texture': "url('/images/pattern-diagonal-stripes.svg')",
			},
			fontSize: {
				'3xl': '2rem',
				'4xl': '2.5rem',
				'5xl': '3.5rem',
			},
			colors: {
				'wm': {
					'carbon': {
						DEFAULT: '#141414',
						100: '#5C5C5C',
						200: '#525252',
						300: '#474747',
						400: '#3D3D3D',
						500: '#333333',
						600: '#292929',
						700: '#1F1F1F',
						800: '#141414',
						900: '#0A0A0A',
					},
					'hydrogen': {
						DEFAULT: '#EAEAEA',
						"100": "#F5F5F5",
						"200": "#EAEAEA",
						"300": "#E0E0E0",
						"400": "#D6D6D6",
						"500": "#CCCCCC",
						"600": "#C2C2C2",
						"700": "#B8B8B8",
						"800": "#ADADAD",
						"900": "#A3A3A3"
					},
					'oxygen': {
						DEFAULT: '#E63946',
						100: '#F4A4AB',
						200: '#EF8089',
						300: '#EB5C68',
						400: '#E94957',
						500: '#E53935',
						600: '#E42535',
						700: '#DA1B2B',
						800: '#A31420',
						900: '#7F1019'
					},
					'nitrogen': {
						DEFAULT: '#1D3557',
						100: '#335D99',
						200: '#2E548A',
						300: '#294B7A',
						400: '#24416B',
						500: '#1D3557',
						600: '#192F4D',
						700: '#14253D',
						800: '#0F1C2E',
						900: '#0A131F',
					},
					'gold': {
						DEFAULT: '#C6B42A',
						100: '#E2D678',
						200: '#DBCC57',
						300: '#D8C746',
						400: '#D4C235',
						500: '#C6B42A',
						600: '#B9A827',
						700: '#A89924',
						800: '#978A20',
						900: '#766B19'
					},
				}
			},
			fontFamily: {
				sans: ["'Inter'", 'sans-serif', ...defaultTheme.fontFamily.sans],
				mono: ["'Mononoki'", 'mono', ...defaultTheme.fontFamily.mono],
			}
		}
	},
	plugins: [
		require('@tailwindcss/typography'),
		require('@tailwindcss/forms'),
	],
	darkMode: 'class',
};
