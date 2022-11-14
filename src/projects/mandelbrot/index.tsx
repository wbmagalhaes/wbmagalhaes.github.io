import { lazy, Suspense, useRef } from 'react';
import Loading from '@atoms/Loading';

const Sketch = lazy(() => import('./sketch'));

export function Mandelbrot() {
	const ref = useRef(null);

	return (
		<div className="canvas-holder" ref={ref}>
			<Suspense fallback={<Loading />}>
				<Sketch holderRef={ref} scale={1.8} offset={[-0.5, 0]} />
			</Suspense>
		</div>
	);
}

export function Julia() {
	const ref = useRef(null);

	return (
		<div className="canvas-holder" ref={ref}>
			<Suspense fallback={<Loading />}>
				<Sketch holderRef={ref} scale={1.6} julia />
			</Suspense>
		</div>
	);
}
