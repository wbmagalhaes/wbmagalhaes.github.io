import { lazy, Suspense, useRef, useState, useEffect } from 'react';
import Loading from '@atoms/Loading';

const Sketch = lazy(() => import('./sketch'));

export function Boids() {
	const holderEl = useRef<HTMLDivElement>(null);
	const [size, setSize] = useState({ w: 800, h: 600 });

	useEffect(() => {
		setSize({
			w: holderEl?.current?.offsetWidth ?? 800,
			h: holderEl?.current?.offsetHeight ?? 600,
		});
	}, [holderEl]);

	return (
		<div className="container">
			<div ref={holderEl} className="canvas-holder">
				<Suspense fallback={<Loading />}>
					<Sketch size={size} />
				</Suspense>
			</div>
			<div className="flex flex-col w-[90%] mt-4 mx-auto"></div>
		</div>
	);
}
