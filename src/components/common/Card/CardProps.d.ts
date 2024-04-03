export default interface CardProps {
	color?: string;
	thumbnail?: CardThumbnail;
	header?: string;
	subheader?: string;
	media?: string;
	body: string;
	actionButtons?: string[];
}

interface BaseCardThumbnail {

}

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
