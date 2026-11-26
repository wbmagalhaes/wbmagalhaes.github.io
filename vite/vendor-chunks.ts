import type { Plugin } from 'vite';

const VENDOR_FAMILIES: [string, RegExp][] = [
	['react', /^(react|react-dom|scheduler)$/],
	['three', /^(three|@react-three[\\/].*|three-stdlib|camera-controls|maath|meshline|troika-.*)$/],
	['motion', /^(motion|framer-motion|motion-dom|motion-utils)$/],
	['p5', /^(p5|@p5-wrapper[\\/].*)$/],
	['ui', /^(@headlessui[\\/].*|@floating-ui[\\/].*|@react-aria[\\/].*|@iconify[\\/].*)$/],
	['highlight', /^(refractor|prismjs)$/],
];

function vendorChunk(id: string) {
	const match = /node_modules[\\/]((?:@[^\\/]+[\\/])?[^\\/]+)/.exec(id);
	if (!match) return null;
	const family = VENDOR_FAMILIES.find(([, pattern]) => pattern.test(match[1]));
	return `vendor-${family ? family[0] : 'misc'}`;
}

export function vendorChunks(): Plugin {
	return {
		name: 'vendor-chunks',
		apply: 'build',
		configEnvironment: (environment) => environment !== 'client' ? null : ({
			build: {
				rolldownOptions: {
					preserveEntrySignatures: 'allow-extension',
					output: {
						codeSplitting: {
							includeDependenciesRecursively: false,
							groups: [{ name: vendorChunk, test: /node_modules[\\/]/ }],
						},
					},
				},
			},
		}),
	};
}
