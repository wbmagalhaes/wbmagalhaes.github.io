import { ReactP5Wrapper } from 'react-p5-wrapper';
import type { P5CanvasInstance, SketchProps } from 'react-p5-wrapper';
import { LogoOptions } from './LogoOptions';
import { LogoParser } from './LogoParser';

interface Props {
	size: { w: number; h: number };
	options: LogoOptions;
}

type ActionProp = (args: any[]) => void;

type BaseActionsProp = {
	forward: ActionProp;
	back: ActionProp;
	right: ActionProp;
	left: ActionProp;
	penUp: ActionProp;
	penDown: ActionProp;
	thickness: ActionProp;
	setColor: ActionProp;
	randomColor: ActionProp;
};

type ActionsProp = BaseActionsProp & { [key: string]: ActionProp };

export default function Sketch({ size, options }: Props) {
	return <ReactP5Wrapper sketch={sketch} size={size} options={options} />;
}

function sketch(p5: P5CanvasInstance<SketchProps & Props>) {
	let size: { w: number; h: number } = { w: 800, h: 600 };
	let options: LogoOptions;

	let parser = new LogoParser();

	let posX: number;
	let posY: number;
	let angle: number;
	let penDown: boolean;

	let actions: ActionsProp = {
		forward: (args: any[]) => {
			let amount = evalValue(args[0]);
			move(amount);
		},
		back: (args: any[]) => {
			let amount = evalValue(args[0]);
			move(-amount);
		},
		right: (args: any[]) => {
			let amount = evalValue(args[0]);
			rotate(amount);
		},
		left: (args: any[]) => {
			let amount = evalValue(args[0]);
			rotate(-amount);
		},
		penUp: (_: any[]) => {
			pen(false);
		},
		penDown: (_: any[]) => {
			pen(true);
		},
		thickness: (args: any[]) => {
			let weight = evalValue(args[0], 1);
			setThickness(weight);
		},
		setColor: (args: any[]) => {
			let r = evalValue(args[0], 255);
			let g = evalValue(args[1], 255);
			let b = evalValue(args[2], 255);
			setColor(r, g, b);
		},
		randomColor: (_: any[]) => {
			let r = p5.random(256);
			let g = p5.random(256);
			let b = p5.random(256);
			setColor(r, g, b);
		},
	};

	p5.setup = () => {
		p5.createCanvas(size.w, size.h);
		p5.pixelDensity(1);

		p5.frameRate(120);
		reset();
	};

	p5.updateWithProps = (props: SketchProps & Props) => {
		size = props.size;
		p5.resizeCanvas(size.w, size.h);

		options = props.options;

		parser.parseCode(options.code);
		reset();
	};

	p5.draw = () => {
		if (parser.isFinished()) {
			return;
		}

		let cmd = parser.getNext();
		cmd?.execute();
	};

	function reset() {
		p5.background(51);
		p5.stroke(255);
		p5.strokeWeight(1);

		posX = 0;
		posY = 0;
		angle = Math.PI * 0.5;
		penDown = true;
	}

	function evalValue(value: string, defaultValue: number = 0) {
		let amount = defaultValue;
		try {
			amount = eval(value);
		} catch {}

		return amount;
	}

	function move(amount: number) {
		let dx = Math.cos(angle) * amount;
		let dy = Math.sin(angle) * amount;

		if (penDown) p5.line(posX, posY, posX + dx, posY - dy);

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
