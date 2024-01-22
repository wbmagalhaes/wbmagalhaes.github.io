import { useState } from 'react';
import { useScroll } from '@hooks/useScroll';
import Item from './Item';
import Icons from './Icons';
import Logo from './Logo';

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
			className={`fixed top-0 z-40 w-full backdrop-blur ${visible ? 'h-32' : 'h-16'} bg-wm-carbon-900 transition-all duration-500`}
		>
			<div className="flex items-center justify-between h-full px-4 md:px-0 mx-0 sm:mx-8 md:mx-24 lg:mx-32 xl:mx-64 transition-all duration-300">
				<a href="/#" aria-label="home">
					<Logo />
				</a>
				<nav>
					<ul className="flex gap-4 text-right font-mono">
						<Item
							href="/#about"
							text="About Me"
							icon={<Icons.About className="lg:text-wm-oxygen hover:text-wm-oxygen" />}
							aria="About Me"
						/>
						<Item
							href="/#experience"
							text="Experience"
							icon={<Icons.Experience className="lg:text-wm-oxygen hover:text-wm-oxygen" />}
							aria="Work Experience"
						/>
						<Item
							href="/#projects"
							text="Projects"
							icon={<Icons.Projects className="lg:text-wm-oxygen hover:text-wm-oxygen" />}
							aria="My Projects"
						/>
						<Item
							href="/#contact"
							text="Contact"
							icon={<Icons.Contact className="lg:text-wm-oxygen hover:text-wm-oxygen" />}
							aria="Contact Me"
						/>
						<Item
							href="/resume.pdf"
							text="Resume"
							icon={<Icons.Resume className="lg:text-wm-oxygen hover:text-wm-oxygen" />}
							aria="Resume"
							target="_blank"
						/>
					</ul>
				</nav>
			</div>
		</header>
	);
}
