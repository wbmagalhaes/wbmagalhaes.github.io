import { ReactP5Wrapper } from 'react-p5-wrapper';
import type { P5CanvasInstance, SketchProps } from 'react-p5-wrapper';

import { Phase } from './Phase';
import { FourierOptions } from './FourierOptions';

import { Vector2 } from '@core/Vector';

interface Props {
	size: { w: number; h: number };
	options: FourierOptions;
}

export default function Sketch({ size, options }: Props) {
	return <ReactP5Wrapper sketch={sketch} size={size} options={options} />;
}

function sketch(p5: P5CanvasInstance<SketchProps & Props>) {
	let size: { w: number; h: number } = { w: 800, h: 600 };
	let options: FourierOptions;

	let baseSize: number;
	let phase: Phase;

	let angle = 0;
	let points: Vector2[] = [];

	let phaseX: number;
	let phaseY: number;

	let paperColor = p5.color(231, 231, 221);
	let horizontalLinesColor = p5.color(239, 96, 80);
	let verticalLineColor = p5.color(164, 212, 237);

	let phasesColor = p5.color(60, 92, 162, 192);
	let trailColor = p5.color(222, 78, 78);
	let graphColor = p5.color(60, 92, 162);

	p5.setup = () => {
		p5.createCanvas(size.w, size.h);
		p5.pixelDensity(1);

		createPhase(4);
	};

	function createPhase(nPhases: number) {
		baseSize = size.w / 4;

		phaseX = size.w / 3;
		phaseY = size.h / 2;

		phase = new Phase({
			position: new Vector2(phaseX, phaseY),
			baseSize: baseSize,
			color: phasesColor,
		});

		for (let i = 0; i < nPhases - 1; i++) {
			phase.createSubPhase(p5);
		}
	}

	p5.updateWithProps = (props: SketchProps & Props) => {
		size = props.size;
		p5.resizeCanvas(size.w, size.h);

		options = props.options;

		createPhase(options.nPhases);
	};

	p5.draw = () => {
		if (!options) {
			return;
		}

		let dt = p5.deltaTime / 1000;
		angle += dt * options.frequency * 2 * Math.PI;

		drawBackground();

		phase.update(angle);
		phase.draw(p5);

		let point = phase.getPoint();
		addPoint(point);

		drawGraph();
		drawTrail(16);
		drawCurrentPoint(point);
	};

	function drawBackground() {
		p5.background(paperColor);

		p5.strokeWeight(2);
		p5.stroke(verticalLineColor);

		p5.line(0, phaseY, size.w, phaseY);

		let gap = baseSize / Math.PI / 2;
		let nLines = ~~(size.h / gap);
		for (let i = 1; i < nLines; i++) {
			p5.line(0, phaseY - gap * i, size.w, phaseY - gap * i);
			p5.line(0, phaseY + gap * i, size.w, phaseY + gap * i);
		}

		p5.stroke(horizontalLinesColor);
		p5.line(size.w / 10, 0, size.w / 10, size.h);

		p5.noStroke();

		p5.fill(0, 127);
		p5.circle(phaseX, phaseY, 3);
	}

	function drawGraph() {
		p5.push();
		p5.translate(2 * phaseX, phaseY);

		p5.strokeWeight(2);
		p5.noFill();

		let nPoints = points.length;
		for (let i = 1; i < nPoints; i++) {
			const pt = points[i];
			const prev = points[i - 1];

			let c = p5.color(graphColor);
			c.setAlpha(255 * (i / nPoints));

			p5.stroke(c);
			p5.line(nPoints - i, pt.y, nPoints - (i - 1), prev.y);
		}

		p5.pop();
	}

	function addPoint(point: Vector2) {
		let nPoints = points.length;
		if (nPoints > phaseX) {
			points.splice(0, 1);
		}
		points.push(point);
	}

	function drawTrail(nPoints: number) {
		p5.push();
		p5.translate(phaseX, phaseY);

		p5.strokeWeight(3);
		p5.noFill();

		nPoints = Math.min(nPoints, points.length);
		for (let i = 1; i < nPoints; i++) {
			const pt = points[points.length - i];
			const prev = points[points.length - i - 1];

			let c = p5.color(trailColor);
			c.setAlpha(255 * (1 - i / nPoints));

			p5.stroke(c);
			p5.line(pt.x, pt.y, prev.x, prev.y);
		}

		p5.pop();
	}

	function drawCurrentPoint(point: Vector2) {
		p5.push();
		p5.translate(phaseX, phaseY);

		p5.noStroke();

		p5.fill(0);
		p5.circle(point.x, point.y, 6);

		p5.fill(graphColor);
		p5.circle(phaseX, point.y, 6);

		p5.pop();
	}
}
