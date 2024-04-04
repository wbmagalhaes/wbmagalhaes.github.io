import { useState } from 'react';
import { useScroll } from '@hooks/useScroll';
import { motion, type Variants, stagger } from 'framer-motion';

import Logo from './Logo';
import HeaderItem from './HeaderItem';

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
						<li className="h-full border-l-2 border-black pl-6 flex place-items-center">
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
		<motion.button className="text-black font-semibold" initial="initial" whileHover="hover">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				className="hard-shadow-4"
				width="206"
				height="46"
				viewBox="-3 -3 206 46"
				fill="red"
				stroke="black"
				strokeWidth="3"
				strokeLinejoin="round"
			>
				<motion.path variants={obj1Variants} d="M 20 0 l -12 0 l 0 40 l 12 0 Z"></motion.path>

				<motion.g variants={obj2Variants}>
					<path d="M 118 0 L 30 0 L 30 40 l 88 0 l 16.5 -20 Z" />
					<text x="78" y="20" fill="black" textAnchor="middle" dominantBaseline="central" stroke="none">
						Resume
					</text>
				</motion.g>

				<motion.path
					variants={obj3Variants}
					d="M 144 0 l -12 0 l 16.5 20 l -16.5 20 l 12 0 l 16.5 -20 Z"
				></motion.path>
				<motion.path
					variants={obj4Variants}
					d="M 170 0 l -12 0 l 16.5 20 l -16.5 20 l 12 0 l 16.5 -20 Z"
				></motion.path>
			</svg>
		</motion.button>
	);
}

const obj1Variants: Variants = {
	initial: {
		transform: 'translate(0px, 0px)',
		transition: {
			ease: 'backInOut',
		},
	},
	hover: {
		transform: 'translate(-2px, 0px)',
		transition: {
			ease: 'easeInOut',
		},
	},
};

const obj2Variants: Variants = {
	initial: {
		transform: 'translate(0px, 0px)',
		transition: {
			ease: 'backInOut',
		},
	},
	hover: {
		transform: 'translate(4px, 0px)',
		transition: {
			ease: 'easeInOut',
		},
	},
};

const obj3Variants: Variants = {
	initial: {
		transform: 'translate(0px, 0px)',
		transition: {
			ease: 'backInOut',
		},
	},
	hover: {
		transform: 'translate(10px, 0px)',
		transition: {
			ease: 'easeInOut',
		},
	},
};

const obj4Variants: Variants = {
	initial: {
		transform: 'translate(0px, 0px)',
		transition: {
			ease: 'backInOut',
		},
	},
	hover: {
		transform: 'translate(16px, 0px)',
		transition: {
			ease: 'easeInOut',
		},
	},
};
