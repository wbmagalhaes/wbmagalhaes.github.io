import { motion } from 'framer-motion';
import { pulse, flash } from './animations';

export default function Top() {
	return (
		<motion.g variants={flash} custom={3.2}>
			<Circles />
			<Sphere />
			<Arcs />
		</motion.g>
	);
}

function Sphere() {
	return <image transform="translate(425, 30)" width="150" height="150" href="/images/projects/sphere.gif" />;
}

function Arcs() {
	return (
		<>
			<g className="fill-hud-secondary">
				<path d="M625.22,74.29H603l-.2-.54A109.84,109.84,0,0,0,397,72.52l-.2.53H375.56a.83.83,0,0,1,0-1.65h20.07a111.49,111.49,0,0,1,208.54,1.24h21.05a.83.83,0,1,1,0,1.65Z" />
			</g>
			<g className="fill-hud-primary">
				<path d="M534,19.36a.82.82,0,1,0-.58,1.54A97.2,97.2,0,0,1,582,60.9a.82.82,0,0,0,.71.39.88.88,0,0,0,.43-.12A.82.82,0,0,0,583.4,60,98.87,98.87,0,0,0,534,19.36Z" />
				<path d="M522.63,15.9a98.73,98.73,0,0,0-23-2.69,97.2,97.2,0,0,0-61.16,21.35.82.82,0,0,0-.13,1.16A.82.82,0,0,0,439,36a.86.86,0,0,0,.52-.18,95.51,95.51,0,0,1,60.13-21,97.16,97.16,0,0,1,22.58,2.66.83.83,0,0,0,.38-1.61Z" />
				<path d="M421.49,52a98.28,98.28,0,0,0-8.44,13.12.82.82,0,0,0,.72,1.21.82.82,0,0,0,.73-.44A96.53,96.53,0,0,1,422.8,53a.82.82,0,1,0-1.31-1Z" />
				<path d="M393.23,64.91H375.56a.83.83,0,0,0,0,1.65h17.67a.83.83,0,0,0,0-1.65Z" />
				<path d="M625.22,64.91H607.17a.83.83,0,0,0,0,1.65h18.05a.83.83,0,1,0,0-1.65Z" />
			</g>
		</>
	);
}

function Circles() {
	return (
		<g transform="translate(0, 107)">
			<g className=" fill-hud-primary" transform="translate(170, 0) ">
				<motion.circle variants={pulse} cx="0" cy="0" r="8" />
				<motion.circle variants={pulse} cx="35" cy="0" r="8" />
				<motion.circle variants={pulse} cx="70" cy="0" r="8" />
				<motion.circle variants={pulse} cx="105" cy="0" r="8" />
				<motion.circle variants={pulse} cx="140" cy="0" r="8" />
			</g>

			<g className=" fill-hud-primary" transform="translate(350, 0)">
				<motion.circle variants={pulse} cx="0" cy="-6" r="4" />
				<motion.circle variants={pulse} className="fill-hud-secondary" cx="0" cy="6" r="4" />
				<motion.circle variants={pulse} cx="12" cy="-6" r="4" />
				<motion.circle variants={pulse} cx="12" cy="6" r="4" />
				<motion.circle variants={pulse} className="fill-hud-secondary" cx="24" cy="-6" r="4" />
				<motion.circle variants={pulse} cx="24" cy="6" r="4" />
			</g>

			<g className="fill-hud-primary" transform="translate(640, 0)">
				<g transform="translate(0, 0)">
					<motion.circle className="stroke-hud-primary" r="8" />
					<motion.circle variants={pulse} className="fill-hud-primary" r="8" />
				</g>
				<g transform="translate(35, 0)">
					<motion.circle className="stroke-hud-primary" r="8" />
					<motion.circle variants={pulse} className="fill-hud-primary" r="8" />
				</g>
				<g transform="translate(70, 0)">
					<motion.circle className="stroke-hud-primary" r="8" />
					<motion.circle variants={pulse} className="fill-hud-primary" r="8" />
				</g>
				<g transform="translate(105, 0)">
					<motion.circle className="stroke-hud-primary" r="8" />
					<motion.circle variants={pulse} className="fill-hud-primary" r="8" />
				</g>
				<g transform="translate(140, 0)">
					<motion.circle className="stroke-hud-primary" r="8" />
					<motion.circle variants={pulse} className="fill-hud-primary" r="8" />
				</g>
				<g transform="translate(175, 0)">
					<motion.circle className="stroke-hud-primary" r="8" />
					<motion.circle variants={pulse} className="fill-hud-primary" r="8" />
				</g>
			</g>
		</g>
	);
}
