import { motion, useAnimationControls } from 'framer-motion';
import { useEffect } from 'react';
import HUD from './HUD';

export function HudAnim() {
	const controls = useAnimationControls();

	async function restartAnimation() {
		await controls.start('hidden');
		await controls.start('show');
	}

	useEffect(() => {
		controls.start('show');
	}, []);

	return (
		<div className="container">
			<div className="relative canvas-holder bg-gradient-to-b from-indigo-900 to-violet-800 grid place-items-center">
				<motion.svg
					initial="hidden"
					animate={controls}
					className="max-w-[90%] max-h-[90%]"
					viewBox="0 0 1197.4 699.66"
					strokeLinecap="round"
				>
					<g transform="translate(100, 0)">
						<HUD.Top />
						<HUD.Border />
						<HUD.Grad />
						<HUD.Arrows />
						<HUD.Map />
						<HUD.Bottom />
					</g>
				</motion.svg>

				<motion.button
					whileHover={{
						scale: 1.2,
						rotate: 30,
					}}
					whileTap={{
						scale: 0.8,
						rotate: -360,
					}}
					className="absolute left-4 bottom-4 w-8 h-8 md:w-12 md:h-12 bg-indigo-900 rounded-full p-2 text-white shadow-md"
					onClick={restartAnimation}
				>
					<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" viewBox="0 0 48 48">
						<g
							fill="none"
							stroke="currentColor"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="4"
						>
							<path d="M11.2721 36.7279C14.5294 39.9853 19.0294 42 24 42C33.9411 42 42 33.9411 42 24C42 14.0589 33.9411 6 24 6C19.0294 6 14.5294 8.01472 11.2721 11.2721C9.6141 12.9301 6 17 6 17" />
							<path d="M6 9V17H14" />
						</g>
					</svg>
				</motion.button>
			</div>
		</div>
	);
}
