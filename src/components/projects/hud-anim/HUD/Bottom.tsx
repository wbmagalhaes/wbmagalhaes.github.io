import { motion } from 'framer-motion';
import { pulse, rotate, flash, fillRect } from './animations';

export default function Bottom() {
	return (
		<motion.g variants={flash} custom={3.5} transform="translate(0, 594)">
			<CirclesA />
			<CirclesB />
			<Rectangles />
			<Rotator />
			<Dots />
		</motion.g>
	);
}

function CirclesA() {
	return (
		<g className=" stroke-hud-primary" transform="translate(150, 0)">
			<g transform="translate(0, 0)">
				<circle r="12" />
				<circle r="6" />
			</g>
			<g transform="translate(40, 0)">
				<circle r="12" />
				<motion.circle variants={pulse} className="fill-hud-primary " r="6" />
			</g>
			<g transform="translate(80, 0)">
				<circle r="12" />
				<circle r="6" />
			</g>
			<g transform="translate(120, 0)">
				<circle r="12" />
				<motion.circle variants={pulse} className="fill-hud-primary " r="6" />
			</g>
		</g>
	);
}

function CirclesB() {
	return (
		<g className=" stroke-hud-primary" transform="translate(350, 0)">
			<g transform="translate(0, 0)">
				<circle r="12" />
				<motion.circle variants={pulse} className="fill-hud-primary " r="3" />
			</g>
			<g transform="translate(40, 0)">
				<circle r="12" />
				<motion.circle variants={pulse} className="fill-hud-primary " r="3" />
			</g>
			<g transform="translate(80, 0)">
				<circle r="12" />
				<motion.circle variants={pulse} className="fill-hud-primary " r="3" />
			</g>
			<g transform="translate(120, 0)">
				<circle r="12" />
				<motion.circle variants={pulse} className="fill-hud-primary " r="3" />
			</g>
		</g>
	);
}

function Rotator() {
	return (
		<g transform="translate(560, 0)">
			<motion.g variants={rotate} className="fill-hud-primary">
				<g transform="translate(0, -6)">
					<path className="opacity-30" d="M0 0-10.6 10.6A15 15 0 0 1-10.6-10.6Z" />
					<path d="M0 0-10.6-10.6A15 15 0 0 1 10.6-10.6Z" />
					<path className="opacity-30" d="M0 0 10.6-10.6A15 15 0 0 1 10.6 10.6Z" />
					<path d="M0 0 10.6 10.6A15 15 0 0 1-10.6 10.6Z" />
				</g>
			</motion.g>
			<g className="fill-hud-primary " transform="translate(0, 18)">
				<motion.circle variants={pulse} cx="-18" r="4" />
				<motion.circle variants={pulse} cx="-6" r="4" />
				<motion.circle variants={pulse} cx="6" r="4" />
				<motion.circle variants={pulse} cx="18" r="4" />
			</g>
		</g>
	);
}

function Rectangles() {
	return (
		<g className="fill-hud-primary" transform="translate(610, 0)">
			<g transform="translate(0, -15)">
				<rect className="stroke-hud-primary" width="30" height="8" />
				<motion.rect variants={fillRect} width="30" height="8" />
			</g>
			<g transform="translate(36, -16)">
				<rect className="fill-hud-secondary" width="27" height="10" />
			</g>
			<g transform="translate(69, -15)">
				<rect className="stroke-hud-primary" width="65" height="8" />
				<motion.rect variants={fillRect} width="65" height="8" />
			</g>

			<motion.rect variants={pulse} x="0" y="0" width="134" height="8" />
			<rect x="0" y="15" width="134" height="1" />
		</g>
	);
}

function Dots() {
	return (
		<g className="fill-hud-primary " transform="translate(780, 0)">
			<g transform="translate(0, -8)">
				<motion.circle variants={pulse} className="fill-hud-secondary" cx="0" r="5" />
				<motion.circle variants={pulse} cx="30" r="5" />
				<motion.circle variants={pulse} className="fill-hud-secondary" cx="45" r="5" />
				<motion.circle variants={pulse} className="fill-hud-secondary" cx="60" r="5" />
				<motion.circle variants={pulse} cx="75" r="5" />
			</g>
			<g transform="translate(0, 8)">
				<motion.circle variants={pulse} cx="0" r="5" />
				<motion.circle variants={pulse} cx="15" r="5" />
				<motion.circle variants={pulse} cx="45" r="5" />
				<motion.circle variants={pulse} className="fill-hud-secondary" cx="60" r="5" />
				<motion.circle variants={pulse} className="fill-hud-secondary" cx="75" r="5" />
			</g>
		</g>
	);
}
