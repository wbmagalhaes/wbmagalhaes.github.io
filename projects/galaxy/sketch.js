let bg, dust;

let galaxy;

let x_rotation, y_rotation, z_rotation;

function preload() {
	bg = loadImage('./background.jpg');
	dust = loadImage('./spacedust.png');
}

function setup() {
	createCanvas(800, 600, WEBGL).parent("canvas-holder");

	galaxy = new Galaxy(
		createVector(0, 0, 0),
		createVector(60 * PI / 180, 20 * PI / 180, 0),
		n_arms = 8,
		arm_size = 250,
		n_particles = 15,
		particle_size = 120,
		spiral_offset = -0.14);

	x_rotation = 0;
	y_rotation = 0;
	z_rotation = 0;

	let gl = document.getElementById('defaultCanvas0').getContext('webgl');
	gl.disable(gl.DEPTH_TEST);

	imageMode(CORNER);
	rectMode(CENTER);

	noStroke();
	fill(255);

	frameRate(24);
}

let pressedX = 0;
let pressedY = 0;
let isPressed = false;

let sensitivityX = 0; //0.0001;
let sensitivityY = 0; //-0.0001;

let rotationSpeed = 0.0001;

function mousePressed() {
	pressedX = mouseX;
	pressedY = mouseY;

	isPressed = true;
}

function mouseReleased() {
	isPressed = false;
}

function draw() {
	background(17, 14, 33);

	if (isPressed) {
		let dx = (mouseX - pressedX) * sensitivityX * deltaTime;
		let dy = (mouseY - pressedY) * sensitivityY * deltaTime;

		z_rotation += dx;
		x_rotation += dy;

		pressedX = mouseX;
		pressedY = mouseY;
	}

	image(bg, 0, 0, 800, 600);

	push();
	rotateX(x_rotation);
	rotateY(y_rotation);
	rotateZ(z_rotation);

	galaxy.draw();

	pop();
}