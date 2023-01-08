import { motion, useAnimationControls } from 'framer-motion';
import { useEffect } from 'react';

type Props = { href: string };

export function DownArrow({ href }: Props) {
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
			href={href}
			className="w-12 h-12 mb-16 rounded-full text-wm-oxygen hover:text-wm-oxygen-300 red-neon"
			initial="hidden"
			animate={controls}
			variants={all}
			aria-label="Next Section"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				preserveAspectRatio="xMidYMid meet"
				viewBox="0 0 48 48"
				fill="none"
				stroke="currentColor"
				strokeWidth="3"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<motion.circle className="origin-center rotate-90" variants={circle} cx="24" cy="24" r="20" />
				<motion.path variants={arrow} d="M 24 14 L 24 34" />
				<motion.path variants={arrowPoint} d="M 16 26 L 24 34 l 8 -8" />
			</svg>
		</motion.a>
	);
}

const all = {
	hidden: { display: 'none' },
	show: { display: 'block' },
	hide: {
		display: 'none',
		transition: {
			delay: 1.5,
		},
	},
	down: {
		y: [0, 10, 0],
		transition: {
			repeat: 3,
			duration: 0.8,
			ease: 'easeInOut',
		},
	},
};

const circle = {
	hidden: {
		opacity: 0,
		pathLength: 0,
		pathOffset: 0.5,
	},
	show: {
		opacity: 1,
		pathLength: 1,
		pathOffset: 0,
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
		pathOffset: 0.5,
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
		pathOffset: 0.5,
	},
	show: {
		opacity: 1,
		pathLength: 1,
		pathOffset: 0,
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
		pathOffset: 0.5,
		transition: {
			duration: 0.25,
			ease: 'easeIn',
		},
		transitionEnd: {
			opacity: 0,
		},
	},
};
