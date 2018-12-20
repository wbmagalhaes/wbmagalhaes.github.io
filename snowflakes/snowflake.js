function randomSize(min, std) {
    var r = randomGaussian() * std;
    return min + (r * r);
}

class Snowflakes {
    constructor() {
        this.generate();
    }

    generate() {
        this.size = randomSize(6, 1.2);

        var x = random(this.size, width - this.size);
        var y = -random(this.size, height);

        this.z = this.size / 10.0;

        this.pos = createVector(x, y);
        this.vel = createVector(0, random(0.4, 1.2));
        this.acc = createVector(0);

        this.maxVel = random(2.0, 4.0) * this.z;

        var dir = random(1.0) > 0.5 ? 1 : -1;

        this.angle = random(TWO_PI);
        this.spin = random(0.016, 0.020) * this.z * dir

        this.offSet = 0;
        this.swing = random(4.0, 16.0) * this.z;
    }

    applyForce(force) {
        var f = force.copy();
        f.mult(this.z);
        this.acc.add(f);
    }

    update() {
        this.angle += this.spin;
        this.offSet = sin(this.angle) * this.swing;

        this.vel.add(this.acc);
        this.vel.limit(this.maxVel);

        this.pos.add(this.vel);
        this.acc.mult(0);

        if (this.pos.y > height + this.size)
            this.generate();

        if (this.pos.x > width + this.size * 2)
            this.pos.x = -this.size * 2;
        else if (this.pos.x < - this.size * 2)
            this.pos.x = width + this.size * 2;
    }

    draw() {
        push();
        translate(this.pos.x + this.offSet, this.pos.y);
        rotate(this.angle);

        noFill();
        strokeWeight(1.2 * this.z);
        stroke(255, 255 * this.z);

        for (var i = 0; i < 3; i++) {
            line(0, -this.size / 2, 0, this.size / 2);
            rotate(PI / 3);
        }

        pop();
    }
}