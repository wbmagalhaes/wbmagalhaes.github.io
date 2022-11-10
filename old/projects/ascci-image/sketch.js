const density = ' ...::/\\/\\/\\+=*abcdef01XYZ#';
let img;

function preload() {
	img = loadImage('./image00.jpg');
}

function setup() {
	createCanvas(600, 600).parent('canvas-holder');
	pixelDensity(1);
}

function draw() {
	background(0);

	let dx = width - img.width;
	let dy = height - img.height;
	translate(dx / 2, dy / 2);

	img.loadPixels();

	const pixelSize = 8;
	const len = density.length;

	noStroke();
	fill(255);

	textSize(pixelSize);
	textAlign(CENTER, CENTER);

	for (let i = 0; i < img.width / pixelSize; i++) {
		for (let j = 0; j < img.height / pixelSize; j++) {
			const pixelIndex = (i * pixelSize + j * pixelSize * img.width) * 4;
			const r = img.pixels[pixelIndex + 0];
			const g = img.pixels[pixelIndex + 1];
			const b = img.pixels[pixelIndex + 2];
			const avg = (r + g + b) / 3;

			const charIndex = int((avg / 255) * len);
			const character = density.charAt(charIndex);
			text(character, i * pixelSize + pixelSize * 0.5, j * pixelSize + pixelSize * 0.5);
		}
	}
}
