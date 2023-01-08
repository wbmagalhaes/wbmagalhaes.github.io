import { useRef } from 'react';
import { useInView, motion } from 'framer-motion';
import OpenButton from './OpenButton';
import type { Project } from '@services/my_info';

interface Props {
	project: Project;
	column?: number;
	noCover?: boolean;
	showAnim?: boolean;
}

const variants = {
	hidden: {
		opacity: 0,
		x: -100,
	},
	show: (i: number) => ({
		opacity: 1,
		x: 0,
		transition: {
			x: {
				ease: 'backOut',
				duration: 0.8,
			},
			opacity: {
				ease: 'linear',
				duration: 0.4,
			},
			delay: i * 0.1,
		},
	}),
};

export default function Card({ project, column, noCover = false, showAnim = false }: Props) {
	const aria = `Abrir ${project.title}`;

	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, amount: 0.5 });

	return (
		<motion.article
			ref={ref}
			className="w-full max-w-sm flex flex-col bg-wm-carbon-300 rounded text-left overflow-hidden"
			variants={showAnim ? variants : undefined}
			initial="hidden"
			animate={isInView ? 'show' : 'hidden'}
			whileHover={{ y: -6 }}
			custom={column}
		>
			{!noCover && (
				<a href={project.url} aria-label={aria} className="w-full h-48 grid place-items-center overflow-hidden">
					<img
						src={project.cover}
						className="min-w-full min-h-full object-cover bg-wm-carbon-400 text-wm-hydrogen grid place-items-center"
						alt="Imagem de Capa"
					/>
				</a>
			)}

			<div className="flex-grow p-5">
				<div className="flex items-center mb-4">
					<h2 className="font-bold tracking-tight">
						<a href={project.url} aria-label={aria}>
							{project.title}
						</a>
					</h2>
					{noCover && <OpenButton url={project.url ?? '#'} aria={aria} />}
				</div>

				<p className="font-normal">{project.description}</p>
			</div>

			<div className="relative px-5 py-1 md:py-2 flex flex-row flex-wrap mt-auto gap-1 md:gap-2">
				<div className="absolute top-0 left-0 w-full h-full border-y border-dashed border-wm-oxygen-400 sides-fade"></div>
				{project.tags?.map((tag, i) => (
					<span
						key={i}
						className="inline-block z-10 bg-wm-oxygen-400 rounded-full px-3 py-1 text-xs font-semibold"
					>
						{tag}
					</span>
				))}
			</div>

			<div className="flex flex-row p-2 pl-5 md:p-5">
				<span className="inline-flex items-center text-xs">
					{new Date(project.date ?? '').toLocaleDateString('pt-BR', {
						timeZone: 'UTC',
						year: 'numeric',
						month: 'short',
						day: '2-digit',
					})}
				</span>
				{!noCover && <OpenButton url={project.url ?? '#'} aria={aria} />}
			</div>
		</motion.article>
	);
}
