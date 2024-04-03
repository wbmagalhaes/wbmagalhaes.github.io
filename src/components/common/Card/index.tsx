import CardThumbnail from './CardThumbnail';
import CardHeader from './CardHeader';
import CardMedia from './CardMedia';
import CardContent from './CardContent';
import CardFooter from './CardFooter';

type Props = {
	bgColor?: string;
	rotation?: number;
	translation?: [number, number];
	children: React.ReactNode;
};

export default function Card({ bgColor = 'white', rotation = 0, translation = [0, 0], children }: Props) {
	return (
		<article
			className="card rounded-sm overflow-hidden border-2 border-black hard-shadow-4 text-black"
			style={{
				backgroundColor: bgColor,
				rotate: `${rotation}rad`,
				translate: `${translation[0]}px ${translation[1]}px`,
			}}
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
