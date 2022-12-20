import type { ProjectProps } from '@atoms/ProjectShowcase';

type Props = {
	idx: number;
	project: ProjectProps;
};

export default function ProjectFeatured({ idx, project }: Props) {
	return (
		<article className={`w-full flex gap-4 ${idx % 2 == 0 ? 'flex-row' : 'flex-row-reverse'}`}>
			<a
				href={project.url}
				className="h-64 aspect-[16/9] grid place-items-center overflow-hidden grow bg-wm-oxygen rounded-md overflow-hidden"
			>
				<img
					src={project.cover}
					className="min-w-full min-h-full flex place-items-center object-cover"
					alt="Project Cover"
				/>
			</a>
			<div className={`grow flex flex-col ${idx % 2 == 0 ? 'items-end' : 'items-start'}`}>
				<p className="font-mono text-wm-oxygen">Featured Project</p>
				<h2 className="whitespace-pre-wrap">
					<a href={project.url}>{project.title}</a>
				</h2>
				<p>{project.description}</p>
			</div>
		</article>
	);
}
