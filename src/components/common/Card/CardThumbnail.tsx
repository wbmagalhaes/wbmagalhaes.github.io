import { type DataType } from 'csstype';

interface BaseCardThumbnail {}

interface CardThumbnailIcon extends BaseCardThumbnail {
	type: 'icon';
	icon: string;
	color: string;
	size: number;
}

interface CardThumbnailImage extends BaseCardThumbnail {
	type: 'image';
	src: string;
	width: number;
}

export type CardThumbnail = CardThumbnailIcon | CardThumbnailImage;

type Props = {
	bgColor?: DataType.Color;
	children: React.ReactNode;
};

export default function CardThumbnail({ bgColor = 'whitesmoke', children }: Props) {
	return (
		<span
			className="grid place-items-center aspect-square overflow-hidden rounded-full"
			style={{ backgroundColor: bgColor }}
		>
			{children}
		</span>
	);
}
