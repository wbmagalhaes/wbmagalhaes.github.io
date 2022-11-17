import { lazy, Suspense, useRef, useState, useEffect } from 'react';
import Loading from '@atoms/Loading';

const Sketch = lazy(() => import('./sketch'));

interface Props {
	defaultZoom: number;
	defaultOffset: [number, number];
	defaultJulia?: [number, number];
}

export function Mandelbrot({ defaultZoom = 1, defaultOffset = [0, 0], defaultJulia = undefined }: Props) {
	const holderEl = useRef<HTMLDivElement>(null);
	const [size, setSize] = useState({ w: 800, h: 600 });

	const [zoom, setZoom] = useState(defaultZoom);
	const [origin_x, setOriginX] = useState(defaultOffset[0]);
	const [origin_y, setOriginY] = useState(defaultOffset[1]);

	const [julia_x, setJuliaX] = useState(defaultJulia ? defaultJulia[0] : 0);
	const [julia_y, setJuliaY] = useState(defaultJulia ? defaultJulia[1] : 0);

	useEffect(() => {
		setSize({
			w: holderEl?.current?.offsetWidth ?? 800,
			h: holderEl?.current?.offsetHeight ?? 600,
		});
	}, [holderEl]);

	function signedNumber(x: number, digits: number = 3) {
		return x >= 0 ? '+' + x.toFixed(digits) : x.toFixed(digits);
	}

	function complexNumber(real: number, imaginary: number, digits: number = 3) {
		return signedNumber(real, digits) + signedNumber(imaginary, digits) + 'i';
	}

	return (
		<div className="container">
			<div ref={holderEl} className="canvas-holder">
				<Suspense fallback={<Loading />}>
					<Sketch
						size={size}
						scale={2 / Math.exp(zoom)}
						offset={[origin_x, origin_y]}
						julia_const={defaultJulia ? [julia_x, julia_y] : undefined}
					/>
				</Suspense>
			</div>
			<div className="flex flex-col w-[90%] my-4 mx-auto">
				<label className="mb-2 text-sm font-medium text-gray-900">
					<div className="mb-2">Origem: {complexNumber(origin_x, origin_y, 4)}</div>
					<div className="flex flex-row flex-wrap gap-3">
						<input
							type="range"
							onChange={(e) => setOriginX(Number(e.target.value))}
							value={origin_x}
							step={0.0001}
							min={-2}
							max={2}
							className="grow h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
						/>
						<input
							type="range"
							onChange={(e) => setOriginY(Number(e.target.value))}
							value={origin_y}
							step={0.0001}
							min={-2}
							max={2}
							className="grow h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
						/>
					</div>
				</label>

				<label className="mb-2 text-sm font-medium text-gray-900">
					<div className="mb-2">Zoom: {zoom.toFixed(2)}</div>
					<div className="flex flex-row flex-wrap gap-3">
						<input
							type="range"
							onChange={(e) => setZoom(Number(e.target.value))}
							value={zoom}
							step={0.01}
							min={0.0}
							max={15}
							className="grow h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
						/>
					</div>
				</label>

				{defaultJulia && (
					<label className="mb-2 text-sm font-medium text-gray-900">
						<div className="mb-2">Julia: {complexNumber(julia_x, julia_y, 4)}</div>
						<div className="flex flex-row flex-wrap gap-3">
							<input
								type="range"
								onChange={(e) => setJuliaX(Number(e.target.value))}
								value={julia_x}
								step={0.0001}
								min={-2}
								max={2}
								className="grow h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
							/>
							<input
								type="range"
								onChange={(e) => setJuliaY(Number(e.target.value))}
								value={julia_y}
								step={0.0001}
								min={-2}
								max={2}
								className="grow h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
							/>
						</div>
					</label>
				)}
			</div>
		</div>
	);
}
