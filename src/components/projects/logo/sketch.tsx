import { ReactP5Wrapper } from 'react-p5-wrapper';
import { LogoOptions } from './LogoOptions';
import LogoParser from './LogoParser';
import Action from './Action';

import type { ActionsDictProp } from './Action';
import type { P5CanvasInstance, SketchProps } from 'react-p5-wrapper';

interface Props {
	size: { w: number; h: number };
	options: LogoOptions;
}

export default function Sketch({ size, options }: Props) {
	return <ReactP5Wrapper sketch={sketch} size={size} options={options} />;
}

function sketch(p5: P5CanvasInstance<SketchProps & Props>) {
	let size: { w: number; h: number } = { w: 800, h: 600 };
	let options: LogoOptions;

	let readyToDraw = false;
	let parser: LogoParser;

	let posX: number;
	let posY: number;
	let angle: number;
	let penDown: boolean;

	let actions: ActionsDictProp = {
		fd: new Action('fd', ['amount'], ([amount]) => {
			let value = Action.evalValue(amount);
			move(value);
		}),
		bk: new Action('bk', ['amount'], ([amount]) => {
			let value = Action.evalValue(amount);
			move(-value);
		}),
		rt: new Action('rt', ['amount'], ([amount]) => {
			let value = Action.evalValue(amount);
			rotate(value);
		}),
		lt: new Action('lt', ['amount'], ([amount]) => {
			let value = Action.evalValue(amount);
			rotate(-value);
		}),
		pu: new Action('pu', [], () => {
			pen(false);
		}),
		pd: new Action('pd', [], () => {
			pen(true);
		}),
		thickness: new Action('thickness', ['weight'], ([weight]) => {
			let value = Action.evalValue(weight, 1);
			setThickness(value);
		}),
		rgb: new Action('rgb', ['r', 'g', 'b'], ([r, g, b]) => {
			let rValue = Action.evalValue(r, 255);
			let gValue = Action.evalValue(g, 255);
			let bValue = Action.evalValue(b, 255);
			setColor(rValue, gValue, bValue);
		}),
		randomColor: new Action('randomColor', [], () => {
			let r = p5.random(256);
			let g = p5.random(256);
			let b = p5.random(256);
			setColor(r, g, b);
		}),
	};

	p5.setup = () => {
		readyToDraw = true;

		p5.createCanvas(size.w, size.h);
		p5.pixelDensity(1);

		p5.frameRate(120);
		reset();
	};

	p5.updateWithProps = (props: SketchProps & Props) => {
		size = props.size;
		p5.resizeCanvas(size.w, size.h);

		options = props.options;

		parser = new LogoParser(options.code, actions);
		reset();
	};

	p5.draw = () => {
		let cmd = parser?.getNext();
		if (cmd) {
			actions[cmd.name].function_exec(cmd.args);
		}
	};

	function reset() {
		if (!readyToDraw) {
			return;
		}

		p5.background(51);
		p5.stroke(255);
		p5.strokeWeight(1);

		posX = p5.width / 2;
		posY = p5.height / 2;
		angle = Math.PI * 0.5;
		penDown = true;
	}

	function move(amount: number) {
		let dx = Math.cos(angle) * amount;
		let dy = Math.sin(angle) * amount;

		if (penDown) {
			p5.line(posX, posY, posX + dx, posY - dy);
		}

		posX += dx;
		posY -= dy;
	}

	function rotate(amount: number) {
		angle += (amount * Math.PI) / 180;
	}

	function pen(down: boolean) {
		penDown = down;
	}

	function setThickness(weight: number) {
		p5.strokeWeight(weight);
	}

	function setColor(r: number, g: number, b: number) {
		p5.stroke(p5.color(r, g, b));
	}
}
