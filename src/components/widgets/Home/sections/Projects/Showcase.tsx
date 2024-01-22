import { useState } from 'react';
import { motion } from 'framer-motion';
import Featured from './Featured';
import Card from './Card';
import type { Project } from 'types/project';

type Props = {
	featured: Project[];
	other: Project[];
};

export default function Showcase({ featured, other }: Props) {
	const columns = 3;

	const [cardCount, setCardCount] = useState(columns);
	const otherToShow = other.slice(0, cardCount);

	return (
		<>
			<div className="flex flex-col gap-8 py-4 mb-24">
				{featured.map((project, i) => (
					<Featured key={i} idx={i} project={project} />
				))}
			</div>
			<div className="flex flex-col gap-8 py-4">
				<h2 className="mb-8 text-center">Other projects</h2>

				<div className="flex flex-wrap justify-center justify-items-center gap-4">
					{otherToShow.map((project, i) => (
						<Card key={i} project={project} column={i % columns} noCover showAnim />
					))}
				</div>

				{cardCount < other.length && (
					<button
						className="bg-wm-oxygen text-wm-hydrogen px-6 py-1.5 rounded-full mx-auto"
						onClick={() => setCardCount(cardCount + columns)}
					>
						See More
					</button>
				)}
			</div>
		</>
	);
}
