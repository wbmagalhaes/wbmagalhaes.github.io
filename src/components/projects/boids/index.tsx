import { lazy, Suspense, useState } from 'react';
import { useHolderSize } from '@core/useHolderSize';
import Loading from '@atoms/Loading';

import { SteerOptions } from './SteerOptions';
const Sketch = lazy(() => import('./sketch'));

export function Boids() {
	const [holderEl, size] = useHolderSize();
	const [options, setOptions] = useState(new SteerOptions());

	return (
		<>
			<div ref={holderEl} className="canvas-holder">
				<Suspense fallback={<Loading />}>
					<Sketch size={size} options={options} />
				</Suspense>
			</div>

			<div className="inputs-holder">
				<div className="flex flex-col my-4 mr-auto gap-2">
					<label className="grid grid-cols-2 justify-items-center gap-2 text-sm font-medium">
						<div className="place-self-start">Alinhamento: {options.alignmentWeight}</div>
						<input
							type="range"
							onChange={(e) =>
								setOptions({
									...options,
									alignmentWeight: Number(e.target.value),
								})
							}
							value={options.alignmentWeight}
							step={0.1}
							min={0}
							max={5}
							className="max-w-full h-2 mr-auto my-auto rounded-lg appearance-none cursor-pointer"
						/>
					</label>

					<label className="grid grid-cols-2 justify-items-center gap-2 text-sm font-medium">
						<div className="place-self-start">Coesão: {options.cohesionWeight}</div>
						<input
							type="range"
							onChange={(e) =>
								setOptions({
									...options,
									cohesionWeight: Number(e.target.value),
								})
							}
							value={options.cohesionWeight}
							step={0.1}
							min={0}
							max={5}
							className="max-w-full h-2 mr-auto my-auto rounded-lg appearance-none cursor-pointer"
						/>
					</label>

					<label className="grid grid-cols-2 justify-items-center gap-2 text-sm font-medium">
						<div className="place-self-start">Repulsão: {options.repulsionWeight}</div>
						<input
							type="range"
							onChange={(e) =>
								setOptions({
									...options,
									repulsionWeight: Number(e.target.value),
								})
							}
							value={options.repulsionWeight}
							step={0.1}
							min={0}
							max={5}
							className="max-w-full h-2 mr-auto my-auto rounded-lg appearance-none cursor-pointer"
						/>
					</label>

					<label className="grid grid-cols-2 justify-items-center gap-2 text-sm font-medium">
						<div className="place-self-start">Clear: {options.clearWeight}</div>
						<input
							type="range"
							onChange={(e) =>
								setOptions({
									...options,
									clearWeight: Number(e.target.value),
								})
							}
							value={options.clearWeight}
							step={0.1}
							min={0}
							max={5}
							className="max-w-full h-2 mr-auto my-auto rounded-lg appearance-none cursor-pointer"
						/>
					</label>

					<label className="grid grid-cols-2 justify-items-center gap-2 text-sm font-medium">
						<div className="place-self-start">Alvo: {options.attractionWeight}</div>
						<input
							type="range"
							onChange={(e) =>
								setOptions({
									...options,
									attractionWeight: Number(e.target.value),
								})
							}
							value={options.attractionWeight}
							step={0.1}
							min={-5}
							max={5}
							className="max-w-full h-2 mr-auto my-auto rounded-lg appearance-none cursor-pointer"
						/>
					</label>
				</div>
			</div>
		</>
	);
}
