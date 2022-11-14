import { lazy, Suspense, useRef } from 'react';
import Loading from '@atoms/Loading';

const Sketch = lazy(() => import('./sketch'));

export function ASCII() {
	const ref = useRef(null);

	return (
		<div className="canvas-holder" ref={ref}>
			<Suspense fallback={<Loading />}>
				<Sketch holderRef={ref} />
			</Suspense>
		</div>
	);
}
