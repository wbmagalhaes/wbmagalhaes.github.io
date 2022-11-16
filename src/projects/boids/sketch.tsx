import { ReactP5Wrapper } from 'react-p5-wrapper';
import type { P5CanvasInstance, SketchProps } from 'react-p5-wrapper';

interface Props {
	size: { w: number; h: number };
}

export default function Sketch({ size }: Props) {
	return <ReactP5Wrapper sketch={sketch} size={size} />;
}

function sketch(p5: P5CanvasInstance<SketchProps & Props>) {
	let size: { w: number; h: number } = { w: 800, h: 600 };

	p5.setup = () => {
		p5.createCanvas(size.w, size.h, p5.WEBGL);
		p5.pixelDensity(1);

		p5.noStroke();
		p5.fill(255);
	};

	p5.updateWithProps = (props: SketchProps & Props) => {
		size = props.size;
		p5.resizeCanvas(size.w, size.h);
	};

	p5.draw = () => {
		p5.background(51);
	};
}
