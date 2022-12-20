import type { ProjectProps } from '@atoms/ProjectShowcase';

type Props = {
	idx: number;
	project: ProjectProps;
};

export default function ProjectFeatured({ idx, project }: Props) {
	return (
		<article className={`w-full flex gap-4 ${idx % 2 == 0 ? 'flex-row' : 'flex-row-reverse'}`}>
			<div className="grow bg-wm-accent rounded-md overflow-hidden w-lg">
				<img
					src={project.cover}
					className="w-full h-full aspect-[16/9] flex justify-center items-center"
					alt="Project Cover"
				/>
			</div>
			<div className=" flex flex-col items-end">
				<p className="font-mono text-wm-accent">Featured Project</p>
				<h2 className='whitespace-pre-wrap'>{project.title}</h2>
				<p>{project.description}</p>
			</div>
		</article>
	);
}
