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
	const [x, setX] = useState(defaultOffset[0]);
	const [y, setY] = useState(defaultOffset[1]);

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
						offset={[x, y]}
						julia_const={defaultJulia ? [julia_x, julia_y] : undefined}
					/>
				</Suspense>
			</div>
			<div className="flex flex-col w-[90%] mt-4 mx-auto">
				<label className="block mb-2 text-sm font-medium text-gray-900">
					Origem X: {signedNumber(x, 3)}
					<input
						type="range"
						onChange={(e) => setX(Number(e.target.value))}
						value={x}
						step={0.001}
						min={-2}
						max={2}
						className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
					/>
				</label>
				<label className="block mb-2 text-sm font-medium text-gray-900">
					Origem Y: {signedNumber(y, 3)}
					<input
						type="range"
						onChange={(e) => setY(Number(e.target.value))}
						value={y}
						step={0.001}
						min={-2}
						max={2}
						className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
					/>
				</label>
				<label className="block mb-2 text-sm font-medium text-gray-900">
					Zoom: {zoom.toFixed(2)}
					<input
						type="range"
						onChange={(e) => setZoom(Number(e.target.value))}
						value={zoom}
						step={0.01}
						min={0.0}
						max={15}
						className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
					/>
				</label>

				{defaultJulia && (
					<>
						<label className="block mb-2 text-sm font-medium text-gray-900">
							Constante de Julia: {complexNumber(julia_x, julia_y, 3)}
							<input
								type="range"
								onChange={(e) => setJuliaX(Number(e.target.value))}
								value={julia_x}
								step={0.001}
								min={-2}
								max={2}
								className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
							/>
						</label>
						<label className="block mb-2 text-sm font-medium text-gray-900">
							<input
								type="range"
								onChange={(e) => setJuliaY(Number(e.target.value))}
								value={julia_y}
								step={0.001}
								min={-2}
								max={2}
								className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
							/>
						</label>
					</>
				)}
			</div>
		</div>
	);
}
