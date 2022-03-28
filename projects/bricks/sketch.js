let player;
let ball;
let bricks;
let clack;

function preload() {
	clack = loadSound('clack.wav');
}

function setup() {
	createCanvas(800, 600).parent("canvas-holder");
	player = new Player(400, 560, 70, 24);
	ball = new Ball(400, 300, 8, 500);

	const brickW = 50;
	const brickH = 20;
	const nBricksX = 12;
	const nBricksY = 6;
	const brickGap = 8;

	const offsetX = (width - (brickW * nBricksX + brickGap * (nBricksX - 1))) / 2;
	const offsetY = (height - (brickH * nBricksY + brickGap * (nBricksY - 1))) / 8;

	const colors = ['#F7396F', '#AF3C8D', '#673EAB', '#0E69A1', '#44988F', '#79C77D'];

	bricks = [];
	for (let i = 0; i < nBricksX; i++) {
		for (let j = 0; j < nBricksY; j++) {
			let x = i * (brickW + brickGap) + brickW / 2 + offsetX;
			let y = j * (brickH + brickGap) + brickH / 2 + offsetY;
			let brick = new Brick(x, y, brickW, brickH, colors[j]);
			bricks.push(brick);
		}
	}
}

function draw() {
	background(51);

	let collide = false;
	if (ball.collideWalls()) {
		collide = true;
	}
	else if (ball.collideRect(player.rect)) {
		collide = true;
	}
	else {
		for (let i = 0; i < bricks.length; i++) {
			const brick = bricks[i];
			if (brick.active && ball.collideRect(brick.rect)) {
				brick.active = false;
				collide = true;
				break;
			}
		}
	}

	if (collide) {
		clack.play();
	}

	ball.move(deltaTime / 1000);
	player.move(mouseX);

	if (ball.gameover()) {
		reset();
	}

	ball.render();
	player.render();

	let n_active = 0;
	bricks.forEach(brick => {
		if (brick.active) {
			brick.render();
			n_active++;
		}
	});

	if (n_active == 0) {
		reset();
	}
}

function reset() {
	bricks.forEach(brick => {
		brick.reset();
	});

	ball.reset();
}