import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

type Props = {
	href: string;
	icon: JSX.Element;
	text: string;
	aria: string;
	hoverBgColor?: string;
	target?: React.HTMLAttributeAnchorTarget;
};

export default function HeaderItem({ href, icon, text, aria, target = '_self', hoverBgColor = 'red' }: Props) {
	const [startPos, setStartPos] = useState([-1, -1]);

	function randomizePosition() {
		const rngX = Math.random();
		const rngY = Math.random();

		const x = rngX > 0.5 ? 1 : -1;
		const y = rngY > 0.5 ? 1 : -1;

		setStartPos([x, y]);
	}

	useEffect(() => {
		randomizePosition();
	}, []);

	return (
		<li className="h-full border-l-2 border-black">
			<motion.a
				className="relative overflow-hidden h-full px-4 flex place-items-center"
				href={href}
				aria-label={aria}
				target={target}
				onHoverEnd={() => randomizePosition()}
				whileHover="hover"
			>
				<motion.span
					className="absolute inset-0  -z-10 pointer-events-none"
					style={{
						backgroundColor: hoverBgColor,
						scale: '200%',
						rotate: '45deg',
						translate: `${150 * startPos[0]}% ${150 * startPos[1]}%`,
					}}
					variants={{
						hover: { translate: '0' },
					}}
				/>

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
