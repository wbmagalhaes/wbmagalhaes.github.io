class Boid {

	constructor(col, config) {
		this.sameBoids = [];
		this.diffBoids = [];

		this.size = random(10.0, 14.0);
		this.maxVel = random(2.0, 4.0);
		this.minAcc = random(0.001, 0.005);
		this.maxAcc = random(0.05, 0.1);
		this.perceptDist = random(50.0, 100.0);
		this.visionRange = random(-0.1, 0.4);

		this.position = createVector(random(-1.0, 1.0), random(-1.0, 1.0)).setMag(5);
		this.velocity = createVector(random(-1.0, 1.0), random(-1.0, 1.0));
		this.acceleration = createVector(0);

		this.col = col;
		this.angle = 0;

		this.config = config;
	}

	percept(boids) {
		this.sameBoids = [];
		this.diffBoids = [];

		boids.forEach(boid => {
			if (boid != this) {
				var dir = createVector(0).add(boid.position).sub(this.position);
				var dot = p5.Vector.dot(this.velocity, dir);

				if (dir.mag() <= this.perceptDist && dot > this.visionRange) {
					if (boid.col == this.col)
						this.sameBoids.push(boid);
					else
						this.diffBoids.push(boid);
				}
			}
		});
	}

	steer() {
		var totalAlignment = createVector(0);
		var totalCohesion = createVector(0);
		var totalRepulsion = createVector(0);
		var totalClear = createVector(0);

		this.sameBoids.forEach(boid => {
			totalAlignment.add(this.alignmentWith(boid));
			totalCohesion.add(this.cohesionWith(boid));
			totalRepulsion.add(this.repulsionWith(boid));
			totalClear.add(this.clearWith(boid));
		});

		this.diffBoids.forEach(boid => {
			totalAlignment.add(this.alignmentWith(boid).mult(max(1 - this.config.xenoWeight, 0)));
			totalCohesion.add(this.cohesionWith(boid).mult(max(1 - this.config.xenoWeight, 0)));
			totalRepulsion.add(this.repulsionWith(boid).mult(1 + this.config.xenoWeight));
			totalClear.add(this.clearWith(boid));
		});

		this.acceleration.add(this.velocity).setMag(this.minAcc);
		this.acceleration.add(this.repulsionWithMouse());
		this.acceleration.add(totalAlignment.setMag(this.config.alignmentWeight));
		this.acceleration.add(totalCohesion.setMag(this.config.cohesionWeight));
		this.acceleration.add(totalRepulsion.setMag(this.config.repulsionWeight));
		this.acceleration.add(totalClear.setMag(this.config.clearWeight));
	}

	alignmentWith(boid) {
		var result = createVector(0).add(boid.velocity).sub(this.velocity);
		return result;
	}

	cohesionWith(boid) {
		var result = createVector(0).add(boid.position).sub(this.position);
		var s = 1 + max(0, boid.size - this.size);
		return result.mult(s);
	}

	repulsionWith(boid) {
		var result = createVector(0).add(this.position).sub(boid.position);

		var d = result.mag();
		result.div(d ** 2);
		return result;
	}

	repulsionWithMouse() {
		var result = createVector(mouseX - width / 2, mouseY - height / 2).sub(this.position);
		var d = result.mag();

		if (d < mouseRadius) {
			result.div(-d);
			return result;
		}

		return createVector(0);
	}

	clearWith(boid) {
		var d = createVector(0).add(boid.position).sub(this.position);

		var dir1 = createVector(-d.y, d.x);
		var dir2 = createVector(d.y, -d.x);

		var dot1 = p5.Vector.dot(this.velocity, dir1);
		var dot2 = p5.Vector.dot(this.velocity, dir2);

		if (dot1 > dot2)
			return dir1;
		else
			return dir2;
	}

	update() {
		this.acceleration.limit(this.maxAcc);
		this.velocity.add(this.acceleration);
		this.velocity.limit(this.maxVel);
		this.position.add(this.velocity);
		this.acceleration.mult(0);

		// Check left and right edges
		if (this.position.x < (-width - this.size) / 2.0)
			this.position.x = (width + this.size) / 2.0;
		else if (this.position.x > (width + this.size) / 2.0)
			this.position.x = (-width - this.size) / 2.0;

		// Check top and bottom edges
		if (this.position.y < (-height - this.size) / 2.0)
			this.position.y = (height + this.size) / 2.0;
		else if (this.position.y > (height + this.size) / 2.0)
			this.position.y = (-height - this.size) / 2.0;
	}

	show() {
		var s = this.size / 3.0;

		var targetAngle = HALF_PI + this.velocity.heading()
		this.angle = Boid.lerpAngle(this.angle, targetAngle, 0.2);

		push();
		translate(this.position);
		rotate(this.angle);

		fill(this.col);
		noStroke();
		triangle(-s, 0, s, 0, 0, -this.size);
		pop();
	}

	static lerpAngle(a, b, i) {
		var va = p5.Vector.fromAngle(a)
		var vb = p5.Vector.fromAngle(b)
		return p5.Vector.lerp(va, vb, i).heading();
	}
}