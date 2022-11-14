import { lazy, Suspense, useRef } from 'react';
import Loading from '@atoms/Loading';

const MandelbrotRender = lazy(() => import('./MandelbrotSketch'));

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
