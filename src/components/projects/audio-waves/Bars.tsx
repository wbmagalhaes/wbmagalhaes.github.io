import { motion } from 'framer-motion';

interface Props {
	active: boolean;
	direction: -1 | 1;
	wave: { x: number; y: number }[];
	barWidth: number;
}

export function Bars({ active, direction, wave, barWidth }: Props) {
	return (
		<motion.g variants={barContainerVariants} initial="stopped" animate={active ? 'wave' : 'stopped'}>
			{wave.map((point, i) => (
				<motion.rect
					key={i}
					variants={barsVariants}
					custom={point.y}
					className=" fill-[url(#bar-gradient)]"
					x={point.x * direction}
					y={-80000}
					width={barWidth}
					height={160000 }
				/>
			))}
		</motion.g>
	);
}

const barContainerVariants = {
	stopped: {
		opacity: 1,
	},
	wave: {
		opacity: 1,
		transition: { staggerChildren: 0.05 },
	},
};

const barsVariants = {
	stopped: {
		scaleY: 0,
		transition: {
			duration: 2,
			type: 'spring',
			bounce: 0,
		},
	},
	wave: (scale: number) => ({
		scaleY: [0, scale, 0],
		transition: {
			repeat: Infinity,
			ease: 'easeInOut',
			duration: 1.2,
		},
	}),
};
