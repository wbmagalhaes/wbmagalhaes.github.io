import { motion } from 'framer-motion';
import { fadeIn, fillPath, fillPathMiddle } from './animations';

function Arcs() {
	return (
		<g className="fill-none stroke-2 stroke-[#ae00ff]">
			<motion.path
				variants={fillPathMiddle}
				custom={{ delay: 0, duration: 1 }}
				d="M844.61,60.62a478.6,478.6,0,0,1,22.84,638.72"
			/>
			<motion.path
				variants={fillPathMiddle}
				custom={{ delay: 0, duration: 1 }}
				d="M129.92,697.94a479.15,479.15,0,0,1,22.77-636"
			/>
			<motion.path
				variants={fillPathMiddle}
				custom={{ delay: 0, duration: 1 }}
				d="M874.37,150.91a446.69,446.69,0,0,1,12.74,462.68"
			/>
			<motion.path
				variants={fillPathMiddle}
				custom={{ delay: 0, duration: 1 }}
				d="M111.39,613.52a446.68,446.68,0,0,1,12.18-461.67"
			/>

			<motion.g variants={fadeIn} custom={1}>
				<circle className="stroke-none fill-[#ae00ff]" cx="54.98" cy="430.21" r="4.4" />
				<circle className="stroke-none fill-[#ae00ff]" cx="917.53" cy="240.7" r="4.4" />
			</motion.g>
		</g>
	);
}

function MainBorder() {
	return (
		<g className="fill-none stroke-2 stroke-[#76ff76]">
			<motion.path
				variants={fillPath}
				custom={{ delay: 1.35, duration: 1.25 }}
				d="M55,430.22H45.57l-.06-.67c-1.17-13.32-.76-25.89-.76-39.33a453.67,453.67,0,0,1,76.16-252.35l.22-.33h288a5.32,5.32,0,0,1,5,3.4,90.93,90.93,0,0,0,170.26,0,5.31,5.31,0,0,1,4.95-3.4H875.75l.22.33a484.59,484.59,0,0,1,33.78,58.87"
			/>
			<motion.path
				variants={fillPath}
				custom={{ delay: 1.35, duration: 1.25 }}
				d="M917.53,241.08h11l.17.49a447.47,447.47,0,0,1,25.22,148.65A453.81,453.81,0,0,1,888.6,625.08l-.22.36H108.66l-.22-.36A450.34,450.34,0,0,1,50.19,470.51"
			/>
		</g>
	);
}

function BottomBorder() {
	return (
		<g className="stroke-[#ae00ff]">
			<motion.path
				variants={fillPath}
				custom={{ delay: 2.75, duration: 0.5 }}
				className="purple stroke"
				d="M86.74,561.67H252.18"
			/>
			<motion.path
				variants={fillPathMiddle}
				custom={{ delay: 2.75, duration: 0.5 }}
				className="stroke-[#76ff76]"
				d="M691.09,561.67H307.45"
			/>
			<motion.path
				variants={fillPath}
				custom={{ delay: 2.75, duration: 0.5 }}
				className="purple stroke"
				d="M911.85,561.67H746.41"
			/>
		</g>
	);
}

export default function Border() {
	return (
		<>
			<MainBorder />
			<Arcs />
			<BottomBorder />
		</>
	);
}
