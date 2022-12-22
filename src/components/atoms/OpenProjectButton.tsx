export function OpenProjectButton({ url, aria }: { url: string; aria: string }) {
	return (
		<a
			href={url}
			aria-label={aria}
			className="flex gap-2
					ml-auto items-center
					text-sm font-medium text-wm-oxygen hover:text-wm-oxygen-200"
		>
			<svg
				className="w-6 h-6"
				aria-hidden="true"
				fill="currentColor"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path d="M14 4c0 .55.45 1 1 1h2.59l-9.13 9.13a.996.996 0 1 0 1.41 1.41L19 6.41V9c0 .55.45 1 1 1s1-.45 1-1V4c0-.55-.45-1-1-1h-5c-.55 0-1 .45-1 1z" />
				<path d="M18 19H6c-.55 0-1-.45-1-1V6c0-.55.45-1 1-1h5c.55 0 1-.45 1-1s-.45-1-1-1H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-6c0-.55-.45-1-1-1s-1 .45-1 1v5c0 .55-.45 1-1 1z" />
			</svg>
		</a>
	);
}
