import { useState } from 'react';
import { motion } from 'framer-motion';
import Featured from './Featured';
import Card from './Card';

export type ProjectProps = {
	url?: string;
	cover?: string;
	title?: string;
	description?: string;
	tags?: [string];
	date?: string;
	draft?: boolean;
	featured?: boolean;
};

type ProjectListProps = {
	featured: ProjectProps[];
	other: ProjectProps[];
};

export default function Showcase({ featured, other }: ProjectListProps) {
	const [cardCount, setCardCount] = useState(3);
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

				<motion.div className="grid grid-cols-3 gap-8">
					{otherToShow.map((project, i) => (
						<Card key={i} project={project} column={i % 3} noCover showAnim />
					))}
				</motion.div>

				{cardCount < other.length && (
					<button
						className="bg-wm-oxygen text-wm-hydrogen px-6 py-1.5 rounded-full mx-auto"
						onClick={() => setCardCount(cardCount + 3)}
					>
						See More
					</button>
				)}
			</div>
		</>
	);
}
