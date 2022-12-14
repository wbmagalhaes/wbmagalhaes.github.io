import { useState } from 'react';
import { motion } from 'framer-motion';
import { useScroll } from '@core/useScroll';

const variants = {
	hidden: {
		scale: 0,
		opacity: 0,
		transitionEnd: {
			display: 'none',
		},
		transition: {
			ease: 'circOut',
		},
	},
	show: {
		display: 'block',
		scale: 1,
		opacity: 1,
		transition: {
			scale: {
				type: 'spring',
				duration: 0.4,
			},
			opacity: {
				ease: 'circOut',
			},
		},
	},
};

export default function ToTopButton() {
	const [visible, setVisible] = useState(false);
	useScroll((y) => setVisible(y > 400));

	return (
		<motion.button
			whileHover={{ scale: 1.1 }}
			whileTap={{ scale: 0.9 }}
			variants={variants}
			initial="hidden"
			animate={visible ? 'show' : 'hidden'}
			className="fixed bottom-5 right-5 sm:bottom-12 sm:right-12 lg:bottom-20 lg:right-20 w-12 h-12 md:w-14 md:h-14 z-[100] mt-[100vh] p-2 rounded-full shadow-md bg-wm-accent-600 text-wm-platinum hover:bg-wm-accent-400"
			onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
		>
			<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
				<path
					fill="currentColor"
					d="M8.12 14.71L12 10.83l3.88 3.88a.996.996 0 1 0 1.41-1.41L12.7 8.71a.996.996 0 0 0-1.41 0L6.7 13.3a.996.996 0 0 0 0 1.41c.39.38 1.03.39 1.42 0z"
				/>
			</svg>
		</motion.button>
	);
}
