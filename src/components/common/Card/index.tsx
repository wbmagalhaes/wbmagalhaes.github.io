import { motion, useDragControls, type Variants } from 'framer-motion';
import CardThumbnail from './CardThumbnail';
import CardHeader from './CardHeader';
import CardMedia from './CardMedia';
import CardContent from './CardContent';
import CardFooter from './CardFooter';
import type { RefObject } from 'react';

type Props = {
	zIndex?: number;
	bgColor?: string;
	rotation?: number;
	translation?: [number, number];
	dragConstraint?: RefObject<Element>;
	onDragStart?: () => void;
	children: React.ReactNode;
};

export default function Card({
	zIndex,
	bgColor = 'white',
	rotation = 0,
	translation = [0, 0],
	dragConstraint,
	onDragStart,
	children,
}: Props) {
	const controls = useDragControls();

	return (
		<motion.article
			drag
			dragConstraints={dragConstraint}
			dragElastic={0.1}
			dragMomentum={false}
			dragControls={controls}
			onDragStart={() => onDragStart?.call(0)}
			initial="initial"
			whileDrag="drag"
			variants={variants}
			className="card rounded-sm overflow-hidden border-2 border-black hard-shadow-4 text-black"
			style={{
				zIndex: zIndex,
				backgroundColor: bgColor,
				rotate: `${rotation}rad`,
				translate: `${translation[0]}px ${translation[1]}px`,
			}}
		>
			{children}
		</motion.article>
	);
}

Card.Thumbnail = CardThumbnail;
Card.Header = CardHeader;
Card.Media = CardMedia;
Card.Content = CardContent;
Card.Footer = CardFooter;

const variants: Variants = {
	initial: {
		scale: 1,
		filter: 'drop-shadow(4px 4px black)',
	},
	drag: {
		scale: 1.05,
		filter: 'drop-shadow(6px 6px black)',
	},
};
