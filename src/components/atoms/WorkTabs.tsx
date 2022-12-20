import { Tab } from '@headlessui/react';

type WorkProps = {
	name: string;
	title: string;
	date: string;
	description: string;
	activities: string[];
};

export type WorkListProps = {
	list: WorkProps[];
};

export default function WorkTabs({ list }: WorkListProps) {
	return (
		<div className="flex w-full">
			<Tab.Group>
				<Tab.List className="flex flex-col h-full pr-4">
					{list.map(({ name }) => (
						<Tab
							key={name}
							className={({ selected }) =>
								`w-full p-4 text-sm md:whitespace-nowrap font-mono ${
									selected
										? 'text-wm-carbon bg-wm-accent'
										: 'text-wm-platinum hover:bg-wm-carbon-600 hover:text-wm-platinum'
								}`
							}
						>
							{name}
						</Tab>
					))}
				</Tab.List>
				<Tab.Panels className="border-l border-wm-carbon-600 pl-4">
					{list.map(({ name, title, description, date, activities }) => (
						<Tab.Panel key={name}>
							<h3 className="font-bold">{title}</h3>
							<span className="text-xs font-mono">{date}</span>
							<p className="py-2">{description}</p>
							<ul className="p-4 list-['▹'] marker:text-wm-accent">
								{activities.map((activity) => (
									<li className="p-1">{activity}</li>
								))}
							</ul>
						</Tab.Panel>
					))}
				</Tab.Panels>
			</Tab.Group>
		</div>
	);
}
