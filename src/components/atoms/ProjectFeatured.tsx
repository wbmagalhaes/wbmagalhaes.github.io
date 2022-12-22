import { OpenProjectButton } from '@atoms/OpenProjectButton';
import type { ProjectProps } from '@atoms/ProjectShowcase';

type Props = {
	idx: number;
	project: ProjectProps;
};

export default function ProjectFeatured({ idx, project }: Props) {
	const aria = `Abrir ${project.title}`;

	return (
		<article className={`w-full flex gap-4 ${idx % 2 == 0 ? 'flex-row' : 'flex-row-reverse'}`}>
			<a
				href={project.url}
				aria-label={aria}
				className="max-w-lg h-auto grid place-items-center overflow-hidden bg-wm-oxygen rounded-md overflow-hidden"
			>
				<img
					src={project.cover}
					className="w-full h-full flex place-items-center object-cover hover:scale-125 transition-all duration-500"
					alt="Project Cover"
				/>
			</a>
			<div className={`grow flex flex-col ${idx % 2 == 0 ? 'items-end text-right' : 'items-start text-left'}`}>
				<p className="font-mono text-wm-oxygen">Featured Project</p>

				<div className="flex items-center gap-2 mb-2">
					<h2 className="whitespace-nowrap">
						<a href={project.url} aria-label={aria}>
							{project.title}
						</a>
					</h2>
					<OpenProjectButton url={project.url ?? '#'} aria={aria} />
				</div>

				<p>{project.description}</p>
			</div>
		</article>
	);
}
