class Globe {
	constructor(idx, xpos, zpos, col) {
		this.idx = idx;
		this.position = createVector(xpos, 0, zpos);
		this.radius = sphereSize / 2;
		this.col = col;
	}

	update(t) {
		var angle = TWO_PI * (this.idx / spheresNumber + (this.idx % circlesNumber) / circlesNumber);
		this.position.y = cos(t + angle) * maxHeight - maxHeight;
	}

	draw() {
		stroke(0);
		strokeWeight(1);
		line(this.position.x, 0, this.position.z, this.position.x, this.position.y, this.position.z);

		noStroke();
		fill(this.col);

		push();
		translate(this.position);
		sphere(this.radius);
		pop();
	}
}