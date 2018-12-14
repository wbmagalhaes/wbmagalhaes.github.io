var ballSize = 20;

var startSpeed = 3;
var incrementSpeed = 0.2;
var maxSpeed = 15;

var startBalls = 15;
var balls = [];

var tabYPos = 5;
var tabThick = 20;
var tabWide = 100;

var tabA;
var tabB;

function setup() {
  createCanvas(800, 600).parent("canvas-holder");

  for (var i = 0; i < startBalls; i++)
    balls.push(new Ball());

  var yA = tabThick / 2 + tabYPos;
  var yB = height - tabThick / 2 - tabYPos;

  tabA = new Tab(yA, true);
  tabB = new Tab(yB, true);
}

function draw() {
  background(51);

  stroke(255);
  strokeWeight(2);

  line(0, height / 2, width, height / 2);

  noFill();
  ellipseMode(CENTER);
  ellipse(width / 2, height / 2, 50);

  tabA.update();
  tabA.show();

  tabB.update();
  tabB.show();

  balls.forEach(ball => {
    var goal = ball.update();
    ball.show();

    if (goal == 1) {
      tabA.score++;
      ball.reset(1);
      tabB.reset();
    }
    else if (goal == 2) {
      tabB.score++;
      ball.reset(-1);
      tabA.reset();
    }
  });

  fill(255)
  noStroke();
  textSize(32);
  textAlign(LEFT, CENTER);
  text("Score: " + tabA.score, 24, height / 2 - 24);
  text("Score: " + tabB.score, 24, height / 2 + 24);
}

function predBall() {
  tabA.findBall();
  tabB.findBall();
}

function sign(n) {
  if (n > 0) return 1;
  else if (n < 0) return -1;
  else return 0;
}