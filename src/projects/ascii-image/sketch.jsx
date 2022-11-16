import { ReactP5Wrapper } from 'react-p5-wrapper';

export default function Sketch({ holderRef }) {
	return <ReactP5Wrapper sketch={(p5) => sketch(p5, holderRef)} />;
}

function sketch(p5, holderRef) {
	let img;

	const density = ' ...::/\\/\\/\\+=*abcdef01XYZ#';
	const len = density.length;
	const pixelSize = 4;

	p5.preload = () => {
		img = p5.loadImage('/images/vader.jpg');
	};

	p5.setup = () => {
		const w = holderRef.current.offsetWidth;
		const h = holderRef.current.offsetHeight;
		p5.createCanvas(w, h);
		p5.pixelDensity(1);

		p5.noStroke();
		p5.fill(255);

		p5.textSize(pixelSize);
		p5.textAlign(p5.CENTER, p5.CENTER);

		let ratio = w < h ? w / img.width : h / img.height;
		img.resize(img.width * ratio, img.height * ratio);
	};

	p5.draw = () => {
		p5.background(51);

		p5.push();

		let dx = p5.width - img.width;
		let dy = p5.height - img.height;
		p5.translate(dx / 2, dy / 2);

		img.loadPixels();

		for (let i = 0; i < img.width / pixelSize; i++) {
			for (let j = 0; j < img.height / pixelSize; j++) {
				const index = (i * pixelSize + j * pixelSize * img.width) * 4;
				const r = img.pixels[index + 0];
				const g = img.pixels[index + 1];
				const b = img.pixels[index + 2];
				const avg = (r + g + b) / 3;

				const charIndex = p5.int((avg / 255) * len);
				const character = density.charAt(charIndex);
				p5.text(character, i * pixelSize + pixelSize * 0.5, j * pixelSize + pixelSize * 0.5);
			}
		}

		p5.pop();
	};
}
