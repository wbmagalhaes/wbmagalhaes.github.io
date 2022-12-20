import { motion, useAnimationControls } from 'framer-motion';
import { useAnimationOnStart } from '@core/useAnimationOnStart';

import HUD from './HUD';

export function HudAnim() {
	const controls = useAnimationControls();
	useAnimationOnStart(controls, 'show');

	return (
		<div className="canvas-holder relative bg-gradient-to-b from-wm-carbon-900 to-wm-carbon-700 grid place-items-center">
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
				className="absolute left-4 bottom-4 w-8 h-8 md:w-12 md:h-12 bg-wm-oxygen-600 hover:bg-wm-oxygen-400 rounded-full p-2 text-wm-hydrogen shadow-md"
				onClick={async () => {
					await controls.start('hidden');
					await controls.start('show');
				}}
			>
				<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" viewBox="0 0 48 48">
					<g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4">
						<path d="M11.2721 36.7279C14.5294 39.9853 19.0294 42 24 42C33.9411 42 42 33.9411 42 24C42 14.0589 33.9411 6 24 6C19.0294 6 14.5294 8.01472 11.2721 11.2721C9.6141 12.9301 6 17 6 17" />
						<path d="M6 9V17H14" />
					</g>
				</svg>
			</motion.button>
		</div>
	);
}
