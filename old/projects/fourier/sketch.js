var phase;

var startSize = 200;
var graphScale = 2 / 3;

var speed = 0.06;

var nPhases = 0;
var maxPhases = 99;

var prevP = null;
var nPoint = 0;

var maxX = (1 + 0.3543) * startSize;

function setup() {
	createCanvas(800, 600).parent('canvas-holder');

	reset(nPhases);

	textAlign(CENTER, CENTER);
	textSize(16);

	background(51);
}

function reset(n) {
	nPhases = min(n, maxPhases);

	phase = new Phase(0, createVector(width / 6, height / 2));
	for (var i = 0; i < nPhases; i++) phase.makesubphase();

	fill(51, 64);
	rect(0, 0, width, height);

	prevP = null;
	nPoint = 0;
}

function draw() {
	fill(51);
	noStroke();
	rect(0, 0, width / 6 + maxX + 3, height);

	strokeWeight(2);

	var point = phase.update();
	phase.draw();

	strokeWeight(1);
	push();
	translate(width, height / 2);

	if (prevP != null) line(-nPoint * graphScale, point.y, -(nPoint - 1) * graphScale, prevP.y);

	nPoint++;
	prevP = point;

	pop();

	push();
	translate(width / 6, height / 2);
	stroke(0);
	line(point.x, point.y, maxX, point.y);

	fill(0);
	ellipse(maxX, point.y, 4);

	strokeWeight(1);
	text('n = ' + (nPhases + 1), 0, startSize / 2);

	line(maxX, height / 2, maxX, -height / 2);
	pop();

	if (nPoint > ((5 * width) / 6 - maxX) / graphScale) reset(++nPhases);
}
