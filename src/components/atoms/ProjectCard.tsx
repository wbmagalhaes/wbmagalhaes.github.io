import { motion } from 'framer-motion';

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
		<article className="w-full max-w-sm flex flex-col bg-wm-platinum-300 rounded-lg shadow-xl text-left overflow-hidden border border-wm-platinum-600">
			<a href={url} className="w-full h-48 grid place-items-center overflow-hidden">
				<img src={cover} className="min-w-full min-h-full object-cover bg-wm-carbon-100" alt="Imagem de Capa" />
			</a>

			<div className="flex-grow p-5">
				<h2 className="mb-2 font-bold tracking-tight">
					<a href={url}>{title}</a>
				</h2>
				<p className="font-normal">{description}</p>
			</div>

			<div className="relative px-5 py-1 md:py-2 flex flex-row flex-wrap mt-auto gap-1 md:gap-2">
				<div className="absolute top-0 left-0 w-full h-full border-y border-dashed border-wm-secondary-200 sides-fade"></div>
				{tags?.map((tag, i) => (
					<span
						key={i}
						className="inline-block z-10 bg-wm-secondary-200 rounded-full px-3 py-1 text-xs font-semibold"
					>
						{tag}
					</span>
				))}
			</div>

			<div className="flex flex-row p-2 pl-5 md:p-5">
				<span className="inline-flex items-center text-xs">
					{new Date(date ?? '').toLocaleDateString('pt-BR', {
						timeZone: 'UTC',
						year: 'numeric',
						month: 'short',
						day: '2-digit',
					})}
				</span>
				<motion.a
					initial="normal"
					whileHover="hover"
					href={url}
					className="flex gap-2
					ml-auto items-center
					text-sm font-medium text-wm-accent hover:text-wm-accent-800"
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
