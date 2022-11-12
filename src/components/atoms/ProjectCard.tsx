interface Props {
	url?: string;
	cover?: string;
	title?: string;
	description?: string;
	tags?: [string];
	date?: string;
}

export default function ProjectCard({ url, cover, title, description, tags, date }: Props) {
	return (
		<article className="max-w-xs flex flex-col bg-wm-secondary rounded-lg shadow-xl overflow-hidden">
			<a href={url}>{cover}</a>

			<div className="p-5 flex-grow">
				<h1 className="mb-2 text-2xl font-bold tracking-tight text-wm-coal-900">
					<a href={url}>{title}</a>
				</h1>
				<p className="font-normal text-wm-coal-700">{description}</p>
			</div>

			<div className="mx-5 py-2 flex flex-row flex-wrap mt-auto gap-2 border-y border-dashed border-wm-coal-200">
				{tags?.map((tag, i) => (
					<span
						key={i}
						className="inline-block bg-wm-coal-100 rounded-full px-3 py-1 text-xs font-semibold text-wm-coal-400"
					>
						{tag}
					</span>
				))}
			</div>

			<div className="p-5 flex flex-row">
				<span className="inline-flex items-center text-xs">
					{new Date(date ?? '').toLocaleDateString('pt-BR', {
						year: 'numeric',
						month: 'short',
						day: '2-digit',
					})}
				</span>
				<a
					href={url}
					className="inline-flex
					ml-auto items-center py-1.5 px-3 rounded-lg
					text-sm font-medium text-center text-white
					bg-gradient-to-r from-wm-primary-300 to-wm-primary-400 hover:from-wm-primary-500 hover:to-wm-primary-600"
				>
					Abrir
					<svg
						className="ml-2 -mr-1 w-4 h-4"
						aria-hidden="true"
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							fillRule="evenodd"
							d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
							clipRule="evenodd"
						></path>
					</svg>
				</a>
			</div>
		</article>
	);
}
