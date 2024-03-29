import { motion, type Variants } from 'framer-motion';

interface Props {
	active: boolean;
	setActive: any;
}

export function Button({ active, setActive }: Props) {
	return (
		<motion.g
			whileHover={{ scale: 1.1 }}
			whileTap={{ scale: 0.85 }}
			onClick={() => setActive(!active)}
			className="cursor-pointer "
		>
			<circle className="fill-wm-carbon-600 stroke-wm-carbon-400 hover:stroke-wm-carbon-300 stroke-2" cx="0" cy="0" r="60" />

			<g
				transform="scale(3)"
				className=" stroke-2 stroke-wm-hydrogen fill-none"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<motion.path
					variants={soundVariants}
					initial="hidden"
					animate={active ? 'show' : 'hidden'}
					d="m 4.5 -4 s 1.5 1.5 1.5 4 s -1.5 4 -1.5 4"
				/>
				<motion.path
					variants={soundVariants}
					initial="hidden"
					animate={active ? 'show' : 'hidden'}
					d="m 7.5 -7 s 2.5 2.5 2.5 7 s -2.5 7 -2.5 7"
				/>

				<motion.path
					variants={noSoundVariants}
					custom={0}
					initial="hidden"
					animate={active ? 'hidden' : 'show'}
					d="M 4 -3 l 6 6 "
				/>
				<motion.path
					variants={noSoundVariants}
					custom={1}
					initial="hidden"
					animate={active ? 'hidden' : 'show'}
					d="M 10 -3 l -6 6"
				/>

				<path
					className="fill-wm-carbon-600"
					d="m -10 2 v -4 a 1 1 0 0 1 1 -1 h 2.697 a 1 1 0 0 0 0.555 -0.168 l 4.193 -2.796 a 1 1 0 0 1 1.555 0.834 v 10.26 a 1 1 0 0 1 -1.555 0.832 l -4.193 -2.795 a 1 1 0 0 0 -0.555 -0.167 h -2.697 a 1 1 0 0 1 -1 -1 z"
				/>
			</g>
		</motion.g>
	);
}

const soundVariants: Variants = {
	hidden: {
		opacity: 0,
		transition: {
			duration: 0,
		},
	},
	show: {
		opacity: [1, 1, 1, 1, 0],
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

const noSoundVariants: Variants = {
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
			delay: i * 0.15,
			pathLength: {
				duration: 0.15,
				type: 'spring',
				bounce: 0,
			},
			opacity: { duration: 0.01 },
			pathOffset: { duration: 0.01 },
		},
	}),
};
