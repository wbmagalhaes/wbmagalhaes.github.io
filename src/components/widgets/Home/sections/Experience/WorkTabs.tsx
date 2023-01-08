import { Tab } from '@headlessui/react';
import type { Work } from '@services/my_info';

type Props = {
	list: Work[];
};

export default function WorkTabs({ list }: Props) {
	return (
		<div className="flex flex-col md:flex-row w-full">
			<Tab.Group>
				<Tab.List className="flex md:flex-col h-full pb-2 md:pb-0 md:pr-2 overflow-x-auto md:overflow-x-visible">
					{list.map(({ name }) => (
						<Tab
							key={name}
							className={({ selected }) =>
								`w-full p-2 sm:p-4 rounded-sm text-sm whitespace-nowrap font-mono ${
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
				<Tab.Panels className="border-t md:border-t-0 md:border-l border-wm-carbon-600 pt-2 md:pt-0 md:pl-2">
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
							<div className="py-2">
								Relevant skills:
								<ul className="px-4 list-['⇢'] marker:text-wm-oxygen">
									{activities.map((activity, i) => (
										<li key={i} className="p-1">
											{activity}
										</li>
									))}
								</ul>
							</div>
						</Tab.Panel>
					))}
				</Tab.Panels>
			</Tab.Group>
		</div>
	);
}
