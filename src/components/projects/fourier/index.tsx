import { lazy, Suspense, useState } from 'react';
import { useHolderSize } from '@core/useHolderSize';
import Loading from '@atoms/Loading';

import { FourierOptions } from './FourierOptions';
const Sketch = lazy(() => import('./sketch'));

export function Fourier() {
	const [holderEl, size] = useHolderSize();
	const [options, setOptions] = useState(new FourierOptions());

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
						<div className="place-self-start">Número de Fases: {options.nPhases}</div>
						<input
							type="range"
							onChange={(e) => setOptions({ ...options, nPhases: Number(e.target.value) })}
							value={options.nPhases}
							step={1}
							min={1}
							max={15}
							className="max-w-full h-2 mr-auto my-auto rounded-lg appearance-none cursor-pointer"
						/>
					</label>
					<label className="grid grid-cols-2 justify-items-center gap-2 text-sm font-medium">
						<div className="place-self-start">Frequency: {options.frequency}</div>
						<input
							type="range"
							onChange={(e) => setOptions({ ...options, frequency: Number(e.target.value) })}
							value={options.frequency}
							step={0.1}
							min={0.1}
							max={3}
							className="max-w-full h-2 mr-auto my-auto rounded-lg appearance-none cursor-pointer"
						/>
					</label>
				</div>
			</div>
		</>
	);
}
