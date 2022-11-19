export function getSlugFromPath(path?: string) {
	return path?.split('/').reverse()[0].split('.')[0];
}
