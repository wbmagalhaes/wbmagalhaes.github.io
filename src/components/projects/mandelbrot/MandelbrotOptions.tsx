export class MandelbrotOptions {
	zoom: number = 1;
	offset: { x: number; y: number } = { x: 0, y: 0 };
	julia_const?: { x: number; y: number } = undefined;

	constructor(
		defaultZoom = 1,
		defaultOffset: { x: number; y: number } = { x: 0, y: 0 },
		defaultJulia: { x: number; y: number } | undefined = undefined
	) {
		this.zoom = defaultZoom;
		this.offset = defaultOffset;
		this.julia_const = defaultJulia;
	}
}
