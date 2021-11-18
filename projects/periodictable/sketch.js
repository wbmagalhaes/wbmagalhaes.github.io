var yearText;

var data = {};
var elementBoxes = [];

var currentYear = 1600;

var boxSize;

function preload() {
	data = loadJSON('./elements.json');
}

function setup() {
	createCanvas(1000, 650).parent("canvas-holder");

	currentYear = 1600;
	boxSize = createVector(54, 62);

	var configsHolder = document.getElementById("configs-holder");

	yearText = createP("Year: " + currentYear);
	yearText.parent(configsHolder);
	yearText.class("text-center");

	var yearSlider = createSlider(1600, 2018, currentYear, 1);
	yearSlider.parent(configsHolder);
	yearSlider.class("form-control-range");
	yearSlider.changed(() => { updateYear(yearSlider) });

	var elements = data['elements'];
	elements.forEach(element => {
		elementBoxes.push(new ElementBox(element));
	});
}

function draw() {
	background(51);

	var xborder = (width - (18 * boxSize.x)) / 2;
	var yborder = (height - (10 * boxSize.y)) / 2;
	translate(xborder, yborder);

	elementBoxes.forEach(box => {
		box.draw();
	});
}

function updateYear(slider) {
	currentYear = slider.value();
	yearText.html("Year: " + currentYear);
}