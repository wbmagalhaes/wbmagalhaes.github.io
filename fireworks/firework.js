class Firework {
    constructor(xpos, ypos, xvel, yvel, size, col, exploded) {
        this.pos = createVector(xpos, ypos);
        this.vel = createVector(xvel, yvel);
        this.acc = createVector(0, 0);

        this.size = size;
        this.col = col;

        this.exploded = exploded;
        this.childs = [];

        this.delay = 0;
    }

    generate() {
        this.size = random(10, 15);
        this.col = color(
            random(100, 150),
            random(30, 80),
            random(10, 40)
        );

        var xpos = random(width);
        var ypos = height + this.size * 4 + random(200);

        this.pos = createVector(xpos, ypos);

        var dir = random(1) > 0.5 ? 1 : -1;
        var xvel = random(1.5, 2.2) * dir;
        var yvel = -random(12.0, 15.0);

        this.vel = createVector(xvel, yvel);
        this.acc = createVector(0, 0);

        this.exploded = false;
        this.childs = [];

        this.delay = random(600);
    }

    update() {
        if (this.delay > 0) {
            this.delay--;
            return;
        }

        if (this.pos.x > width + this.size)
            this.pos.x = -this.size;
        else if (this.pos.x < -this.size)
            this.pos.x = width + this.size;

        if (this.vel.y > 0 && !this.exploded)
            this.explode();

        this.acc.add(gravity);
        this.vel.add(this.acc);
        this.pos.add(this.vel);

        this.acc.mult(0);

        this.childs.forEach(child => {
            child.update();
        });

        this.size -= 0.12;
        this.size = max(this.size, 0);

        if (this.exploded && this.belowScreen())
            this.generate();
    }

    belowScreen() {
        if (this.childs.length <= 0)
            return false;

        return (this.childs[0].size <= 0)
    }

    explode() {
        this.exploded = true;

        var xpos = this.pos.x;
        var ypos = this.pos.y;

        var size = random(5, 8);
        var col = color(
            random(30, 230),
            random(30, 230),
            random(30, 230)
        );

        var explosionForce = random(2, 4);
        var n = random(14, 22);

        for (var i = 0; i < n; i++) {
            var angle = random(0, TWO_PI);

            var xvel = cos(angle) * explosionForce;
            var yvel = sin(angle) * explosionForce;

            this.childs.push(new Firework(xpos, ypos, xvel, yvel, size, col, true));
        }

        this.size = 0;
    }

    render() {
        noStroke();
        fill(this.col);

        push();
        translate(this.pos.x, this.pos.y);
        var angle = this.vel.heading();

        rotate(angle);
        ellipse(0, 0, this.size * 3, this.size);

        pop();

        this.childs.forEach(child => {
            child.render();
        });
    }
}