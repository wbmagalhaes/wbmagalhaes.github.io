import ProjectFeatured from '@atoms/ProjectFeatured';
import ProjectCard from '@atoms/ProjectCard';

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

export default function ProjectShowcase({ featured, other }: ProjectListProps) {
	return (
		<>
			<div className="flex flex-col gap-8 py-4 mb-24">
				{featured.map((project, i) => (
					<ProjectFeatured key={i} idx={i} project={project} />
				))}
			</div>
			<div className="flex flex-col gap-4 py-4">
				<h2 className="mb-8 text-center">Other projects</h2>
				<div className="grid grid-cols-3 gap-8">
					{other.map((project, i) => (
						<ProjectCard key={i} project={project} />
					))}
				</div>
				<button className='bg-wm-oxygen text-wm-hydrogen px-4 py-2 rounded-full mx-auto'>See More</button>
			</div>
		</>
	);
}
