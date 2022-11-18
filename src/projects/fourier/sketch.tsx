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

	p5.setup = () => {
		p5.createCanvas(size.w, size.h);
		p5.pixelDensity(1);

		createPhase(4);
	};

	function createPhase(nPhases: number) {
		baseSize = size.w / 4;

		phase = new Phase(p5, {
			baseSize: baseSize,
			position: new Vector2(size.w / 4, size.h / 2),
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

		p5.pop();
	};

	function drawBackground() {
		p5.background(231, 231, 221);

		p5.strokeWeight(2);
		p5.stroke(164, 212, 237);

		p5.line(0, size.h / 2, size.w, size.h / 2);

		let gap = baseSize / Math.PI / 2;
		let nLines = ~~(size.h / gap);
		for (let i = 1; i < nLines; i++) {
			p5.line(0, size.h / 2 - gap * i, size.w, size.h / 2 - gap * i);
			p5.line(0, size.h / 2 + gap * i, size.w, size.h / 2 + gap * i);
		}

		p5.stroke(239, 96, 80);
		p5.line(size.w / 10, 0, size.w / 10, size.h);

		p5.noStroke();

		p5.fill(0, 127);
		p5.circle(size.w / 4, size.h / 2, 3);
	}

	function drawGraph() {
		p5.push();
		p5.translate(size.w / 2, size.h / 2);

		p5.strokeWeight(2);
		p5.noFill();

		let nPoints = points.length;
		for (let i = 1; i < nPoints; i++) {
			const pt = points[i];
			const prev = points[i - 1];

			p5.stroke(60, 92, 162, 255 * (i / nPoints));
			p5.line(nPoints - i, pt.y, nPoints - (i - 1), prev.y);
		}

		p5.pop();
	}

	function addPoint(point: Vector2) {
		let nPoints = points.length;
		if (nPoints > size.w / 3) {
			points.splice(0, 1);
		}
		points.push(point);
	}

	function drawCurrentPoint(point: Vector2) {
		p5.push();
		p5.translate(size.w / 4, size.h / 2);

		p5.noStroke();

		p5.fill(0);
		p5.circle(point.x, point.y, 6);

		p5.fill(35, 54, 95);
		p5.circle(size.w / 4, point.y, 6);

		p5.pop();
	}
	function drawTrail(nPoints: number) {
		p5.push();
		p5.translate(size.w / 4, size.h / 2);

		p5.strokeWeight(3);
		p5.noFill();

		nPoints = Math.min(nPoints, points.length);
		for (let i = 1; i < nPoints; i++) {
			const pt = points[points.length - i];
			const prev = points[points.length - i - 1];

			p5.stroke(222, 78, 78, 255 * (1 - i / nPoints));
			p5.line(pt.x, pt.y, prev.x, prev.y);
		}

		p5.pop();
	}
}
