import { useState } from 'react';
import { motion } from 'framer-motion';
import Featured from './Featured';
import Card from './Card';
import type { Project } from '@services/my_info';

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
			<div className="flex flex-col gap-4 py-4">
				<h2 className="mb-8 text-center">Other projects</h2>

				<motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-between justify-items-center gap-8">
					{otherToShow.map((project, i) => (
						<Card key={i} project={project} column={i % columns} noCover showAnim />
					))}
				</motion.div>

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
