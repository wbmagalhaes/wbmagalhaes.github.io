import { lazy, Suspense, useState, useRef, useEffect } from 'react';
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

	return (
		<div className="flex flex-col w-full max-w-lg justify-start">
			<div ref={holderEl} className="canvas-holder">
				<Suspense fallback={<Loading />}>
					<Sketch
						size={size}
						scale={1 / zoom}
						offset={[x, y]}
						julia_const={defaultJulia ? [julia_x, julia_y] : undefined}
					/>
				</Suspense>
			</div>
			<div className="flex flex-col w-[90%] mt-4 mx-auto">
				<label className="block mb-2 text-sm font-medium text-gray-900">
					X: {x.toFixed(2)}
					<input
						type="range"
						onChange={(e) => setX(Number(e.target.value))}
						value={x}
						step={0.01}
						min={-2}
						max={2}
						className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
					/>
				</label>
				<label className="block mb-2 text-sm font-medium text-gray-900">
					Y: {y.toFixed(2)}
					<input
						type="range"
						onChange={(e) => setY(Number(e.target.value))}
						value={y}
						step={0.01}
						min={-2}
						max={2}
						className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
					/>
				</label>
				<label className="block mb-2 text-sm font-medium text-gray-900">
					Zoom: {zoom}
					<input
						type="range"
						onChange={(e) => setZoom(Number(e.target.value))}
						value={zoom}
						step={0.01}
						min={0.1}
						max={1000}
						className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
					/>
				</label>

				{defaultJulia && (
					<>
						<label className="block mb-2 text-sm font-medium text-gray-900">
							Parte Real: {julia_x.toFixed(2)}
							<input
								type="range"
								onChange={(e) => setJuliaX(Number(e.target.value))}
								value={julia_x}
								step={0.01}
								min={-2}
								max={2}
								className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
							/>
						</label>
						<label className="block mb-2 text-sm font-medium text-gray-900">
							Parte Imaginária: {julia_y.toFixed(2)}i
							<input
								type="range"
								onChange={(e) => setJuliaY(Number(e.target.value))}
								value={julia_y}
								step={0.01}
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
