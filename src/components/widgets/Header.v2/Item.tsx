type Props = {
	href: string;
	icon: JSX.Element;
	text: string;
	aria: string;
	target?: React.HTMLAttributeAnchorTarget;
};

export default function HeaderItem({ href, icon, text, aria, target = '_self' }: Props) {
	return (
		<li className="relative transition-all duration-200 h-full px-4 border-l-2 border-black">
			<a className='h-full flex place-items-center' href={href} aria-label={aria} target={target}>
				{icon && (
					<span className="inline-flex align-middle sm:align-top sm:mr-1">
						<div className="w-6 h-6">{icon}</div>
					</span>
				)}

				<span className="inline-flex">{text}</span>
			</a>
		</li>
	);
}
