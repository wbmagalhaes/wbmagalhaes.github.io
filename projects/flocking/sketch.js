var mouseRadius = 200;

var boids, configs, configsHolder0, configsHolder1;

function setup() {
	createCanvas(800, 600, WEBGL).parent("canvas-holder");
	configsHolder0 = document.getElementById("configs-holder0");
	configsHolder1 = document.getElementById("configs-holder1");

	start();
}

function start() {
	boids = [];
	configs = [];

	configsHolder0.innerHTML = "";
	configsHolder1.innerHTML = "";

	for (var i = 0; i < 8; i++) {
		var col = color(random(256), random(256), random(256));
		var num = random(12, 20);

		var config = createConfig(i, col);
		configs.push(config);

		for (var j = 0; j < num; j++)
			boids.push(new Boid(col, config));
	}
}

function createConfig(idx, col) {
	var colorHolder = createDiv();

	if (idx % 2 == 0)
		colorHolder.parent(configsHolder0);
	else
		colorHolder.parent(configsHolder1);

	colorHolder.class("col");
	colorHolder.id("color" + idx + "-holder");

	var colorBlock = createDiv();
	colorBlock.parent(colorHolder);
	colorBlock.class("rounded");
	colorBlock.style("background", toHexDec(col));
	colorBlock.style("width", "20px");
	colorBlock.style("height", "20px");

	return new Config(colorHolder);
}

function toHexDec(col) {
	return "#" + hex(col.levels[0], 2) + hex(col.levels[1], 2) + hex(col.levels[2], 2) + "FF";
}

function draw() {
	background(51);

	configs.forEach(config => {
		config.update();
	});

	boids.forEach(boid => {
		boid.percept(boids);
		boid.steer();
	});

	boids.forEach(boid => {
		boid.update();
		boid.show();
	});

	stroke(255, 0, 0);
	strokeWeight(2);
	noFill();
	ellipseMode(CENTER);
	ellipse(mouseX - width / 2, mouseY - height / 2, mouseRadius);
}