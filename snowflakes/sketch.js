var snowflakes = [];
var gravity, wind;

function setup() {
    createCanvas(800, 600).parent("canvas-holder");

    for (var i = 0; i < 500; i++)
        snowflakes.push(new Snowflakes());

    gravity = createVector(0, 0.02);
    wind = 0;
}

function draw() {
    background(23);

    snowflakes.forEach(snowflake => {
        var x = snowflake.pos.x;
        var y = snowflake.pos.y;
        var angle = noise(x, y, wind) * PI;
        var w = createVector(cos(angle), 0).mult(0.3);

        snowflake.applyForce(gravity);
        snowflake.applyForce(w);
        snowflake.update();
        snowflake.draw();
    });

    wind += 0.02;
}