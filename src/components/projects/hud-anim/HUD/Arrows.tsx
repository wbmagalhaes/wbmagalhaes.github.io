import { motion } from 'framer-motion';
import { fillPath, fadeIn } from './animations';

export default function Arrows() {
	return (
		<>
			<g className="stroke-hud-primary  stroke-2">
				<Paths />
				<Points />
			</g>
		</>
	);
}

function Paths() {
	const delay = 4.5;
	const duration = 0.3;
	return (
		<>
			<motion.path variants={fillPath} custom={{ delay: delay, duration: duration }} d="M121.9,137.71v-48h-16" />
			<motion.path variants={fillPath} custom={{ delay: delay, duration: duration }} d="M87.85,197.09H44.46" />
			<motion.path variants={fillPath} custom={{ delay: delay, duration: duration }} d="M52.61,303.8H16.22" />
			<motion.path variants={fillPath} custom={{ delay: delay, duration: duration }} d="M44.39,410.47H11" />
			<motion.path variants={fillPath} custom={{ delay: delay, duration: duration }} d="M62.39,521.77H26.67" />
			<motion.path variants={fillPath} custom={{ delay: delay, duration: duration }} d="M108.89,625.24v11h-41" />
			<motion.path variants={fillPath} custom={{ delay: delay, duration: duration }} d="M875.5,137.71v-48h16" />
			<motion.path variants={fillPath} custom={{ delay: delay, duration: duration }} d="M909.56,197.09h43.38" />
			<motion.path variants={fillPath} custom={{ delay: delay, duration: duration }} d="M945.79,303.8h35.39" />
			<motion.path variants={fillPath} custom={{ delay: delay, duration: duration }} d="M954,410.47H985.4" />
			<motion.path variants={fillPath} custom={{ delay: delay, duration: duration }} d="M935,521.77h35.73" />
			<motion.path variants={fillPath} custom={{ delay: delay, duration: duration }} d="M888.51,625.24v11h41" />
		</>
	);
}

function Points() {
	const delay = 4.8;
	return (
		<>
			<motion.circle variants={fadeIn} custom={delay} cx="100.9" cy="89.71" r="5.5" />
			<motion.circle variants={fadeIn} custom={delay} cx="39.46" cy="197.09" r="5.5" />
			<motion.circle variants={fadeIn} custom={delay} cx="11.22" cy="303.8" r="5.5" />
			<motion.circle variants={fadeIn} custom={delay} cx="6" cy="410.47" r="5.5" />
			<motion.circle variants={fadeIn} custom={delay} cx="21.67" cy="521.77" r="5.5" />
			<motion.circle variants={fadeIn} custom={delay} cx="62.89" cy="636.24" r="5.5" />
			<motion.circle variants={fadeIn} custom={delay} cx="896.5" cy="89.71" r="5.5" />
			<motion.circle variants={fadeIn} custom={delay} cx="957.94" cy="197.09" r="5.5" />
			<motion.circle variants={fadeIn} custom={delay} cx="986.18" cy="303.8" r="5.5" />
			<motion.circle variants={fadeIn} custom={delay} cx="991.4" cy="410.47" r="5.5" />
			<motion.circle variants={fadeIn} custom={delay} cx="975.74" cy="521.77" r="5.5" />
			<motion.circle variants={fadeIn} custom={delay} cx="934.51" cy="636.24" r="5.5" />
		</>
	);
}
