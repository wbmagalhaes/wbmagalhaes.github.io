class Phase {
	constructor(idx, pos) {
		this.idx = idx;
		this.factor = (idx * 2 + 1);

		this.position = pos;
		this.col = color(random(256) + 64, random(256) + 64, random(256) + 64);

		this.size = startSize / (PI * this.factor);

		this.angle = 0;
		this.point = createVector(0);

		this.subphase = null;
	}

	update() {
		this.angle += speed;

		var x = cos(this.angle * this.factor) * this.size;
		var y = sin(this.angle * this.factor) * this.size;

		this.point = createVector(x, y);

		if (this.subphase != null) {
			this.subphase.position = this.point;
			return this.point.copy().add(this.subphase.update());
		}

		return this.point.copy();
	}

	draw() {
		stroke(this.col);
		noFill();

		push();
		translate(this.position.x, this.position.y);
		ellipse(0, 0, this.size * 2);

		stroke(0);
		line(0, 0, this.point.x, this.point.y);

		if (this.subphase != null)
			this.subphase.draw();

		pop();
	}

	makesubphase() {
		if (this.subphase == null)
			this.subphase = new Phase(this.idx + 1, this.point.copy(), this.size);
		else
			this.subphase.makesubphase();
	}
}