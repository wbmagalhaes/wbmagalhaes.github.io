import { Icon } from '@iconify/react';

type TechProps = {
	name: string;
	icon: string;
	color: string;
};

export type TechListProps = {
	title: string;
	list: TechProps[];
};

type TechStackProps = {
	techs: TechListProps[];
};

export default function TechStack({ techs }: TechStackProps) {
	return (
		<div className="flex flex-col gap-4 mt-2">
			{techs.map(({ title, list }, i) => (
				<div className="flex flex-col gap-2" key={i}>
					<h2 className="text-wm-oxygen-300 font-mono">{title}</h2>
					<ul className="flex flex-wrap gap-1 p-2">
						{list.map(({ name, icon, color }, i) => (
							<li
								key={i}
								className="inline-flex rounded-full px-4 py-1.5 gap-2 items-center bg-wm-carbon-900"
							>
								<span className="text-sm ">{name}</span>
								<Icon icon={icon} color={color} />
							</li>
						))}
					</ul>
				</div>
			))}
		</div>
	);
}
