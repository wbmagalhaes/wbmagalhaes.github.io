import { lazy, Suspense, useRef, useState, useEffect } from 'react';
import Loading from '@atoms/Loading';

import { SteerOptions } from './boid';

const Sketch = lazy(() => import('./sketch'));

export function Boids() {
	const holderEl = useRef<HTMLDivElement>(null);
	const [size, setSize] = useState({ w: 800, h: 600 });

	const [options, setOptions] = useState(new SteerOptions());

	function setAlignment(value: number) {
		let o = options.copy();
		o.alignmentWeight = value;
		setOptions(o);
	}

	function setCohesion(value: number) {
		let o = options.copy();
		o.cohesionWeight = value;
		setOptions(o);
	}

	function setRepulsion(value: number) {
		let o = options.copy();
		o.repulsionWeight = value;
		setOptions(o);
	}

	function setClear(value: number) {
		let o = options.copy();
		o.clearWeight = value;
		setOptions(o);
	}

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
					<Sketch size={size} options={options} />
				</Suspense>
			</div>
			<div className="flex flex-col ml-4 my-4 mr-auto gap-2">
				<label className="grid grid-cols-2 justify-items-center gap-2 text-sm font-medium text-gray-900">
					<div className="place-self-start">Alinhamento: {options.alignmentWeight}</div>
					<input
						type="range"
						onChange={(e) => setAlignment(Number(e.target.value))}
						value={options.alignmentWeight}
						step={0.1}
						min={0}
						max={5}
						className="max-w-full h-2 mr-auto my-auto bg-gray-200 rounded-lg appearance-none cursor-pointer"
					/>
				</label>

				<label className="grid grid-cols-2 justify-items-center gap-2 text-sm font-medium text-gray-900">
					<div className="place-self-start">Coesão: {options.cohesionWeight}</div>
					<input
						type="range"
						onChange={(e) => setCohesion(Number(e.target.value))}
						value={options.cohesionWeight}
						step={0.1}
						min={0}
						max={5}
						className="max-w-full h-2 mr-auto my-auto bg-gray-200 rounded-lg appearance-none cursor-pointer"
					/>
				</label>

				<label className="grid grid-cols-2 justify-items-center gap-2 text-sm font-medium text-gray-900">
					<div className="place-self-start">Repulsão: {options.repulsionWeight}</div>
					<input
						type="range"
						onChange={(e) => setRepulsion(Number(e.target.value))}
						value={options.repulsionWeight}
						step={0.1}
						min={0}
						max={5}
						className="max-w-full h-2 mr-auto my-auto bg-gray-200 rounded-lg appearance-none cursor-pointer"
					/>
				</label>

				<label className="grid grid-cols-2 justify-items-center gap-2 text-sm font-medium text-gray-900">
					<div className="place-self-start">Clear: {options.clearWeight}</div>
					<input
						type="range"
						onChange={(e) => setClear(Number(e.target.value))}
						value={options.clearWeight}
						step={0.1}
						min={0}
						max={5}
						className="max-w-full h-2 mr-auto my-auto bg-gray-200 rounded-lg appearance-none cursor-pointer"
					/>
				</label>
			</div>
		</div>
	);
}
