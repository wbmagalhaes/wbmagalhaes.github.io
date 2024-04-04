import { motion, type Variants } from 'framer-motion';

type Props = {
	bgColor?: string;
	rotation?: number;
	translation?: [number, number];
	children: React.ReactNode;
};

export default function Button({ bgColor = 'white', rotation = 0, translation = [0, 0], children }: Props) {
	return (
		<div
			style={{
				rotate: `${rotation}rad`,
				translate: `${translation[0]}px ${translation[1]}px`,
			}}
		>
			<motion.button
				className="button rounded-sm border-2 border-black text-black font-semibold"
				variants={variants}
				initial="initial"
				whileHover="hover"
				whileTap="tap"
				style={{
					backgroundColor: bgColor,
				}}
			>
				<span className="px-4 py-2 flex items-center gap-2">{children}</span>
			</motion.button>
		</div>
	);
}

const variants: Variants = {
	initial: {
		scale: 1.0,
		translate: '0px 0px',
		filter: 'drop-shadow(4px 4px black)',
		transition: {
			duration: 0.1,
		},
	},
	hover: {
		scale: 1.025,
		translate: '-2px -2px',
		filter: 'drop-shadow(6px 6px black)',
		transition: {
			duration: 0.1,
		},
	},
	tap: {
		scale: 0.975,
		translate: '2px 2px',
		filter: 'drop-shadow(2px 2px black)',
		transition: {
			duration: 0.1,
		},
	},
};
