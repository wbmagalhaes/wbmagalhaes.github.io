type Props = {
	bgColor?: string;
	rotation?: number;
	translation?: [number, number];
	children: React.ReactNode;
};

export default function Button({ bgColor = 'white', rotation = 0, translation = [0, 0], children }: Props) {
	return (
		<button
			className="button rounded-sm border-2 border-black hard-shadow-4 text-black font-semibold"
			style={{
				backgroundColor: bgColor,
				rotate: `${rotation}rad`,
				translate: `${translation[0]}px ${translation[1]}px`,
			}}
		>
			<span className="px-4 py-2 flex items-center gap-2">{children}</span>
		</button>
	);
}
