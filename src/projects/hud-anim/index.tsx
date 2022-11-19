import { motion } from 'framer-motion';
import HUD from './HUD';

export function HudAnim() {
	return (
		<div className="container">
			<div className="canvas-holder bg-indigo-900 grid place-items-center">
				<motion.svg
					initial="hidden"
					animate="show"
					className="max-w-[90%] max-h-[90%]"
					viewBox="0 0 997.4 699.66"
					strokeLinecap="round"
				>
					<HUD.Top />
					<HUD.Border />
					<HUD.Grad />
					<HUD.Arrows />
					<HUD.Map />
					<HUD.Bottom />
				</motion.svg>
			</div>
		</div>
	);
}
