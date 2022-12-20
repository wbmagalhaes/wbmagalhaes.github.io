import ProjectFeatured from '@atoms/ProjectFeatured';
import ProjectCard from '@atoms/ProjectCard';

export type ProjectProps = {
	url?: string;
	cover?: string;
	title?: string;
	description?: string;
	tags?: [string];
	date?: string;
};

type ProjectListProps = {
	featured: ProjectProps[];
	other: ProjectProps[];
};

export default function ProjectShowcase({ featured, other }: ProjectListProps) {
	return (
		<>
			<div>
				{featured.map((project) => (
					<ProjectFeatured key={project.title} project={project} />
				))}
			</div>
			<div>
				{other.map((project) => (
					<ProjectCard key={project.title} project={project} />
				))}
			</div>
		</>
	);
}
