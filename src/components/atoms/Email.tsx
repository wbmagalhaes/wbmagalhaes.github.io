import { motion, useAnimationControls } from 'framer-motion';
import { useAnimationOnStart } from '@core/useAnimationOnStart';

type Props = {
	icon?: string;
	email: string;
};

export default function Email({ icon, email }: Props) {
	const controls = useAnimationControls();
	useAnimationOnStart(controls, 'show');

	return (
		<div className="hidden sm:block fixed top-0 right-6 w-12 z-10">
			<div className="flex flex-col place-items-center justify-end gap-2">
				<motion.span
					className="w-[1px] h-48 origin-top bg-wm-accent"
					initial="hidden"
					animate="show"
					variants={lineVariants}
				/>

				<motion.a
					href={`mailto:${email}`}
					className="font-mono text-sm text-wm-accent hover:text-wm-accent-200 hover:red-neon"
					initial="hidden"
					animate={controls}
					onHoverStart={() => controls.start('hover')}
					onHoverEnd={() => controls.start('normal')}
					variants={itemVariants}
				>
					<div className="w-6 h-6 mb-2 rotate-90">{icon}</div>
					<span className="[writing-mode:vertical-rl]">{email}</span>
				</motion.a>
			</div>
		</div>
	);
}

const itemVariants = {
	hidden: { y: -40, opacity: 0 },
	show: {
		y: 0,
		opacity: 1,
		transition: {
			delay: 1.8,
		},
	},
	normal: { y: 0 },
	hover: { y: 4 },
};

const lineVariants = {
	hidden: { scale: 0 },
	show: {
		scale: 1,
		transition: {
			delay: 1.2,
			duration: 0.6,
			type: 'spring',
		},
	},
};
