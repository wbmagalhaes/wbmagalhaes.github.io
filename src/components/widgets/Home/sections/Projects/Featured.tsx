import OpenButton from './OpenButton';
import type { Project } from 'types/project';

type Props = {
	idx: number;
	project: Project;
};

export default function Featured({ idx, project }: Props) {
	const aria = `Abrir ${project.title}`;

	return (
		<article
			className={`w-full flex flex-col place-items-center sm:place-items-start gap-4 ${
				idx % 2 == 0 ? 'sm:flex-row-reverse' : 'sm:flex-row'
			}`}
		>
			<div className={`grow flex flex-col ${idx % 2 == 0 ? 'sm:items-start sm:text-left' : 'sm:items-end sm:text-right'}`}>
				<p className="font-mono text-wm-oxygen">Featured</p>

				<div className="flex items-center gap-2 mb-2 mr-auto sm:mr-0">
					<h2 className="whitespace-nowrap">
						<a href={project.url} aria-label={aria}>
							{project.title}
						</a>
					</h2>
					<OpenButton url={project.url ?? '#'} aria={aria} />
				</div>

				<p>{project.description}</p>
			</div>
			<a
				href={project.url}
				aria-label={aria}
				className="max-w-lg h-auto grid place-items-center overflow-hidden bg-wm-oxygen rounded-md"
			>
				<img
					src={project.cover}
					className="w-full h-full flex place-items-center object-cover hover:scale-125 transition-all duration-500"
					alt="Project Cover"
				/>
			</a>
		</article>
	);
}
