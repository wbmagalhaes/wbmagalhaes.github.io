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
				<motion.g variants={groupVariants}>
					<path d="M 96 0 L 0 0 L 0 40 l 96 0 l 16.5 -20 z" />
					<text x="50" y="20" fill="black" textAnchor="middle" dominantBaseline="central" stroke="none">
						Resume
					</text>
				</motion.g>

				<motion.path
					variants={pathVariants1}
					d="M 118 0 l -12 0 l 16.5 20 l -16.5 20 l 12 0 l 16.5 -20 z"
				></motion.path>
				<motion.path
					variants={pathVariants2}
					d="M 142 0 l -12 0 l 16.5 20 l -16.5 20 l 12 0 l 16.5 -20 z"
				></motion.path>
				<motion.path
					variants={pathVariants3}
					d="M 166 0 l -12 0 l 16.5 20 l -16.5 20 l 12 0 l 16.5 -20 z"
				></motion.path>
			</svg>
		</motion.button>
	);
}

const groupVariants: Variants = {
	initial: {
		transform: 'translate(0px, 0px)',
		transition: {
			ease: 'backInOut',
		},
	},
	hover: {
		transform: 'translate(4px, 0px)',
		transition: {
			ease: 'easeIn',
			repeat: Infinity,
			repeatType: 'reverse',
		},
	},
};

const pathVariants1: Variants = {
	initial: {
		transform: 'translate(0px, 0px)',
		transition: {
			ease: 'backInOut',
		},
	},
	hover: {
		transform: 'translate(6px, 0px)',
		transition: {
			ease: 'easeIn',
			repeat: Infinity,
			repeatType: 'reverse',
		},
	},
};

const pathVariants2: Variants = {
	initial: {
		transform: 'translate(0px, 0px)',
		transition: {
			ease: 'backInOut',
		},
	},
	hover: {
		transform: 'translate(10px, 0px)',
		transition: {
			ease: 'easeIn',
			repeat: Infinity,
			repeatType: 'reverse',
		},
	},
};

const pathVariants3: Variants = {
	initial: {
		transform: 'translate(0px, 0px)',
		transition: {
			ease: 'backInOut',
		},
	},
	hover: {
		transform: 'translate(16px, 0px)',
		transition: {
			ease: 'easeIn',
			repeat: Infinity,
			repeatType: 'reverse',
		},
	},
};
