let xRotation, yRotation, zRotation;
let waveSelect;

let wave = '3s';
let orbital;

function setup() {
	createCanvas(800, 600, WEBGL).parent("canvas-holder");

	xRotation = PI / -22;
	yRotation = PI / -14;
	zRotation = 0;

	waveSelect = createSelect();
	waveSelect.position(150, 50);

	Object.keys(wavesDict).forEach(key => {
		waveSelect.option(key);
	});

	waveSelect.selected(wave);
	waveSelect.changed(waveSelectEvent);

	orbital = new Orbital(512, wavesDict[wave]);
}

let pressedX = 0;
let pressedY = 0;
let isPressed = false;

let sensitivityX = 0.0005;
let sensitivityY = -0.0005;

let rotationSpeed = 0.0001;

function mousePressed() {
	pressedX = mouseX;
	pressedY = mouseY;

	isPressed = true;
}

function mouseReleased() {
	isPressed = false;
}

function waveSelectEvent() {
	let item = waveSelect.value();
	wave = item;

	orbital = new Orbital(512, wavesDict[wave]);
}

function draw() {
	background(3, 3, 7);

	if (isPressed) {
		let dx = (mouseX - pressedX) * sensitivityX * deltaTime;
		let dy = (mouseY - pressedY) * sensitivityY * deltaTime;

		yRotation += dx;
		xRotation += dy;

		pressedX = mouseX;
		pressedY = mouseY;
	}

	rotateX(xRotation);
	rotateY(yRotation);
	rotateZ(zRotation);

	rotateX(PI / 2);

	strokeWeight(0.5);

	stroke(255, 0, 0);
	line(-height / 2, 0, 0, height / 2, 0, 0);

	stroke(0, 255, 0);
	line(0, -height / 2, 0, 0, height / 2, 0);

	stroke(0, 0, 255);
	line(0, 0, -height / 2, 0, 0, height / 2);

	noStroke();

	orbital.render();
}