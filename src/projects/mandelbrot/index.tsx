import { lazy, Suspense } from 'react';

const MandelbrotRender = lazy(() => import('./MandelbrotSketch'));

export function MandelbrotSet() {
	return (
		<Suspense fallback={null}>
			<MandelbrotRender scale={1.8} offset={[-0.5, 0]} />
		</Suspense>
	);
}

export function JuliaSet() {
	return (
		<Suspense fallback={null}>
			<MandelbrotRender scale={1.6} julia />
		</Suspense>
	);
}
