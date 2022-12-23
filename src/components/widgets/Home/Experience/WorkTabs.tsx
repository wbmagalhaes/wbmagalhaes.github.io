import { Tab } from '@headlessui/react';

export type WorkProps = {
	name: string;
	title: string;
	date: string;
	description: string;
	activities: string[];
};

type WorkListProps = {
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
										? 'text-wm-carbon bg-wm-oxygen'
										: 'text-wm-hydrogen hover:bg-wm-carbon-600 hover:text-wm-hydrogen'
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
							<h2 className="font-bold">{title}</h2>
							<span className="text-sm font-mono">{date}</span>
							<p className="py-2">{description}</p>
							<ul className="p-4 list-['⇢'] marker:text-wm-oxygen">
								{activities.map((activity, i) => (
									<li key={i} className="p-1">
										{activity}
									</li>
								))}
							</ul>
						</Tab.Panel>
					))}
				</Tab.Panels>
			</Tab.Group>
		</div>
	);
}
