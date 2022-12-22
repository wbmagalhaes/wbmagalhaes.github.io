import { OpenProjectButton } from '@atoms/OpenProjectButton';
import type { ProjectProps } from '@atoms/ProjectShowcase';

interface Props {
	project: ProjectProps;
	noCover?: boolean;
}

export default function ProjectCard({ project, noCover = false }: Props) {
	const aria = `Abrir ${project.title}`;

	return (
		<article className="w-full max-w-sm flex flex-col bg-wm-carbon-300 rounded text-left overflow-hidden hover:-translate-y-1 transition-all duration-200 hover:shadow hover:shadow-wm-oxygen-900 ">
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
					{noCover && <OpenProjectButton url={project.url ?? '#'} aria={aria} />}
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
				{!noCover && <OpenProjectButton url={project.url ?? '#'} aria={aria} />}
			</div>
		</article>
	);
}
