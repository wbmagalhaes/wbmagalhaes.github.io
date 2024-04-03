import { useState } from 'react';
import { useScroll } from '@hooks/useScroll';
import Logo from './Logo';
import Item from './Item';

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
			className={`fixed top-0 z-40 bg-gray-100 border-b-2 border-black w-full transition-all duration-500 ${
				visible ? 'h-32' : 'h-16'
			}`}
		>
			<div className="flex items-center justify-between h-full px-4 md:px-0 mx-0 sm:mx-8 md:mx-24 lg:mx-32 xl:mx-64 transition-all duration-300">
				<a href="/#" aria-label="home">
					<Logo />
				</a>
				<nav class="h-full">
					<ul className="flex h-full text-right font-mono border-r-2 border-black">
						<Item href="/#about" text="About Me" aria="About Me" />
						<Item href="/#experience" text="Experience" aria="Work Experience" />
						<Item href="/#projects" text="Projects" aria="My Projects" />
						<Item href="/#contact" text="Contact" aria="Contact Me" />
						<Item href="/resume.pdf" text="Resume" aria="Resume" target="_blank" />
					</ul>
				</nav>
			</div>
		</header>
	);
}
