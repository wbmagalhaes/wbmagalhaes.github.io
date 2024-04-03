import CardThumbnail from './CardThumbnail';
import CardHeader from './CardHeader';
import CardMedia from './CardMedia';
import CardContent from './CardContent';
import CardFooter from './CardFooter';

import { type DataType } from 'csstype';

import '@styles/card.scss';

type Props = {
	bgColor?: DataType.Color;
	children: React.ReactNode;
};

export default function Card({ bgColor = 'white', children }: Props) {
	return (
		<article className="card text-black" style={{ backgroundColor: bgColor }}>
			{children}
		</article>
	);
}

Card.Thumbnail = CardThumbnail;
Card.Header = CardHeader;
Card.Media = CardMedia;
Card.Content = CardContent;
Card.Footer = CardFooter;
