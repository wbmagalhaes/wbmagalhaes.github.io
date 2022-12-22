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
		<>
			{techs.map(({ title, list }, i) => (
				<div className="py-2" key={i}>
					<h2 className="py-2">{title}</h2>
					<ul className="flex flex-wrap gap-1">
						{list.map(({ name, icon, color }, i) => (
							<li
								key={i}
								className="text-sm inline-flex rounded-full px-4 py-1.5 gap-2 items-center bg-wm-carbon-600"
							>
								<span>{name}</span>
								<Icon icon={icon} color={color} />
							</li>
						))}
					</ul>
				</div>
			))}
		</>
	);
}
