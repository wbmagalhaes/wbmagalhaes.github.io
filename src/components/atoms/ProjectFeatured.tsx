import type { ProjectProps } from '@atoms/ProjectShowcase';

type Props = {
	project: ProjectProps;
};

export default function ProjectFeatured({ project }: Props) {
	return <article>{project.title}</article>;
}
