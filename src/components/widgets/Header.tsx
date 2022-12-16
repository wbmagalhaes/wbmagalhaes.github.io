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
			className={`fixed top-0 z-40 w-full backdrop-blur ${visible ? 'h-24' : 'h-12'} transition-all duration-500`}
		>
			<div className="flex items-center justify-between h-full mx-0 px-4 sm:mx-24 sm:px-8 font-mono">
				<a href="/#">
					<Logo />
				</a>
				<nav>
					<ul slot="nav" className="flex gap-4 lg:gap-0 text-right">
						<HeaderItem href="/#about" text="About" icon={<Icons.About className="text-wm-accent" />} />
						<HeaderItem
							href="/#experience"
							text="Experience"
							icon={<Icons.Experience className="text-wm-accent" />}
						/>
						<HeaderItem
							href="/#projects"
							text="Projects"
							icon={<Icons.Projects className="text-wm-accent" />}
						/>
						<HeaderItem
							href="/#contact"
							text="Contact"
							icon={<Icons.Contact className="text-wm-accent" />}
						/>
						<HeaderItem href="/#" text="Resume" icon={<Icons.Resume className="text-wm-accent" />} />
					</ul>
				</nav>
			</div>
		</header>
	);
}
