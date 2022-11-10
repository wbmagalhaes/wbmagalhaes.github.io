class Tab {
	constructor(ypos, isCPU) {
		this.score = 0;
		this.isCPU = isCPU;

		this.position = createVector(width / 2, ypos);
		this.targetX = 0;
		this.speed = isCPU ? 0.3 : 0.3;

		this.trackedBall = null;
		this.side = sign(ypos - height / 2);
		this.predPos = width / 2;

		this.variance = 5;
	}

	update() {
		this.targetX = this.isCPU ? this.predPos : mouseX;

		this.targetX = max(this.targetX, tabWide / 2);
		this.targetX = min(this.targetX, width - tabWide / 2);

		this.position.x = lerp(this.position.x, this.targetX, this.speed);

		if (this.isCPU) this.findBall();
	}

	show() {
		noStroke();
		fill(255);

		rectMode(CENTER);
		rect(this.position.x, this.position.y, tabWide, tabThick);
	}

	reset() {
		this.trackedBall = null;
		predBall();
	}

	findBall() {
		if (!this.isCPU) return;

		var ball = null;

		var tmin = Infinity;
		balls.forEach((b) => {
			if (sign(b.velocity.y) == this.side) {
				var d = b.position.y - this.position.y;
				var t = abs(d / b.velocity.y);
				if (t < tmin) {
					ball = b;
					tmin = t;
				}
			}
		});

		if (this.trackedBall != ball) {
			this.trackedBall = ball;
			if (this.trackedBall == null) this.predPos = width / 2;
			else this.predPos = this.predictPos(0, this.trackedBall.position, this.trackedBall.velocity);
		}
	}

	predictPos(depth, pos, vel) {
		depth++;
		if (depth > 10) return width / 2;

		var y = this.position.y - tabThick * this.side;
		var dy = y - pos.y;
		var t = dy / vel.y;
		var x = vel.x * t + pos.x;
		x += randomGaussian(-1.0, 1.0) * this.variance;

		x = max(x, 0);
		x = min(x, width);

		if (x == width || x == 0) {
			var dx = x - pos.x;
			t = dx / vel.x;
			var y = vel.y * t + pos.y;
			y += randomGaussian(-1.0, 1.0) * this.variance;

			var newPos = createVector(x, y);
			var newVel = createVector(-vel.x, vel.y);
			return this.predictPos(depth, newPos, newVel);
		}

		return x;
	}
}
