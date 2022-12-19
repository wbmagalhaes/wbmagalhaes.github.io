import { useState } from 'react';
import { useScroll } from '@core/useScroll';
import HeaderItem from '@atoms/HeaderItem';
import Icons from '@atoms/HeaderIcons';
import Logo from '@atoms/Logo';

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
			className={`fixed top-0 z-40 w-full backdrop-blur ${visible ? 'h-32' : 'h-16'} transition-all duration-500`}
		>
			<div className="flex items-center justify-between h-full px-4 md:px-8 mx-0 sm:mx-8 md:mx-24 lg:mx-32 xl:mx-64 transition-all duration-300">
				<a href="/#" aria-label="home">
					<Logo />
				</a>
				<nav>
					<ul slot="nav" className="flex gap-4 lg:gap-0 text-right font-mono">
						<HeaderItem
							href="/#about"
							text="About"
							icon={<Icons.About className="lg:text-wm-accent hover:text-wm-accent" />}
							aria="About Me"
						/>
						<HeaderItem
							href="/#experience"
							text="Experience"
							icon={<Icons.Experience className="lg:text-wm-accent hover:text-wm-accent" />}
							aria="Work Experience"
						/>
						<HeaderItem
							href="/#projects"
							text="Projects"
							icon={<Icons.Projects className="lg:text-wm-accent hover:text-wm-accent" />}
							aria="My Projects"
						/>
						<HeaderItem
							href="/#contact"
							text="Contact"
							icon={<Icons.Contact className="lg:text-wm-accent hover:text-wm-accent" />}
							aria="Contact Me"
						/>
						<HeaderItem
							href="/#"
							text="Resume"
							icon={<Icons.Resume className="lg:text-wm-accent hover:text-wm-accent" />}
							aria="Resume"
						/>
					</ul>
				</nav>
			</div>
		</header>
	);
}
