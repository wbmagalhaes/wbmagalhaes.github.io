var spheresNumber = 60;
var circlesNumber = 2;
var maxHeight = 80;
var sphereSize = 8;
var circleRadius = 200;

var time = 0;
var speed = 0.03;

var globes = [];

var circlesNumberSlider;

function setup() {
	createCanvas(800, 600, WEBGL).parent("canvas-holder");

	var configsHolder = document.getElementById("configs-holder");

	var p = createP("Number of Circles");
	p.parent(configsHolder);
	p.class("text-center");

	circlesNumberSlider = createSlider(1, 10, circlesNumber, 1);
	circlesNumberSlider.parent(configsHolder);
	circlesNumberSlider.class("form-control-range");

	colorMode(HSB, 360, 100, 100);

	var stepAngle = TWO_PI / spheresNumber;
	for (var i = 0; i < spheresNumber; i++) {
		var angle = i * stepAngle;

		var xpos = cos(angle + PI) * circleRadius;
		var zpos = sin(angle + PI) * circleRadius;
		var col = color(360 * angle / TWO_PI, 100, 100);

		globes.push(new Globe(i, xpos, zpos, col));
	}

	colorMode(RGB, 255, 255, 255);
	camera(30, -height / 3, height / 1.6, 0, 0, 0, 0, 1, 0);
}

function draw() {
	circlesNumber = circlesNumberSlider.value();

	background(51);

	stroke(0);
	fill(81);

	push();
	translate(0, height / 4, 0);
	box(width * 2, height / 2, height);
	pop();

	strokeWeight(1);
	stroke(0);
	fill(0);

	push();
	translate(0, -0.001, 0);
	rotateX(-HALF_PI);

	var stepAngle = TWO_PI / spheresNumber;
	for (var i = 0; i < spheresNumber; i++) {
		var angle = i * stepAngle;

		var xpos = cos(angle) * circleRadius;
		var zpos = sin(angle) * circleRadius;
		ellipse(xpos, zpos, sphereSize);
	}
	pop();

	time += speed;
	globes.forEach(globe => {
		globe.update(time);
		globe.draw();
	});
}