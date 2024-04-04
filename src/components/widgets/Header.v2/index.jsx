import { useState } from 'react';
import { useScroll } from '@hooks/useScroll';
import { Icon } from '@iconify/react';
import Logo from './Logo';
import HeaderItem from './HeaderItem';
import Button from '@common/Button';

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
				<nav className="h-full">
					<ul className="flex h-full text-right font-bold">
						<HeaderItem href="/#about" text="About Me" aria="About Me" hoverBgColor="red" />
						<HeaderItem href="/#experience" text="Experience" aria="Work Experience" hoverBgColor="lime" />
						<HeaderItem href="/#projects" text="Projects" aria="My Projects" hoverBgColor="blue" />
						<HeaderItem href="/#contact" text="Contact" aria="Contact Me" hoverBgColor="#fd3" />
						<li className="h-full border-l-2 border-black pl-8 flex place-items-center">
							<ResumeButton />
						</li>
					</ul>
				</nav>
			</div>
		</header>
	);
}

function ResumeButton() {
	return (
		<Button bgColor="#7fd6c2">
			<span>Resume</span>
			<Icon icon="ic:arrow-forward" />
		</Button>
	);
}
