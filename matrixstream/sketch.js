var symbolSize = 16;

var lineHeight = symbolSize / 8;
var lineNum;

var symbols = [];

function setup() {
    createCanvas(800, 600).parent("canvas-holder");

    var n = width / symbolSize;
    var x = symbolSize / 2;
    for (var i = 0; i < n; i++) {
        var y = -random(height / 4, height * 2);
        var max = random(8, 40);
        symbols.push(new Symbol(0, max, x, y));

        var rng = round(random(4));
        if (rng == 0) {
            y -= symbolSize * (max + round(random(2, 6)));
            max = random(6, 20);
            symbols.push(new Symbol(0, max, x, y));
        }

        x += symbolSize;
    }

    lineNum = 2 * ceil(height / lineHeight);

    frameRate(16);

    noStroke();
    textSize(symbolSize - 4);
    textAlign(CENTER, CENTER);
    rectMode(CENTER);

    background(0, 8, 2);
}

function draw() {
    background(0, 8, 2, 150);

    fill(0, 41, 4, 150);
    for (var i = 0; i < lineNum; i++)
        rect(width / 2, 2 * i * lineHeight, width, lineHeight);

    symbols.forEach(symbol => {
        symbol.fall();
        symbol.show();
    });
}