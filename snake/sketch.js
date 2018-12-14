var tileSize = 20;
var startSize = 3;

var snake;
var foodPos;

var score = 0;

function setup() {
  createCanvas(800, 600).parent("canvas-holder");

  snake = new Snake(0, createVector(width / 2, height / 2), 3);
  for (var i = 0; i < startSize - 1; i++)
    snake.grow();

  spawnFood();

  frameRate(8);

  noStroke();
  textAlign(CENTER, CENTER);
  rectMode(CENTER);
}

function draw() {
  background(51);

  snake.update();
  snake.draw();

  if (snake.eat(foodPos)) {
    score++;
    spawnFood();
  }

  fill(23, 223, 23);
  rect(foodPos.x, foodPos.y, tileSize - 2, tileSize - 2);

  fill(255); 
  textSize(28);
  text("Score: " + score, width/2, 42);
}

function keyReleased() {
  switch (keyCode) {
    case UP_ARROW:
      snake.move(createVector(0, -1));
      break;
    case DOWN_ARROW:
      snake.move(createVector(0, 1));
      break;
    case LEFT_ARROW:
      snake.move(createVector(-1, 0));
      break;
    case RIGHT_ARROW:
      snake.move(createVector(1, 0));
      break;
  }
}

function spawnFood() {
  var x = random(tileSize, width - tileSize);
  var y = random(tileSize, height - tileSize);

  x = floor(x / tileSize) * tileSize;
  y = floor(y / tileSize) * tileSize;

  foodPos = createVector(x, y);
}

function lose() {
  noLoop();
  fill(255);
  textSize(42);
  text("GAME OVER", width / 2, height / 2);
}

function samePlace(v1, v2) {
  return (v1.x == v2.x && v1.y == v2.y);
}