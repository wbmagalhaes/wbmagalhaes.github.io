type Props = {
	children: React.ReactNode;
};

export default function CardContent({ children }: Props) {
	return <div className='px-4 mb-4'>{children}</div>;
}
