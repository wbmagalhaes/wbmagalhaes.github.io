import { lazy, Suspense, useRef } from 'react';

const MandelbrotRender = lazy(() => import('./MandelbrotSketch'));

function Loading() {
	return (
		<div className="grid text-wm-secondary w-full h-full place-items-center">
			<span>Loading...</span>
		</div>
	);
}

export function MandelbrotSet() {
	const ref = useRef(null);

	return (
		<div className="canvas-holder" ref={ref}>
			<Suspense fallback={<Loading />}>
				<MandelbrotRender holderRef={ref} scale={1.8} offset={[-0.5, 0]} />
			</Suspense>
		</div>
	);
}

export function JuliaSet() {
	const ref = useRef(null);

	return (
		<div className="canvas-holder" ref={ref}>
			<Suspense fallback={<Loading />}>
				<MandelbrotRender holderRef={ref} scale={1.6} julia />
			</Suspense>
		</div>
	);
}
