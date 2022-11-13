import loadable from '@loadable/component';

const MandelbrotRender = loadable(() => import('./MandelbrotSketch'), { ssr: true });

export function MandelbrotSet() {
	return <MandelbrotRender scale={1.8} offset={[-0.5, 0]} />;
}

export function JuliaSet() {
	return <MandelbrotRender scale={1.6} julia />;
}
