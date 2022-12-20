import { motion } from 'framer-motion';
import type { ProjectProps } from '@atoms/ProjectShowcase';

interface Props {
	project: ProjectProps;
}

export default function ProjectCard({ project }: Props) {
	return (
		<article className="w-full max-w-sm flex flex-col bg-wm-carbon-300 rounded text-left overflow-hidden">
			<a href={project.url} className="w-full h-48 grid place-items-center overflow-hidden">
				<img
					src={project.cover}
					className="min-w-full min-h-full object-cover bg-wm-carbon-400 text-wm-hydrogen grid place-items-center"
					alt="Imagem de Capa"
				/>
			</a>

			<div className="flex-grow p-5">
				<h2 className="mb-2 font-bold tracking-tight">
					<a href={project.url}>{project.title}</a>
				</h2>
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
				<motion.a
					initial="normal"
					whileHover="hover"
					href={project.url}
					className="flex gap-2
					ml-auto items-center
					text-sm font-medium text-wm-oxygen-600 hover:text-wm-oxygen-200"
				>
					Abrir
					<svg
						className="w-6 h-6"
						aria-hidden="true"
						fill="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<motion.path
							variants={{
								normal: {
									x: 0,
									y: 0,
									transition: {
										ease: 'anticipate',
										duration: 0.1,
									},
								},
								hover: {
									x: 3,
									y: -3,
									transition: {
										ease: 'anticipate',
										duration: 0.25,
									},
								},
							}}
							d="M14 4c0 .55.45 1 1 1h2.59l-9.13 9.13a.996.996 0 1 0 1.41 1.41L19 6.41V9c0 .55.45 1 1 1s1-.45 1-1V4c0-.55-.45-1-1-1h-5c-.55 0-1 .45-1 1z"
						/>
						<path d="M18 19H6c-.55 0-1-.45-1-1V6c0-.55.45-1 1-1h5c.55 0 1-.45 1-1s-.45-1-1-1H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-6c0-.55-.45-1-1-1s-1 .45-1 1v5c0 .55-.45 1-1 1z" />
					</svg>
				</motion.a>
			</div>
		</article>
	);
}
