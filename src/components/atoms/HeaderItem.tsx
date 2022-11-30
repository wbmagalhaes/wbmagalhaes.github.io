import { motion, useAnimationControls } from 'framer-motion';

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
			duration: 0.2,
			ease: 'easeInOut',
		},
	},
	hide: {
		opacity: 1,
		pathLength: [1, 0],
		pathOffset: [0, 0.99],
		transition: {
			duration: 0.2,
			ease: 'easeInOut',
		},
		transitionEnd: {
			opacity: 0,
		},
	},
};

type Props = {
	href: string;
	icon?: React.ReactNode;
	text: string;
};

export default function HeaderItem({ href, icon, text }: Props) {
	const controls = useAnimationControls();

	return (
		<a href={href} className="relative text-wm-platinum p-2 sm:p-4">
			<motion.svg
				initial="hidden"
				animate={controls}
				onHoverStart={() => controls.start('show')}
				onHoverEnd={() => controls.start('hide')}
				className="absolute text-wm-accent w-full h-full top-0 left-0"
				xmlns="http://www.w3.org/2000/svg"
				preserveAspectRatio="none"
				viewBox="0 0 30 10"
			>
				<motion.path
					variants={variants}
					stroke="currentColor"
					strokeWidth={0.5}
					strokeLinecap="round"
					d="M2 8H28"
				></motion.path>
			</motion.svg>

			<span className="inline-flex align-middle sm:align-top sm:mr-1">{icon}</span>
			<span className="hidden md:inline-flex">{text}</span>
		</a>
	);
}
