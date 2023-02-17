import { motion, useAnimationControls } from 'framer-motion';

type Props = {
	href: string;
	icon: JSX.Element;
	text: string;
	aria: string;
	target?: React.HTMLAttributeAnchorTarget;
};

export default function HeaderItem({ href, icon, text, aria, target = '_self' }: Props) {
	const controls = useAnimationControls();

	return (
		<li className="relative text-wm-hydrogen-600 transition-all duration-200 p-0 lg:p-4">
			<motion.a
				href={href}
				aria-label={aria}
				onHoverStart={() => controls.start('show')}
				onHoverEnd={() => controls.start('hide')}
				target={target}
			>
				<svg
					className="absolute w-full h-full top-0 left-0 hidden lg:block"
					xmlns="http://www.w3.org/2000/svg"
					preserveAspectRatio="none"
					viewBox="0 0 30 10"
					fill="none"
				>
					<motion.path
						className="text-wm-hydrogen"
						initial="hidden"
						animate={controls}
						variants={shadowVariants}
						stroke="currentColor"
						strokeWidth={0.3}
						strokeLinecap="round"
						d="M 2 8 H 28 Z"
					/>
					<motion.path
						className="text-wm-oxygen"
						initial="hidden"
						animate={controls}
						variants={variants}
						stroke="currentColor"
						strokeWidth={0.4}
						strokeLinecap="round"
						d="M 2 8 H 28 Z"
					/>
				</svg>

				<span className="inline-flex align-middle sm:align-top sm:mr-1">
					<div className="p-0 lg:p-1 w-6 h-6">{icon}</div>
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
			type: 'spring',
		},
	},
	hide: {
		opacity: 1,
		pathLength: [1, 0],
		pathOffset: [0, 0.5],
		transition: {
			duration: 0.4,
			ease: 'easeInOut',
			type: 'spring',
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
		pathOffset: [0, 0.5],
		transition: {
			duration: 0.6,
			ease: 'easeInOut',
			type: 'spring',
		},
		transitionEnd: {
			opacity: 0,
		},
	},
};
