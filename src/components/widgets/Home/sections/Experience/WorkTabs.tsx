import { Tab } from '@headlessui/react';
import type { Work } from '@services/my_info';

type Props = {
	list: Work[];
};

export default function WorkTabs({ list }: Props) {
	return (
		<div className="flex w-full">
			<Tab.Group>
				<Tab.List className="flex flex-col h-full pr-2">
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
				<Tab.Panels className="border-l border-wm-carbon-600 pl-2">
					{list.map(({ name, title, at, atURL, description, date, activities }) => (
						<Tab.Panel key={name}>
							<h2 className="font-bold">
								{title}{' '}
								<a
									href={atURL}
									target="blank"
									aria-label="Workplace Site"
									className="text-wm-oxygen-300"
								>
									@{at}
								</a>
							</h2>
							<span className="text-sm font-mono">{date}</span>
							<p className="py-2">{description}</p>
							<p className="py-2">
								Relevant skills:
								<ul className="px-4 list-['⇢'] marker:text-wm-oxygen">
									{activities.map((activity, i) => (
										<li key={i} className="p-1">
											{activity}
										</li>
									))}
								</ul>
							</p>
						</Tab.Panel>
					))}
				</Tab.Panels>
			</Tab.Group>
		</div>
	);
}
