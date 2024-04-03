import CardThumbnail from './CardThumbnail';
import CardHeader from './CardHeader';
import CardMedia from './CardMedia';
import CardContent from './CardContent';
import CardFooter from './CardFooter';

type Props = {
	bgColor?: string;
	children: React.ReactNode;
};

export default function Card({ bgColor = 'white', children }: Props) {
	return (
		<article
			className="card rounded-sm overflow-hidden border-2 border-black hard-shadow-4 text-black"
			style={{ backgroundColor: bgColor }}
		>
			{children}
		</article>
	);
}

Card.Thumbnail = CardThumbnail;
Card.Header = CardHeader;
Card.Media = CardMedia;
Card.Content = CardContent;
Card.Footer = CardFooter;
