let x_rotation, y_rotation, z_rotation;
let wave_sel, checkbox_3d;

let wave = '3dz2';
let display_3d = true;

function setup() {
	createCanvas(800, 600, WEBGL).parent("canvas-holder");

	x_rotation = PI / -22;
	y_rotation = PI / -14;
	z_rotation = 0;

	wave_sel = createSelect();
	wave_sel.position(10, 10);

	Object.keys(waves_dict).forEach(key => {
		wave_sel.option(key);
	});

	wave_sel.selected('3dz2');
	wave_sel.changed(waveSelectEvent);

	checkbox_3d = createCheckbox('3D', true);
	checkbox_3d.changed(displayCheckEvent);
	checkbox_3d.position(6, 32);
	checkbox_3d.style('color', '#FFF');
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
	let item = wave_sel.value();
	wave = item;
}

function displayCheckEvent() {
	display_3d = this.checked();
}

function draw() {
	background(3, 3, 7);

	if (isPressed) {
		let dx = (mouseX - pressedX) * sensitivityX * deltaTime;
		let dy = (mouseY - pressedY) * sensitivityY * deltaTime;

		y_rotation += dx;
		x_rotation += dy;

		pressedX = mouseX;
		pressedY = mouseY;
	}

	if (display_3d) {
		rotateX(x_rotation);
		rotateY(y_rotation);
		rotateZ(z_rotation);
	}

	rotateX(PI / 2);

	strokeWeight(0.5);

	stroke(255, 0, 0);
	line(-height / 2, 0, 0, height / 2, 0, 0);

	stroke(0, 255, 0);
	line(0, -height / 2, 0, 0, height / 2, 0);

	stroke(0, 0, 255);
	line(0, 0, -height / 2, 0, 0, height / 2);

	noStroke();

	let orbital = new Orbital(
		size = 512,
		n_points = 10000,
		wave_function = waves_dict[wave],
		is_3d = display_3d
	);

	orbital.render();
}