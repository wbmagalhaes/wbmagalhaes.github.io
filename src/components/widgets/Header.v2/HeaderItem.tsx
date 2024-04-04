import { motion, type AnimationDefinition, type Variants } from 'framer-motion';
import { useEffect, useState } from 'react';

type Props = {
	href: string;
	icon?: JSX.Element;
	text: string;
	aria: string;
	hoverBgColor?: string;
	target?: React.HTMLAttributeAnchorTarget;
};

export default function HeaderItem({ href, icon, text, aria, target = '_self', hoverBgColor = 'red' }: Props) {
	const [angle, setAngle] = useState(0);

	function randomizeAngle() {
		setAngle(Math.random() * 360);
	}

	useEffect(() => {
		randomizeAngle();
	}, []);

	const variants: Variants = {
		initial: {
			background: `linear-gradient(${angle}deg, ${hoverBgColor} -1%, transparent 0%)`,
		},
		hover: {
			background: [
				`linear-gradient(${angle}deg, ${hoverBgColor} -1%,  transparent 0%)`,
				`linear-gradient(${angle}deg, ${hoverBgColor} 100%,  transparent 101%)`,
			],
		},
	};

	return (
		<li className="h-full border-l-2 border-black">
			<motion.a
				className="relative overflow-hidden h-full px-4 flex place-items-center"
				href={href}
				aria-label={aria}
				target={target}
				initial="initial"
				whileHover="hover"
				variants={variants}
				onHoverEnd={() => randomizeAngle()}
			>
				{icon && (
					<span className="inline-flex align-middle sm:align-top sm:mr-1">
						<div className="w-6 h-6">{icon}</div>
					</span>
				)}

				<span className="inline-flex">{text}</span>
			</motion.a>
		</li>
	);
}
