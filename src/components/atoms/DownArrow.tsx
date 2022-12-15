import { motion, useAnimationControls } from 'framer-motion';
import { useEffect } from 'react';

type Props = {};

export function DownArrow({}: Props) {
	async function timeout(s: number) {
		return new Promise((resolve) => setTimeout(resolve, s * 1000));
	}

	const controls = useAnimationControls();

	async function playAnimation(animation: string) {
		await controls.start(animation);

		if (animation == 'show') {
			await controls.start('down');
			await playAnimation('hide');
		} else {
			await timeout(1.5);
			await playAnimation('show');
		}
	}

	async function start() {
		await timeout(4);
		await playAnimation('show');
	}

	useEffect(() => {
		start();
	}, []);

	return (
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
				strokeWidth="3"
				strokeLinecap="round"
				strokeLinejoin="round"
				initial="hidden"
				animate={controls}
				variants={all}
			>
				<motion.circle variants={circle} cx="24" cy="24" r="20" />
				<motion.path variants={arrow} d="M 24 14 L 24 34" />
				<motion.path variants={arrowPoint} d="M 16 26 L 24 34 l 8 -8" />
			</motion.svg>
		</motion.a>
	);
}

const all = {
	down: {
		y: [0, 10, 0],
		transition: {
			repeat: 2,
			duration: 0.8,
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
			ease: 'easeOut',
		},
	},
	hide: {
		pathLength: 0,
		transition: {
			duration: 1,
			delay: 0.5,
			ease: 'easeIn',
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
			ease: 'easeOut',
		},
	},
	hide: {
		pathLength: 0,
		transition: {
			duration: 0.25,
			delay: 0.25,
			ease: 'easeIn',
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
			ease: 'easeOut',
		},
	},
	hide: {
		pathLength: 0,
		transition: {
			duration: 0.25,
			ease: 'easeIn',
		},
		transitionEnd: {
			opacity: 0,
		},
	},
};
