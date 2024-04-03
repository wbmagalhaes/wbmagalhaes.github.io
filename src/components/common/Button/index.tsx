type Props = {
	bgColor?: string;
	children: React.ReactNode;
};

export default function Button({ bgColor = 'white', children }: Props) {
	return (
		<button
			className="button rounded-sm border-2 border-black hard-shadow-4 text-black font-semibold"
			style={{ backgroundColor: bgColor }}
		>
			<span className="px-4 py-2 flex items-center gap-2">{children}</span>
		</button>
	);
}
