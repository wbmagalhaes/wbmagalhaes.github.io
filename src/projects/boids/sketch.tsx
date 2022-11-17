import { ReactP5Wrapper } from 'react-p5-wrapper';
import type { P5CanvasInstance, SketchProps } from 'react-p5-wrapper';

import { Boid, SteerOptions } from './boid';

interface Props {
	size: { w: number; h: number };
	options: SteerOptions;
}

export default function Sketch({ size, options }: Props) {
	return <ReactP5Wrapper sketch={sketch} size={size} options={options} />;
}

function sketch(p5: P5CanvasInstance<SketchProps & Props>) {
	let size: { w: number; h: number } = { w: 800, h: 600 };

	let options = new SteerOptions();
	let boids: Boid[] = Array(64)
		.fill(0)
		.map(() => new Boid(p5));

	p5.setup = () => {
		p5.createCanvas(size.w, size.h);
		p5.pixelDensity(1);

		p5.noStroke();
		p5.fill(255);
	};

	p5.updateWithProps = (props: SketchProps & Props) => {
		size = props.size;
		p5.resizeCanvas(size.w, size.h);

		options = props.options;
	};

	p5.draw = () => {
		p5.background(51);

		p5.translate(p5.width / 2, p5.height / 2);

		boids.forEach((boid) => {
			boid.steer(boids, options);
		});

		boids.forEach((boid) => {
			boid.update(p5.deltaTime / 1000, size);
			boid.render(p5);
		});
	};
}
