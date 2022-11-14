import { useRef } from 'react';

export function AudioWaves() {
	const ref = useRef(null);

	const WIDTH = 4;
	const GAP = 4;
	const N = 112;

	return (
		<div className="canvas-holder bg-gray-900 grid place-items-center">
			<svg viewBox="0 0 1000 500">
				<defs>
					<linearGradient id="bar-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
						<stop offset="0%" stopColor="#ae00ff" />
						<stop offset="49%" stopColor="#581a75" />
						<stop offset="51%" stopColor="#25530b" />
						<stop offset="100%" stopColor="#50ad1a" />
					</linearGradient>
				</defs>

				<g transform="translate(500, 250)">
					<g ref={ref}>
						{Array(N)
							.fill(0)
							.map((_, i) => {
								const width = 896;

								const delay = ~~(-80000 + Math.abs(i - N / 2) * 240);
								const pos = i * (WIDTH + GAP) - width / 2 + WIDTH;

								const waveA = 5 * Math.cos((pos * 1 * Math.PI) / width);
								const waveB = 1 * Math.cos((pos * 3 * Math.PI) / width);
								const waveC = 2 * Math.cos((pos * 9 * Math.PI) / width);
								const wave = (waveA * waveB * waveC) / 10;

								const maxHeight = Math.abs(wave);
								const minHeight = maxHeight * 0.33;

								return (
									<rect
										className="stroke-none fill-[url(#bar-gradient)]"
										x={(WIDTH + GAP) * (i - (N - 1) / 2) - WIDTH / 2}
										y={maxHeight * -200}
										width={WIDTH}
										height={maxHeight * 400}
									/>
								);
							})}
					</g>

					<line className="stroke-gray-100 stroke-2" x1="-450" y1="0" x2="450" y2="0" />
					<circle className="fill-gray-900 stroke-gray-100 stroke-2" r="80" />

					<g className="cursor-pointer transition duration-200 hover:scale-110 active:scale-90">
						<circle className="fill-gray-700 stroke-gray-600 stroke-2" r="60" />
						<g transform="translate(-37.5, -37.5)">
							<path
								className="stroke-gray-100 stroke-2 fill-none"
								strokeLinejoin="round"
								strokeLinecap="round"
								d="M39.389,13.769 L22.235,28.606 L6,28.606 L6,47.699 L21.989,47.699 L39.389,62.75 L39.389,13.769z"
							/>
							<path
								className="stroke-gray-100 stroke-2 fill-none"
								strokeLinejoin="round"
								strokeLinecap="round"
								d="M48,27.6a19.5,19.5 0 0 1 0,21.4M55.1,20.5a30,30 0 0 1 0,35.6M61.6,14a38.8,38.8 0 0 1 0,48.6"
							/>
						</g>
					</g>
				</g>
			</svg>
		</div>
	);
}
