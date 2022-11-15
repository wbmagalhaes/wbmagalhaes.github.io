import { useState } from 'react';
import { motion } from 'framer-motion';

const containerVariants = {
	stopped: {
		opacity: 1,
	},
	wave: {
		opacity: 1,
		transition: { staggerChildren: 0.05 },
	},
};

const itemVariants = {
	stopped: {
		scaleY: 0,
		transition: {
			duration: 4,
			type: 'spring',
			bounce: 0,
		},
	},
	wave: (s: number) => ({
		scaleY: [0, s, 0],
		transition: {
			repeat: Infinity,
			ease: 'easeInOut',
			duration: 1.2,
		},
	}),
};

const soundVariants = {
	hidden: {
		opacity: 0,
		transition: {
			duration: 0,
		},
	},
	show: {
		opacity: [1, 0],
		pathLength: [0, 1],
		pathOffset: [0.5, 0],
		x: [-10, 0],
		transition: {
			repeat: Infinity,
			duration: 1.5,
			type: 'spring',
			bounce: 0,
		},
	},
};

const noSoundVariants = {
	hidden: {
		opacity: 0,
		pathLength: [1, 0],
		pathOffset: 0.5,
		transition: {
			duration: 0.25,
			opacity: { ease: 'circIn' },
		},
	},
	show: (i: number) => ({
		opacity: 1,
		pathOffset: 0,
		pathLength: [0, 1],
		transition: {
			delay: i * 0.25,
			pathLength: {
				duration: 0.25,
				type: 'spring',
				bounce: 0,
			},
			opacity: { duration: 0.01 },
			pathOffset: { duration: 0.01 },
		},
	}),
};

const barWidth = 6;
const barGap = 3;

const containerWidth = 900;
const N = ~~((containerWidth + barGap) / (barWidth + barGap) / 2);

// amplitudes das funções de onda
const A_waveA = 5;
const A_waveB = 3;
const A_waveC = 1;

// frequência das funções de onda
const f_waveA = 1;
const f_waveB = 11;
const f_waveC = 3;

function evalWave(i: number) {
	const pos = i * (barWidth + barGap);
	const normPos = pos / containerWidth;

	const waveA = A_waveA * Math.cos(normPos * f_waveA * Math.PI);
	const waveB = A_waveB * Math.cos(normPos * f_waveB * Math.PI);
	const waveC = A_waveC * Math.cos(normPos * f_waveC * Math.PI);
	const wave = (waveA + waveB + waveC) / (A_waveA + A_waveB + A_waveC);

	return [pos, wave * wave];
}

export function AudioWaves() {
	const [active, setActive] = useState(true);

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
					<motion.g variants={containerVariants} initial="stopped" animate={active ? 'wave' : 'stopped'}>
						{Array(N)
							.fill(0)
							.map((_, i) => {
								const [pos, scale] = evalWave(i);
								return (
									<motion.rect
										key={i}
										variants={itemVariants}
										custom={scale}
										className="stroke-none fill-[url(#bar-gradient)]"
										x={-pos}
										y={-200}
										width={barWidth}
										height={400}
									/>
								);
							})}
					</motion.g>

					<motion.g variants={containerVariants} initial="stopped" animate={active ? 'wave' : 'stopped'}>
						{Array(N)
							.fill(0)
							.map((_, i) => {
								const [pos, scale] = evalWave(i);
								return (
									<motion.rect
										key={i}
										variants={itemVariants}
										custom={scale}
										className="stroke-none fill-[url(#bar-gradient)]"
										x={pos}
										y={-200}
										width={barWidth}
										height={400}
									/>
								);
							})}
					</motion.g>

					<line className="stroke-gray-100 stroke-2" x1="-450" y1="0" x2="450" y2="0" />
					<circle className="fill-gray-900 stroke-gray-100 stroke-2" r="80" />

					<motion.g
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.85 }}
						onClick={() => setActive(!active)}
						className="cursor-pointer "
					>
						<circle className="fill-gray-700 stroke-gray-600 stroke-2" r="60" />
						<svg
							transform="translate(-40, -40)"
							xmlns="http://www.w3.org/2000/svg"
							width="80"
							height="80"
							preserveAspectRatio="xMidYMid meet"
							viewBox="0 0 24 24"
						>
							<g
								className="fill-none stroke-[1.5] stroke-gray-100"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<motion.path
									variants={soundVariants}
									initial="hidden"
									animate={active ? 'show' : 'hidden'}
									d="M 16.5 7.5 S 18 9 18 11.5 s -1.5 4 -1.5 4"
								/>
								<motion.path
									variants={soundVariants}
									initial="hidden"
									animate={active ? 'show' : 'hidden'}
									d="M 19.5 4.5 S 22 7 22 11.5 s -2.5 7 -2.5 7"
								/>

								<motion.path
									variants={noSoundVariants}
									custom={0}
									initial="hidden"
									animate={active ? 'hidden' : 'show'}
									d="M 16 9 L 22 15"
								/>
								<motion.path
									variants={noSoundVariants}
									custom={1}
									initial="hidden"
									animate={active ? 'hidden' : 'show'}
									d="M 16 15 L 22 9"
								/>

								<path
									className="fill-gray-700"
									d="M2 14v-4a1 1 0 0 1 1-1h2.697a1 1 0 0 0 .555-.168l4.193-2.796A1 1 0 0 1 12 6.87v10.26a1 1 0 0 1-1.555.832l-4.193-2.795A1 1 0 0 0 5.697 15H3a1 1 0 0 1-1-1Z"
								/>
							</g>
						</svg>
					</motion.g>
				</g>
			</svg>
		</div>
	);
}
