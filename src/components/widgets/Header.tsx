import { useState } from 'react';
import { useScroll } from '@core/useScroll';
import HeaderItem from '@atoms/HeaderItem';

export default function Header() {
	const [visible, setVisible] = useState(true);
	useScroll(() => {
		if (visible && document.documentElement.scrollTop > 250) {
			setVisible(false);
		} else if (!visible && document.documentElement.scrollTop < 200) {
			setVisible(true);
		}
	});

	return (
		<header
			className={`fixed top-0 z-40 w-full shadow-md backdrop-blur  ${
				visible ? 'h-24' : 'h-12'
			} transition-all duration-500`}
		>
			<div className="flex items-center justify-between h-full lg:max-w-6xl lg:mx-auto px-4 sm:px-6 font-mono mx-auto">
				<a href="/#" className="text-2xl font-extrabold text-wm-platinum whitespace-nowrap">
					William <span className="hidden sm:inline">Magalhães</span>
				</a>
				<nav>
					<ul className="flex gap-0">
						<li>
							<HeaderItem href="/#about" text="About" icon="ci:info-circle-outline" />
						</li>
						<li>
							<HeaderItem href="/#experience" text="Experience" icon="ic:round-work-outline" />
						</li>
						<li>
							<HeaderItem href="/#projects" text="Projects" icon="ci:list-checklist-alt" />
						</li>
						<li>
							<HeaderItem href="/#contact" text="Contact" icon="ic:round-chat-bubble-outline" />
						</li>
					</ul>
				</nav>
			</div>
		</header>
	);
}
