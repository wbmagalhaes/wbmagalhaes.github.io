import { delay, motion, useAnimationControls } from 'framer-motion';
import { useEffect } from 'react';

async function timeout(s: number) {
	return new Promise((resolve) => setTimeout(resolve, s * 1000));
}

export default function Hero() {
	const controls = useAnimationControls();

	async function startAnimation(animation: string) {
		await controls.start(animation);

		if (animation == 'show') {
			await controls.start('down');
			startAnimation('hide');
		} else {
			await timeout(0.5);
			startAnimation('show');
		}
	}

	useEffect(() => {
		startAnimation('show');
	}, []);

	return (
		<section className="h-full min-h-screen flex flex-col px-4 pb-8 sm:px-8 pt-32">
			<div className="flex flex-col">
				<h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-none">William Magalhães</h1>
				<h2 className="text-1xl sm:text-2xl md:text-3xl font-semibold py-2">Full-stack Developer</h2>
				<p className="max-w-lg text-justify py-2">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
					et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
					aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
					cillum dolore eu fugiat nulla pariatur.
				</p>
			</div>

			<div className="flex-grow flex flex-col justify-end items-center">
				<motion.a
					whileHover={{ scale: 1.2 }}
					whileTap={{ scale: 0.8 }}
					href="#about"
					className="w-12 h-12 rounded-full text-wm-platinum mb-16"
				>
					<motion.svg
						xmlns="http://www.w3.org/2000/svg"
						preserveAspectRatio="xMidYMid meet"
						viewBox="0 0 48 48"
						fill="none"
						stroke="currentColor"
						strokeWidth="4"
						strokeLinecap="round"
						strokeLinejoin="round"
						initial="hidden"
						animate={controls}
						variants={svg}
					>
						<motion.circle variants={circle} cx="24" cy="24" r="20" />
						<motion.path variants={arrow} d="M 24 14 L 24 34" />
						<motion.path variants={arrowPoint} d="M 16 26 L 24 34 l 8 -8" />
					</motion.svg>
				</motion.a>
			</div>
		</section>
	);
}

const svg = {
	down: {
		y: [0, 10, 0],
		transition: {
			repeat: 2,
			duration: 0.75,
			type: 'spring',
			ease: 'easeInOut',
		},
	},
};

const circle = {
	hidden: {
		opacity: 0,
		pathLength: 0,
	},
	show: {
		opacity: 1,
		pathLength: 1,
		transition: {
			opacity: {
				duration: 0.01,
			},
			duration: 1,
		},
	},
	hide: {
		pathLength: 0,
		transition: {
			duration: 0.5,
			delay: 0.5,
		},
		transitionEnd: {
			opacity: 0,
		},
	},
};

const arrow = {
	hidden: {
		opacity: 0,
		pathLength: 0,
	},
	show: {
		opacity: 1,
		pathLength: 1,
		transition: {
			opacity: {
				duration: 0.01,
			},
			duration: 0.5,
			delay: 1,
		},
	},
	hide: {
		pathLength: 0,
		transition: {
			duration: 0.25,
			delay: 0.25,
		},
		transitionEnd: {
			opacity: 0,
		},
	},
};

const arrowPoint = {
	hidden: {
		opacity: 0,
		pathLength: 0,
	},
	show: {
		opacity: 1,
		pathLength: 1,
		transition: {
			opacity: {
				duration: 0.01,
			},
			duration: 0.5,
			delay: 1.5,
		},
	},
	hide: {
		pathLength: 0,
		transition: {
			duration: 0.25,
		},
		transitionEnd: {
			opacity: 0,
		},
	},
};
