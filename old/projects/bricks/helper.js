class Vector {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	magnitude() {
		return Math.hypot(this.x, this.y);
	}

	normalize() {
		let mag = this.magnitude();
		if (mag == 0) return this;

		return this.multiply(1 / mag);
	}

	add(vector) {
		this.x += vector.x;
		this.y += vector.y;
		return this;
	}

	subtract(vector) {
		this.x -= vector.x;
		this.y -= vector.y;
		return this;
	}

	multiply(scalar) {
		this.x *= scalar;
		this.y *= scalar;
		return this;
	}

	static add(vectorA, vectorB) {
		return new Vector(vectorA.x + vectorB.x, vectorA.y + vectorB.y);
	}

	static subtract(vectorA, vectorB) {
		return new Vector(vectorA.x - vectorB.x, vectorA.y - vectorB.y);
	}

	static multiply(vector, scalar) {
		return new Vector(vector.x * scalar, vector.y * scalar);
	}

	dot(vector) {
		return this.x * vector.x + this.y * vector.y;
	}

	reflect(normal) {
		return this.subtract(normal.multiply(2 * this.dot(normal)));
	}
}

class Rect {
	constructor(x, y, w, h) {
		this.center = new Vector(x, y);
		this.size = new Vector(w, h);
	}

	render() {
		rectMode(CENTER);
		rect(this.center.x, this.center.y, this.size.x, this.size.y);
	}
}

function clamp(x, min, max) {
	return Math.min(Math.max(x, min), max);
}
