import { P5CanvasInstance } from 'react-p5-wrapper';

export class Boid {
	private position: any;
	private velocity: any;
	private acceleration: any;

	private size: number;
	private visionRange: number;
	private color: any;

	private maxVel = 100;
	private maxAcc = 100;

	private alignmentWeight = 2.5;
	private cohesionWeight = 3;
	private repulsionWeight = 32;
	private clearWeight = 0.5;

	private calcAlignment: any;
	private calcCohesion: any;
	private calcRepulsion: any;
	private calcClear: any;
	private clearDirA: any;
	private clearDirB: any;

	private totalAlignment: any;
	private totalCohesion: any;
	private totalRepulsion: any;
	private totalClear: any;

	constructor(p5: P5CanvasInstance) {
		this.position = p5.createVector(p5.random(-1, 1), p5.random(-1, 1)).mult(250);
		this.velocity = p5.createVector(p5.random(-1, 1), p5.random(-1, 1)).mult(100);
		this.acceleration = p5.createVector(0);

		this.calcAlignment = p5.createVector(0);
		this.calcCohesion = p5.createVector(0);
		this.calcRepulsion = p5.createVector(0);
		this.calcClear = p5.createVector(0);
		this.clearDirA = p5.createVector(0);
		this.clearDirB = p5.createVector(0);

		this.totalAlignment = p5.createVector(0);
		this.totalCohesion = p5.createVector(0);
		this.totalRepulsion = p5.createVector(0);
		this.totalClear = p5.createVector(0);

		this.size = p5.random(12, 18);
		this.visionRange = this.size * 10;
		this.color = p5.color(p5.random(80, 200));
	}

	steer(others: Boid[]) {
		this.totalAlignment.mult(0);
		this.totalCohesion.mult(0);
		this.totalRepulsion.mult(0);
		this.totalClear.mult(0);

		others.forEach((boid) => {
			let dx = boid.position.x - this.position.x;
			let dy = boid.position.y - this.position.y;
			let distSqr = dx * dx + dy * dy;

			if (distSqr <= this.visionRange * this.visionRange) {
				this.totalAlignment.add(this.alignmentWith(boid));
				this.totalCohesion.add(this.cohesionWith(boid));
				this.totalRepulsion.add(this.repulsionWith(boid));
				this.totalClear.add(this.clearWith(boid));
			}
		});

		this.acceleration.mult(0);
		this.acceleration.add(this.totalAlignment.mult(this.alignmentWeight));
		this.acceleration.add(this.totalCohesion.mult(this.cohesionWeight));
		this.acceleration.add(this.totalRepulsion.mult(this.repulsionWeight * 1000));
		this.acceleration.add(this.totalClear.mult(this.clearWeight));
		this.acceleration.limit(this.maxAcc);
	}

	alignmentWith(boid: Boid) {
		this.calcAlignment.mult(0);

		return this.calcAlignment.add(boid.velocity).sub(this.velocity);
	}

	cohesionWith(boid: Boid) {
		this.calcCohesion.mult(0);
		this.calcCohesion.add(boid.position).sub(this.position);

		let s = 1 + Math.max(0, boid.size - this.size);
		return this.calcCohesion.mult(s);
	}

	repulsionWith(boid: Boid) {
		this.calcRepulsion.mult(0);
		this.calcRepulsion.add(boid.position).sub(this.position);

		let x = this.calcRepulsion.x;
		let y = this.calcRepulsion.y;
		let distSqr = x * x + y * y;

		if (distSqr != 0) {
			this.calcRepulsion.div(distSqr);
		}

		return this.calcRepulsion.mult(-1);
	}

	clearWith(boid: Boid) {
		this.calcClear.mult(0);
		this.calcClear.add(boid.position).sub(this.position);

		this.clearDirA.set(-this.calcClear.y, +this.calcClear.x);
		this.clearDirB.set(+this.calcClear.y, -this.calcClear.x);

		let dot1 = this.velocity.dot(this.clearDirA);
		let dot2 = this.velocity.dot(this.clearDirB);

		return dot1 > dot2 ? this.clearDirA : this.clearDirB;
	}

	update(dt: number, canvasSize: { w: number; h: number }) {
		this.velocity.add(this.acceleration.mult(dt)).limit(this.maxVel);
		this.position.add(this.velocity.copy().mult(dt));

		// Check left and right edges
		let limX = (canvasSize.w + this.size) / 2;
		if (this.position.x < -limX) this.position.x = limX;
		else if (this.position.x > limX) this.position.x = -limX;

		// Check top and bottom edges
		let limY = (canvasSize.h + this.size) / 2;
		if (this.position.y < -limY) this.position.y = limY;
		else if (this.position.y > limY) this.position.y = -limY;
	}

	render(p5: P5CanvasInstance) {
		p5.push();

		p5.translate(this.position);
		p5.rotate(this.velocity.heading() + Math.PI / 2);

		p5.fill(this.color);
		p5.noStroke();
		p5.triangle(-this.size / 3, 0, this.size / 3, 0, 0, -this.size);

		p5.pop();
	}
}
