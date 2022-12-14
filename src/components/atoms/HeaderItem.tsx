import { motion, useAnimationControls } from 'framer-motion';
import { Icon } from '@iconify/react';

type Props = {
	href: string;
	icon: string;
	text: string;
};

export default function HeaderItem({ href, icon, text }: Props) {
	const controls = useAnimationControls();

	return (
		<li className="relative text-wm-platinum-600 hover:text-wm-accent transition-all duration-200 p-0 lg:p-4">
			<motion.a onHoverStart={() => controls.start('show')} onHoverEnd={() => controls.start('hide')} href={href}>
				<svg
					className="absolute w-full h-full top-0 left-0 hidden lg:block"
					xmlns="http://www.w3.org/2000/svg"
					preserveAspectRatio="none"
					viewBox="-2 -2 34 14"
					fill="none"
				>
					<motion.path
						className="text-wm-platinum"
						initial="hidden"
						animate={controls}
						variants={shadowVariants}
						stroke="currentColor"
						strokeWidth={0.4}
						strokeLinecap="round"
						d="M 4 10 H 0 V 0 H 28 L 30 2 V 8"
					/>
					<motion.path
						className="text-wm-accent"
						initial="hidden"
						animate={controls}
						variants={variants}
						stroke="currentColor"
						strokeWidth={0.5}
						strokeLinecap="round"
						d="M 4 10 H 0 V 0 H 28 L 30 2 V 8"
					/>
				</svg>

				<span className="inline-flex align-middle sm:align-top sm:mr-1">
					<Icon className="p-0 lg:p-1 w-6 h-6" icon={icon} />
				</span>

				<span className="hidden lg:inline-flex">{text}</span>
			</motion.a>
		</li>
	);
}

const variants = {
	hidden: {
		opacity: 0,
		pathLength: 0,
		pathOffset: 0,
	},
	show: {
		opacity: 1,
		pathLength: [0, 1],
		pathOffset: [0, 0],
		transition: {
			opacity: {
				duration: 0.01,
			},
			duration: 0.3,
			ease: 'easeInOut',
		},
	},
	hide: {
		opacity: 1,
		pathLength: [1, 0],
		pathOffset: [0, 0.99],
		transition: {
			duration: 0.3,
			ease: 'easeInOut',
		},
		transitionEnd: {
			opacity: 0,
		},
	},
};

const shadowVariants = {
	hidden: {
		opacity: 0,
		pathLength: 0,
		pathOffset: 0,
	},
	show: {
		opacity: 0,
		pathLength: 0,
		pathOffset: 0,
	},
	hide: {
		opacity: [1, 1],
		pathLength: [1, 0],
		pathOffset: [0, 0.99],
		transition: {
			duration: 0.4,
			ease: 'easeInOut',
		},
		transitionEnd: {
			opacity: 0,
		},
	},
};
