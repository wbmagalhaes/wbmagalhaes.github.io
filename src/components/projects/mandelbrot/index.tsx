import { lazy, Suspense, useState } from 'react';
import { useHolderSize } from '@hooks/useHolderSize';
import Loading from '@atoms/Loading';

import { MandelbrotOptions } from './MandelbrotOptions';
const Sketch = lazy(() => import('./sketch'));

interface Props {
	defaultZoom?: number;
	defaultOffset?: { x: number; y: number };
	defaultJulia?: { x: number; y: number };
}

export function Mandelbrot() {
	return (
		<div className="grid grid-cols-1 lg:grid-cols-2 justify-center gap-4">
			<RenderCanvas defaultZoom={0.2} defaultOffset={{ x: -0.75, y: 0 }} />
			<RenderCanvas defaultZoom={0.3} defaultJulia={{ x: -0.4, y: 0.6 }} />
		</div>
	);
}

function RenderCanvas({ defaultZoom = 1, defaultOffset = { x: 0, y: 0 }, defaultJulia = undefined }: Props) {
	const [holderEl, size] = useHolderSize();
	const [options, setOptions] = useState(new MandelbrotOptions(defaultZoom, defaultOffset, defaultJulia));

	function signedNumber(x: number, digits: number = 3) {
		return x >= 0 ? '+' + x.toFixed(digits) : x.toFixed(digits);
	}

	function complexNumber(real: number, imaginary: number, digits: number = 3) {
		return signedNumber(real, digits) + signedNumber(imaginary, digits) + 'i';
	}

	return (
		<div className="flex flex-col">
			<div ref={holderEl} className="w-full mx-auto rounded-md overflow-hidden max-w-lg aspect-[8/6]">
				<Suspense fallback={<Loading />}>
					<Sketch size={size} options={options} />
				</Suspense>
			</div>

			<div className="flex flex-col w-full max-w-lg my-4 mx-auto">
				<label className="mb-2 text-sm font-medium">
					<div className="mb-2">Origem: {complexNumber(options.offset.x, options.offset.y, 4)}</div>
					<div className="flex flex-row flex-wrap gap-3">
						<input
							type="range"
							onChange={(e) =>
								setOptions({
									...options,
									offset: { ...options.offset, x: Number(e.target.value) },
								})
							}
							value={options.offset.x}
							step={0.0001}
							min={-2}
							max={2}
							className="grow h-2 rounded-lg appearance-none cursor-pointer"
						/>
						<input
							type="range"
							onChange={(e) =>
								setOptions({
									...options,
									offset: { ...options.offset, y: Number(e.target.value) },
								})
							}
							value={options.offset.y}
							step={0.0001}
							min={-2}
							max={2}
							className="grow h-2 rounded-lg appearance-none cursor-pointer"
						/>
					</div>
				</label>

				<label className="mb-2 text-sm font-medium">
					<div className="mb-2">Zoom: {options.zoom.toFixed(2)}</div>
					<div className="flex flex-row flex-wrap gap-3">
						<input
							type="range"
							onChange={(e) =>
								setOptions({
									...options,
									zoom: Number(e.target.value),
								})
							}
							value={options.zoom}
							step={0.01}
							min={0.0}
							max={15}
							className="grow h-2 rounded-lg appearance-none cursor-pointer"
						/>
					</div>
				</label>

				{options.julia_const && (
					<label className="mb-2 text-sm font-medium">
						<div className="mb-2">
							Julia: {complexNumber(options.julia_const.x, options.julia_const.y, 4)}
						</div>
						<div className="flex flex-row flex-wrap gap-3">
							<input
								type="range"
								onChange={(e) =>
									setOptions({
										...options,
										julia_const: options.julia_const
											? { ...options.julia_const, x: Number(e.target.value) }
											: undefined,
									})
								}
								value={options.julia_const.x}
								step={0.0001}
								min={-2}
								max={2}
								className="grow h-2 rounded-lg appearance-none cursor-pointer"
							/>
							<input
								type="range"
								onChange={(e) =>
									setOptions({
										...options,
										julia_const: options.julia_const
											? { ...options.julia_const, y: Number(e.target.value) }
											: undefined,
									})
								}
								value={options.julia_const.y}
								step={0.0001}
								min={-2}
								max={2}
								className="grow h-2 rounded-lg appearance-none cursor-pointer"
							/>
						</div>
					</label>
				)}
			</div>
		</div>
	);
}
