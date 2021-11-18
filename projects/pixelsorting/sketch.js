var original, sorted;
var currentIdx = 0;

function preload() {
	original = loadImage('./pixelsorting/image00.jpg');
}

function setup() {
	createCanvas(original.width, original.height * 2).parent("canvas-holder");

	sorted = createImage(original.width, original.height);

	original.loadPixels();
	sorted.loadPixels();

	for (var i = 0; i < original.pixels.length; i++)
		sorted.pixels[i] = original.pixels[i];

	sorted.updatePixels();
}

function draw() {
	background(51);
	image(original, 0, 0);

	sorted.loadPixels();

	if (currentIdx < sorted.width) {
		sortCollumn(currentIdx);
		currentIdx++;
	}

	sorted.updatePixels();

	image(sorted, 0, height / 2);
}

function getColor(x, y) {
	var pix = (x + y * sorted.width) * 4;
	var r = sorted.pixels[pix + 0];
	var g = sorted.pixels[pix + 1];
	var b = sorted.pixels[pix + 2];
	var a = sorted.pixels[pix + 3];
	return color(r, g, b, a);
}

function sortCollumn(i) {
	for (var j = 0; j < sorted.height; j++) {
		var max = -1;
		var selected = j;

		for (var k = j; k < sorted.height; k++) {
			var x = hue(getColor(i, k));

			if (x > max) {
				selected = k;
				max = x;
			}
		}

		var currentColor = getColor(i, j);
		var selectedColor = getColor(i, selected);

		sorted.set(i, j, selectedColor);
		sorted.set(i, selected, currentColor);
	}
}