class Ball {
	constructor(x, y, radius, speed) {
		this.startX = x;
		this.startY = y;
		this.speed = speed;

		this.position = new Vector(x, y);
		this.radius = radius;

		this.velocity = new Vector(random(-1.0, 1.0), 1).normalize().multiply(speed);
	}

	move(dt) {
		this.position.add(Vector.multiply(this.velocity, dt));
	}

	gameover() {
		return (this.position.y > height - this.radius);
	}

	collideWalls() {
		let result = false;

		if (this.position.x < this.radius) {
			this.position.x = this.radius;
			this.velocity.x *= -1;
			result = true;
		}
		else if (this.position.x > width - this.radius) {
			this.position.x = width - this.radius;
			this.velocity.x *= -1;
			result = true;
		}

		if (this.position.y < this.radius) {
			this.position.y = this.radius;
			this.velocity.y *= -1;
			result = true;
		}

		return result;
	}

	collideRect(rect) {
		if (this.position.y + this.radius > rect.center.y - rect.size.y / 2 &&
			this.position.y - this.radius < rect.center.y + rect.size.y / 2 &&
			this.position.x + this.radius > rect.center.x - rect.size.x / 2 &&
			this.position.x - this.radius < rect.center.x + rect.size.x / 2) {

			let nearX = Math.max(rect.center.x - rect.size.x / 2, Math.min(this.position.x, rect.center.x + rect.size.x / 2));
			let nearY = Math.max(rect.center.y - rect.size.y / 2, Math.min(this.position.y, rect.center.y + rect.size.y / 2));

			let normal = new Vector(this.position.x - nearX, this.position.y - nearY);

			if (this.velocity.dot(normal) < 0) {
				let penetrationDepth = normal.magnitude() - this.radius;
				normal.normalize();

				let penetrationVector = Vector.multiply(normal, penetrationDepth);
				this.position.subtract(penetrationVector);

				this.velocity.reflect(normal);
			}

			return true;
		}

		return false;
	}

	render() {
		noStroke();
		fill(255)

		circle(this.position.x, this.position.y, this.radius * 2);
	}

	reset() {
		this.position = new Vector(this.startX, this.startY);
		this.velocity = new Vector(random(-1.0, 1.0), 1).normalize().multiply(this.speed);
	}
}