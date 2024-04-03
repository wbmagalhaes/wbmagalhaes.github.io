type Props = {
	title: string;
	subtitle?: string;
	left?: React.ReactNode;
	right?: React.ReactNode;
};

export default function CardHeader({ title, subtitle, left, right }: Props) {
	return (
		<div className="flex p-4 gap-2">
			{left && <div className="grow-0 shrink-0 flex-auto flex items-start">{left}</div>}

			<div className="grow-1 shrink-1 flex-auto flex flex-col justify-start gap-1">
				<div className="text-xl leading-normal font-bold">{title}</div>
				{subtitle && <div className="text-sm leading-none">{subtitle}</div>}
			</div>

			{right && <span className="ml-auto pl-2 grow-0 shrink-0 flex-auto flex items-start">{right}</span>}
		</div>
	);
}
