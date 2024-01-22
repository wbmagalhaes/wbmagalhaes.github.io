import { ReactP5Wrapper, type P5CanvasInstance, type SketchProps } from '@p5-wrapper/react';

import { Boid } from './BoidObject';
import { Food } from './Food';
import { SteerOptions } from './SteerOptions';

interface Props {
	size: { w: number; h: number };
	options: SteerOptions;
}

export default function Sketch({ size, options }: Props) {
	return <ReactP5Wrapper sketch={sketch} size={size} options={options} />;
}

function sketch(p5: P5CanvasInstance<SketchProps & Props>) {
	let size: { w: number; h: number } = { w: 800, h: 600 };

	let options: SteerOptions;

	let boids: Boid[];
	let foods: Food[];

	p5.setup = () => {
		p5.createCanvas(size.w, size.h);
		p5.pixelDensity(1);

		p5.noStroke();
		p5.fill(255);

		boids = Array(64)
			.fill(0)
			.map(() => new Boid(p5));

		foods = Array(2)
			.fill(0)
			.map(() => new Food(p5));
	};

	p5.updateWithProps = (props: SketchProps & Props) => {
		size = props.size;
		p5.resizeCanvas(size.w, size.h);

		options = props.options;
	};

	p5.draw = () => {
		if (!options) {
			return;
		}

		let dt = p5.deltaTime / 1000;

		p5.background(51);

		p5.translate(p5.width / 2, p5.height / 2);

		foods.forEach((foods) => {
			foods.render(p5);
			foods.recycle(p5);
		});

		boids.forEach((boid) => {
			boid.steer(boids, foods, options);
		});

		boids.forEach((boid) => {
			boid.update(dt, size);
			boid.render(p5);
		});
	};
}
