import { Icon } from '@iconify/react';
import { motion, useAnimationControls } from 'framer-motion';
import { useAnimationOnStart } from '@core/useAnimationOnStart';

type SocialProps = { link: string; icon: string; aria: string };

type Props = {
	socials: SocialProps[];
};

export default function Socials({ socials }: Props) {
	const maxIndex = socials.length - 1;

	return (
		<div className="hidden md:block fixed bottom-0 left-6 lg:left-8 xl:left-16 w-12 lg:w-16 xl:w-32 z-10">
			<div className="flex flex-col place-items-center justify-end gap-6">
				<ul className="flex flex-col items-center gap-6">
					{socials.map(({ link, icon, aria }, i) => (
						<SocialItem key={i} index={maxIndex - i} link={link} icon={icon} aria={aria} />
					))}
				</ul>
				<motion.span
					className="w-[1px] h-64 origin-bottom bg-wm-oxygen"
					initial="hidden"
					animate="show"
					variants={lineVariants}
				/>
			</div>
		</div>
	);
}

function SocialItem({ index, link, icon, aria }: { index: number } & SocialProps) {
	const controls = useAnimationControls();
	useAnimationOnStart(controls, 'show');

	return (
		<motion.li
			custom={index}
			className="text-wm-oxygen hover:text-wm-oxygen-200 hover:red-neon"
			initial="hidden"
			animate={controls}
			onHoverStart={() => controls.start('hover')}
			onHoverEnd={() => controls.start('normal')}
			variants={itemVariants}
		>
			<a href={link} target="_blank" aria-label={aria}>
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
