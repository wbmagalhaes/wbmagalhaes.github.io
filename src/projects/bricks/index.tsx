import { lazy, Suspense, useState } from 'react';
import { useHolderSize } from '@core/useHolderSize';
import Loading from '@atoms/Loading';

import { FourierOptions } from './FourierOptions';
const Sketch = lazy(() => import('./sketch'));

export function Fourier() {
	const [holderEl, size] = useHolderSize();
	const [options, setOptions] = useState(new FourierOptions());

	return (
		<div className="container">
			<div ref={holderEl} className="canvas-holder">
				<Suspense fallback={<Loading />}>
					<Sketch size={size} options={options} />
				</Suspense>
			</div>
			<div className="flex flex-col ml-4 my-4 mr-auto gap-2">
				<label className="grid grid-cols-2 justify-items-center gap-2 text-sm font-medium text-gray-900">
					<div className="place-self-start">A: {options.a}</div>
					<input
						type="range"
						onChange={(e) => setOptions({ ...options, a: Number(e.target.value) })}
						value={options.a}
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