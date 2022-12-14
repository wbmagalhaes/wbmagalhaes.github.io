import { useState } from 'react';
import { useScroll } from '@core/useScroll';
import HeaderItem from '@atoms/HeaderItem';

export default function Header() {
	const [visible, setVisible] = useState(true);
	useScroll((y) => {
		if (visible && y > 150) {
			setVisible(false);
		} else if (!visible && y < 100) {
			setVisible(true);
		}
	});

	return (
		<header
			className={`fixed top-0 z-40 w-full shadow-md backdrop-blur ${
				visible ? 'h-24' : 'h-12'
			} transition-all duration-500`}
		>
			<div className="flex items-center justify-between h-full mx-0 px-4 sm:mx-24 sm:px-8 font-mono">
				<a href="/#" className="text-2xl font-extrabold text-wm-platinum whitespace-nowrap">
					William <span className="hidden xl:inline">Magalhães</span>
				</a>
				<nav>
					<ul className="flex gap-4 lg:gap-0 text-right">
						<HeaderItem href="/#about" text="About" icon="ci:info-circle-outline" />
						<HeaderItem href="/#experience" text="Experience" icon="ic:round-work-outline" />
						<HeaderItem href="/#projects" text="Projects" icon="akar-icons:grid" />
						<HeaderItem href="/#contact" text="Contact" icon="ic:round-chat-bubble-outline" />
						<HeaderItem href="/#" text="Resume" icon="mdi:file-document-outline" />
					</ul>
				</nav>
			</div>
		</header>
	);
}
