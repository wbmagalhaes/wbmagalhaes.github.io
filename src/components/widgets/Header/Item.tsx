import { motion, useAnimationControls, type Variants } from 'framer-motion';

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
		<li className="relative text-wm-hydrogen-600 transition-all duration-200">
			<motion.a
				className='block h-full'
				href={href}
				aria-label={aria}
				onHoverStart={() => controls.start('show')}
				onHoverEnd={() => controls.start('hide')}
				target={target}
			>
				<svg
					className="absolute inset-0 h-full w-full hidden lg:block mt-4"
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
						strokeWidth={1}
						strokeLinecap="round"
						d="M 0 5 H 30 Z"
					/>
					<motion.path
						className="text-wm-oxygen"
						initial="hidden"
						animate={controls}
						variants={variants}
						stroke="currentColor"
						strokeWidth={1}
						strokeLinecap="round"
						d="M 0 5 H 30 Z"
					/>
				</svg>

				<span className="inline-flex align-middle sm:align-top sm:mr-1">
					<div className="w-6 h-6">{icon}</div>
				</span>

				<span className="hidden lg:inline-flex">{text}</span>
			</motion.a>
		</li>
	);
}

const variants: Variants = {
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
		pathOffset: [0, 0.5],
		transition: {
			duration: 0.2,
			ease: 'easeOut',
		},
		transitionEnd: {
			opacity: 0,
		},
	},
};

const shadowVariants: Variants = {
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
			duration: 0.4,
			ease: 'easeOut',
		},
		transitionEnd: {
			opacity: 0,
		},
	},
};
