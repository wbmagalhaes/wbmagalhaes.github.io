import { motion } from 'framer-motion';
import { fillPath, fadeIn, flash } from './animations';

export default function Arrows() {
	return (
		<>
			<g className="stroke-hud-primary  stroke-2">
				<Paths />
				<Points />
				<Buttons size={35} offset={55} />
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

function Buttons({ size, offset }: { size: number; offset: number }) {
	return (
		<>
			<g transform={`translate(-${offset}, 0)`}>
				<Button cx={100.9} cy={89.71} r={size}>
					<svg
						width={size}
						height={size}
						xmlns="http://www.w3.org/2000/svg"
						preserveAspectRatio="xMidYMid meet"
						viewBox="0 0 24 24"
					>
						<path
							className="stroke-none fill-hud-primary"
							d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0l-8 5l-8-5h16zm0 12H4V8l8 5l8-5v10z"
						/>
					</svg>
				</Button>
				<Button cx={39.46} cy={197.09} r={size}>
					<svg
						width={size}
						height={size}
						xmlns="http://www.w3.org/2000/svg"
						preserveAspectRatio="xMidYMid meet"
						viewBox="0 0 24 24"
					>
						<path
							className="stroke-none fill-hud-primary"
							d="M4.05 21q-.45 0-.75-.3t-.3-.75V15.9q0-.35.225-.613q.225-.262.575-.337l3.45-.7q.35-.05.713.062q.362.113.587.338L10.9 17q1.9-1.15 3.488-2.725q1.587-1.575 2.637-3.375L14.6 8.45q-.225-.225-.288-.513q-.062-.287-.012-.637l.65-3.5q.05-.35.325-.575Q15.55 3 15.9 3h4.05q.45 0 .75.3t.3.75q0 3.225-1.438 6.287q-1.437 3.063-3.8 5.425q-2.362 2.363-5.424 3.8Q7.275 21 4.05 21ZM17.975 9q.425-.975.65-1.975q.225-1 .35-2.025H16.75l-.425 2.35Zm-8.95 8.95L7.35 16.275L5 16.75v2.2q1.025-.075 2.038-.325q1.012-.25 1.987-.675ZM17.975 9Zm-8.95 8.95Z"
						/>
					</svg>
				</Button>
				<Button cx={11.22} cy={303.8} r={size}>
					<svg
						width={size}
						height={size}
						xmlns="http://www.w3.org/2000/svg"
						preserveAspectRatio="xMidYMid meet"
						viewBox="0 0 24 24"
					>
						<path
							className="stroke-none fill-hud-primary"
							d="M5 19h14V9.825L14.175 5H5v14Zm0 2q-.825 0-1.413-.587Q3 19.825 3 19V5q0-.825.587-1.413Q4.175 3 5 3h9.175q.4 0 .763.15q.362.15.637.425l4.85 4.85q.275.275.425.637q.15.363.15.763V19q0 .825-.587 1.413Q19.825 21 19 21Zm3-4h8q.425 0 .712-.288Q17 16.425 17 16t-.288-.713Q16.425 15 16 15H8q-.425 0-.713.287Q7 15.575 7 16t.287.712Q7.575 17 8 17Zm0-4h8q.425 0 .712-.288Q17 12.425 17 12t-.288-.713Q16.425 11 16 11H8q-.425 0-.713.287Q7 11.575 7 12t.287.712Q7.575 13 8 13Zm0-4h5q.425 0 .713-.288Q14 8.425 14 8t-.287-.713Q13.425 7 13 7H8q-.425 0-.713.287Q7 7.575 7 8t.287.712Q7.575 9 8 9ZM5 19V5v14Z"
						/>
					</svg>
				</Button>
				<Button cx={6} cy={410.47} r={size}>
					<svg
						width={size}
						height={size}
						xmlns="http://www.w3.org/2000/svg"
						preserveAspectRatio="xMidYMid meet"
						viewBox="0 0 24 24"
					>
						<path
							className="stroke-none fill-hud-primary"
							d="M12 17.5q1.875 0 3.188-1.312Q16.5 14.875 16.5 13q0-1.875-1.312-3.188Q13.875 8.5 12 8.5q-1.875 0-3.188 1.312Q7.5 11.125 7.5 13q0 1.875 1.312 3.188Q10.125 17.5 12 17.5ZM4 21q-.825 0-1.412-.587Q2 19.825 2 19V7q0-.825.588-1.412Q3.175 5 4 5h3.15L8.4 3.65q.275-.325.662-.488Q9.45 3 9.875 3h4.25q.425 0 .813.162q.387.163.662.488L16.85 5H20q.825 0 1.413.588Q22 6.175 22 7v12q0 .825-.587 1.413Q20.825 21 20 21Zm16-2V7H4v12Zm-8-6Z"
						/>
					</svg>
				</Button>
				<Button cx={21.67} cy={521.77} r={size}>
					<svg
						width={size}
						height={size}
						xmlns="http://www.w3.org/2000/svg"
						preserveAspectRatio="xMidYMid meet"
						viewBox="0 0 24 24"
					>
						<g className="stroke-hud-primary fill-none">
							<path d="M17 16c.74-2.286 2.778-3.762 5-3c-.173-2.595.13-5.314-2-7.5c-1.708 2.648-3.358 2.557-5 2.5V4l-3 2l-3-2v4c-1.642.057-3.292.148-5-2.5c-2.13 2.186-1.827 4.905-2 7.5c2.222-.762 4.26.714 5 3c2.593 0 3.889.952 5 4c1.111-3.048 2.407-4 5-4z" />
							<path d="M9 8a3 3 0 0 0 6 0" />
						</g>
					</svg>
				</Button>
				<Button cx={62.89} cy={636.24} r={size}>
					<svg
						width={size}
						height={size}
						xmlns="http://www.w3.org/2000/svg"
						preserveAspectRatio="xMidYMid meet"
						viewBox="0 0 24 24"
					>
						<path
							className="stroke-none fill-hud-primary"
							d="M12 22q-3.35 0-5.675-2.325Q4 17.35 4 14q0-2.825 1.675-5.425q1.675-2.6 4.6-4.55q.55-.375 1.138-.038Q12 4.325 12 5v1.3q0 .85.588 1.425q.587.575 1.437.575q.425 0 .813-.187q.387-.188.687-.538q.2-.25.513-.313q.312-.062.587.138Q18.2 8.525 19.1 10.275q.9 1.75.9 3.725q0 3.35-2.325 5.675Q15.35 22 12 22Zm-6-8q0 1.3.525 2.462q.525 1.163 1.5 2.038Q8 18.375 8 18.275v-.225q0-.8.3-1.5t.875-1.275L12 12.5l2.825 2.775q.575.575.875 1.275q.3.7.3 1.5v.225q0 .1-.025.225q.975-.875 1.5-2.038Q18 15.3 18 14q0-1.25-.462-2.363q-.463-1.112-1.338-1.987q-.5.325-1.05.487q-.55.163-1.125.163q-1.55 0-2.687-1.025Q10.2 8.25 10.025 6.75q-1.95 1.65-2.987 3.512Q6 12.125 6 14Zm6 1.3l-1.425 1.4q-.275.275-.425.625q-.15.35-.15.725q0 .8.588 1.375Q11.175 20 12 20t1.413-.575Q14 18.85 14 18.05q0-.4-.15-.738q-.15-.337-.425-.612Z"
						/>
					</svg>
				</Button>
			</g>

			<g transform={`translate(${offset}, 0)`}>
				<Button cx={896.5} cy={89.71} r={size}>
					<svg
						width={size}
						height={size}
						xmlns="http://www.w3.org/2000/svg"
						preserveAspectRatio="xMidYMid meet"
						viewBox="0 0 24 24"
					>
						<path
							className="stroke-none fill-hud-primary"
							d="M12 9c1.65 0 3 1.35 3 3s-1.35 3-3 3s-3-1.35-3-3s1.35-3 3-3m0-2c-2.76 0-5 2.24-5 5s2.24 5 5 5s5-2.24 5-5s-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58a.996.996 0 0 0-1.41 0a.996.996 0 0 0 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37a.996.996 0 0 0-1.41 0a.996.996 0 0 0 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0a.996.996 0 0 0 0-1.41l-1.06-1.06zm1.06-10.96a.996.996 0 0 0 0-1.41a.996.996 0 0 0-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36a.996.996 0 0 0 0-1.41a.996.996 0 0 0-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"
						/>
					</svg>
				</Button>
				<Button cx={957.94} cy={197.09} r={size}>
					<svg
						width={size}
						height={size}
						xmlns="http://www.w3.org/2000/svg"
						preserveAspectRatio="xMidYMid meet"
						viewBox="0 0 24 24"
					>
						<path
							className="stroke-none fill-hud-primary"
							d="M10.5 4a1.5 1.5 0 0 0-1.47 1.199A1 1 0 1 1 7.07 4.8A3.5 3.5 0 1 1 10.5 9H5a1 1 0 0 1 0-2h5.5a1.5 1.5 0 0 0 0-3Zm8 4a1.5 1.5 0 0 0-1.47 1.199a1 1 0 1 1-1.96-.398A3.5 3.5 0 1 1 18.5 13H3a1 1 0 1 1 0-2h15.5a1.5 1.5 0 0 0 0-3Zm-5.47 10.801A1.5 1.5 0 1 0 14.5 17H8a1 1 0 1 1 0-2h6.5a3.5 3.5 0 1 1-3.43 4.199a1 1 0 1 1 1.96-.398Z"
						/>
					</svg>
				</Button>
				<Button cx={986.18} cy={303.8} r={size}>
					<svg
						width={size}
						height={size}
						xmlns="http://www.w3.org/2000/svg"
						preserveAspectRatio="xMidYMid meet"
						viewBox="0 0 24 24"
					>
						<path
							className="stroke-none fill-hud-primary"
							d="M15 10c0-.55.45-1 1-1s1 .45 1 1s-.45 1-1 1s-1-.45-1-1m7-2.5v6.97l-2.82.94L17.5 21H12v-2h-2v2H4.5S2 12.54 2 9.5S4.46 4 7.5 4h5c.91-1.21 2.36-2 4-2a1.498 1.498 0 0 1 1.38 2.08c-.14.34-.26.73-.32 1.15l2.27 2.27H22m-2 2h-1L15.5 6c0-.65.09-1.29.26-1.91c-.97.25-1.76.97-2.09 1.91H7.5C5.57 6 4 7.57 4 9.5c0 1.88 1.22 6.65 2 9.5h2v-2h6v2h2l1.56-5.15l2.44-.82V9.5Z"
						/>
					</svg>
				</Button>
				<Button cx={991.4} cy={410.47} r={size}>
					<svg
						width={size}
						height={size}
						xmlns="http://www.w3.org/2000/svg"
						preserveAspectRatio="xMidYMid meet"
						viewBox="0 0 24 24"
					>
						<path
							className="stroke-none fill-hud-primary"
							d="M12 11a1 1 0 0 1 1 1a1 1 0 0 1-1 1a1 1 0 0 1-1-1a1 1 0 0 1 1-1M4.22 4.22C5.65 2.79 8.75 3.43 12 5.56c3.25-2.13 6.35-2.77 7.78-1.34c1.43 1.43.79 4.53-1.34 7.78c2.13 3.25 2.77 6.35 1.34 7.78c-1.43 1.43-4.53.79-7.78-1.34c-3.25 2.13-6.35 2.77-7.78 1.34c-1.43-1.43-.79-4.53 1.34-7.78c-2.13-3.25-2.77-6.35-1.34-7.78m11.32 4.24c.61.62 1.17 1.25 1.69 1.88c1.38-2.13 1.88-3.96 1.13-4.7c-.74-.75-2.57-.25-4.7 1.13c.63.52 1.26 1.08 1.88 1.69m-7.08 7.08c-.61-.62-1.17-1.25-1.69-1.88c-1.38 2.13-1.88 3.96-1.13 4.7c.74.75 2.57.25 4.7-1.13c-.63-.52-1.26-1.08-1.88-1.69m-2.82-9.9c-.75.74-.25 2.57 1.13 4.7c.52-.63 1.08-1.26 1.69-1.88c.62-.61 1.25-1.17 1.88-1.69c-2.13-1.38-3.96-1.88-4.7-1.13m4.24 8.48c.7.7 1.42 1.34 2.12 1.91c.7-.57 1.42-1.21 2.12-1.91c.7-.7 1.34-1.42 1.91-2.12c-.57-.7-1.21-1.42-1.91-2.12c-.7-.7-1.42-1.34-2.12-1.91c-.7.57-1.42 1.21-2.12 1.91c-.7.7-1.34 1.42-1.91 2.12c.57.7 1.21 1.42 1.91 2.12m8.48 4.24c.75-.74.25-2.57-1.13-4.7c-.52.63-1.08 1.26-1.69 1.88c-.62.61-1.25 1.17-1.88 1.69c2.13 1.38 3.96 1.88 4.7 1.13Z"
						/>
					</svg>
				</Button>
				<Button cx={975.74} cy={521.77} r={size}>
					<svg
						width={size}
						height={size}
						xmlns="http://www.w3.org/2000/svg"
						preserveAspectRatio="xMidYMid meet"
						viewBox="0 0 24 24"
					>
						<path
							className="stroke-none fill-hud-primary"
							d="m16 11.78l4.24-7.33l1.73 1l-5.23 9.05l-6.51-3.75L5.46 19H22v2H2V3h2v14.54L9.5 8l6.5 3.78Z"
						/>
					</svg>
				</Button>
				<Button cx={934.51} cy={636.24} r={size}>
					<svg
						width={size}
						height={size}
						xmlns="http://www.w3.org/2000/svg"
						preserveAspectRatio="xMidYMid meet"
						viewBox="0 0 24 24"
					>
						<path
							className="stroke-none fill-hud-primary"
							d="M11 13.5v8H3v-8h8m-2 2H5v4h4v-4M12 2l5.5 9h-11L12 2m0 3.86L10.08 9h3.84L12 5.86M17.5 13c2.5 0 4.5 2 4.5 4.5S20 22 17.5 22S13 20 13 17.5s2-4.5 4.5-4.5m0 2a2.5 2.5 0 0 0-2.5 2.5a2.5 2.5 0 0 0 2.5 2.5a2.5 2.5 0 0 0 2.5-2.5a2.5 2.5 0 0 0-2.5-2.5Z"
						/>
					</svg>
				</Button>
			</g>
		</>
	);
}

function Button({ children, cx, cy, r }: { children?: any; cx: number; cy: number; r: number }) {
	const delay = 4.8;

	return (
		<motion.g
			whileHover={{ scale: 1.1 }}
			whileTap={{ scale: 0.9 }}
			variants={flash}
			custom={delay}
			fill="rgb(0 0 0 / 0.25)"
			className="cursor-pointer"
		>
			<circle className="shadow-hud-primary" strokeWidth="3" cx={cx} cy={cy} r={r} />
			<g transform={`translate(${cx - r / 2}, ${cy - r / 2})`}>{children}</g>
		</motion.g>
	);
}
