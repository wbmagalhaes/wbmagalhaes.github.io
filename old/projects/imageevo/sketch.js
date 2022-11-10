var tiles = [];
var img;

function preload() {
	img = loadImage('./image00.jpg');
}

function setup() {
	createCanvas(img.width, img.height).parent('canvas-holder');
	pixelDensity(1);

	img.loadPixels();

	tiles = [];
	for (var i = 0; i < width; i++) {
		var row = [];

		for (var j = 0; j < height; j++) {
			var pix = (i + j * width) * 4;

			var r = img.pixels[pix + 0];
			var g = img.pixels[pix + 1];
			var b = img.pixels[pix + 2];

			var target = color(r, g, b);
			row.push(new Tile(target));
		}

		tiles.push(row);
	}

	tiles[width / 2][height / 2].addColor(color(random(256), random(256), random(256)));
}

function draw() {
	background(51);

	loadPixels();
	for (var i = 0; i < width; i++)
		for (var j = 0; j < height; j++) {
			var tile = tiles[i][j];

			tile.resolve();
			var col = tile.show();

			var pix = (i + j * width) * 4;
			pixels[pix + 0] = col.levels[0];
			pixels[pix + 1] = col.levels[1];
			pixels[pix + 2] = col.levels[2];
			pixels[pix + 3] = 255;
		}
	updatePixels();

	for (var i = 1; i < width - 1; i++) for (var j = 1; j < height - 1; j++) tiles[i][j].reproduce(tiles, i, j);
}

function clamp(x, xmin, xmax) {
	if (x < xmin) return xmin;

	if (x > xmax) return xmax;

	return x;
}
