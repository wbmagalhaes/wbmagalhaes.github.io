type Props = {
	children: React.ReactNode;
};

export default function CardMedia({ children }: Props) {
	return <div className='card-media'>{children}</div>;
}
