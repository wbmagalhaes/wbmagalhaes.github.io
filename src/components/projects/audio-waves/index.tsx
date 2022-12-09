import { useState } from 'react';

import { Bars } from './Bars';
import { Button } from './Button';

const barWidth = 6;
const barGap = 3;

const containerWidth = 900;
const N = ~~((containerWidth + barGap) / (barWidth + barGap) / 2);

type WaveProps = {
	amplitude: number;
	n: number;
};

const waveA: WaveProps = { amplitude: 8, n: 1 };
const waveB: WaveProps = { amplitude: 2, n: 15 };
const waveC: WaveProps = { amplitude: 1, n: 7 };

const wave = Array(N)
	.fill(0)
	.map((_, i) => {
		let x = indexToPosition(i);
		let y = evalPosition(x, waveA, waveB, waveC);
		return { x: x, y: y };
	});

export function AudioWaves() {
	const [active, setActive] = useState(true);

	return (
		<div className="canvas-holder bg-wm-carbon grid place-items-center">
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
					<Bars active={active} direction={1} wave={wave} barWidth={barWidth} />
					<Bars active={active} direction={-1} wave={wave} barWidth={barWidth} />

					<line className="stroke-wm-platinum stroke-2" x1="-450" y1="0" x2="450" y2="0" />
					<circle className="fill-wm-carbon stroke-wm-platinum stroke-2" cx="0" cy="0" r="80" />

					<Button active={active} setActive={setActive} />
				</g>
			</svg>
		</div>
	);
}

function indexToPosition(i: number) {
	return i * (barWidth + barGap);
}

function evalPosition(pos: number, waveA: WaveProps, waveB: WaveProps, waveC: WaveProps) {
	const normPos = pos / containerWidth;
	const sqrt_2L = Math.sqrt(2 / containerWidth);

	const a = waveA.amplitude * sqrt_2L * Math.cos(normPos * waveA.n * Math.PI);
	const b = waveB.amplitude * sqrt_2L * Math.cos(normPos * waveB.n * Math.PI);
	const c = waveC.amplitude * sqrt_2L * Math.cos(normPos * waveC.n * Math.PI);
	const wave = (a + b + c) / (waveA.amplitude + waveB.amplitude + waveC.amplitude);
	return wave * wave;
}
