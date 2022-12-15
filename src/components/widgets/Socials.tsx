import { Icon } from '@iconify/react';
import { motion, useAnimationControls } from 'framer-motion';
import { useAnimationOnStart } from '@core/useAnimationOnStart';

type SocialProps = { link: string; icon: string };

type Props = {
	socials: SocialProps[];
};

export default function Socials({ socials }: Props) {
	const maxIndex = socials.length - 1;

	return (
		<div className="hidden sm:block fixed bottom-0 left-6 w-12 z-10">
			<div className="flex flex-col place-items-center justify-end gap-6">
				<ul className="flex flex-col items-center gap-6">
					{socials.map(({ link, icon }, i) => (
						<SocialItem key={i} index={maxIndex - i} link={link} icon={icon} />
					))}
				</ul>
				<motion.span
					className="w-[1px] h-32 origin-bottom bg-wm-accent"
					initial="hidden"
					animate="show"
					variants={lineVariants}
				/>
			</div>
		</div>
	);
}

function SocialItem({ index, link, icon }: { index: number } & SocialProps) {
	const controls = useAnimationControls();
	useAnimationOnStart(controls, 'show');

	return (
		<motion.li
			custom={index}
			className="text-wm-accent hover:text-wm-accent-200"
			initial="hidden"
			animate={controls}
			onHoverStart={() => controls.start('hover')}
			onHoverEnd={() => controls.start('normal')}
			variants={itemVariants}
		>
			<a href={link}>
				<Icon className="w-6 h-6" icon={icon} />
			</a>
		</motion.li>
	);
}

const itemVariants = {
	hidden: { y: 40, opacity: 0 },
	show: (i: number) => ({
		y: 0,
		opacity: 1,
		transition: {
			delay: i * 0.2 + 0.6,
		},
	}),
	normal: { y: 0 },
	hover: { y: -4 },
};

const lineVariants = {
	hidden: { scale: 0 },
	show: {
		scale: 1,
		transition: {
			duration: 0.6,
			type: 'spring',
		},
	},
};
