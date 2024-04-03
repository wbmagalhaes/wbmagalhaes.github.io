import '@styles/button.scss';

type Props = {
	bgColor?: string;
	children: React.ReactNode;
};

export default function Button({ bgColor = 'white', children }: Props) {
	return (
		<button className="button text-black" style={{ backgroundColor: bgColor }}>
			{children}
		</button>
	);
}
