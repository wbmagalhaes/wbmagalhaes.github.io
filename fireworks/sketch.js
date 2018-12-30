var fireworks = [];
var gravity;

function setup() {
    createCanvas(800, 600).parent("canvas-holder");
    frameRate(60);

    gravity = createVector(0, 0.163);

    for (var i = 0; i < 60; i++) {
        var firework = new Firework();
        firework.generate();
        fireworks.push(firework);
    }
}

function draw() {
    background(12, 90);

    fireworks.forEach(firework => {
        firework.update();
        firework.render();
    });
}