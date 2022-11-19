import { ReactP5Wrapper } from 'react-p5-wrapper';
import type { P5CanvasInstance, SketchProps } from 'react-p5-wrapper';
import { FourierOptions } from './FourierOptions';

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
		p5.circle(0, 0, 50);
	};
}
