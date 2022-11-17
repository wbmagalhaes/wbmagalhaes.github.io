import { P5CanvasInstance } from 'react-p5-wrapper';

export class Boid {
	private size: number;
	private maxVel: number;
	private maxAcc: number;

	private position: any;
	private velocity: any;
	private acceleration: any;
	private color: any;

	private totalAlignment: any;
	private totalCohesion: any;
	private totalRepulsion: any;
	private totalClear: any;

	constructor(p5: P5CanvasInstance) {
		this.size = 12;
		this.maxVel = 3;
		this.maxAcc = 0.1;

		this.position = p5.createVector(p5.random(-1, 1), p5.random(-1, 1)).setMag(100);
		this.velocity = p5.createVector(p5.random(1, 2), p5.random(-1, 1));
		this.acceleration = p5.createVector(0);

		this.totalAlignment = p5.createVector(0);
		this.totalCohesion = p5.createVector(0);
		this.totalRepulsion = p5.createVector(0);
		this.totalClear = p5.createVector(0);

		this.color = p5.color(255);
	}

	steer(others: Boid[], p5: P5CanvasInstance) {
		this.totalAlignment.mult(0);
		this.totalCohesion.mult(0);
		this.totalRepulsion.mult(0);
		this.totalClear.mult(0);

		others.forEach((boid) => {
			this.totalAlignment.add(this.alignmentWith(boid, p5));
			this.totalCohesion.add(this.cohesionWith(boid, p5));
			this.totalRepulsion.add(this.repulsionWith(boid, p5));
			this.totalClear.add(this.clearWith(boid, p5));
		});

		this.acceleration.mult(0);
		this.acceleration.add(this.totalAlignment.mult(1));
		this.acceleration.add(this.totalCohesion.mult(1));
		this.acceleration.add(this.totalRepulsion.mult(5));
		this.acceleration.add(this.totalClear.mult(3));
		this.acceleration.limit(this.maxAcc);
	}

	alignmentWith(boid: Boid, p5: P5CanvasInstance) {
		let result = p5.createVector(0).add(boid.velocity).sub(this.velocity);
		return result;
	}

	cohesionWith(boid: Boid, p5: P5CanvasInstance) {
		let result = p5.createVector(0).add(boid.position).sub(this.position);
		let s = 1 + p5.max(0, boid.size - this.size);
		return result.mult(s);
	}

	repulsionWith(boid: Boid, p5: P5CanvasInstance) {
		let result = p5.createVector(0).add(this.position).sub(boid.position);
		let d = result.mag();

		if (d > 0) {
			result.div(d * d);
		}

		return result;
	}

	clearWith(boid: Boid, p5: P5CanvasInstance) {
		let d = p5.createVector(0).add(boid.position).sub(this.position);

		let dir1 = p5.createVector(-d.y, d.x);
		let dir2 = p5.createVector(d.y, -d.x);

		let dot1 = this.velocity.dot(dir1);
		let dot2 = this.velocity.dot(dir2);

		return dot1 > dot2 ? dir1 : dir2;
	}

	update(p5: P5CanvasInstance) {
		this.velocity.add(this.acceleration).limit(this.maxVel);
		this.position.add(this.velocity);

		// Check left and right edges
		if (this.position.x < (-p5.width - this.size) / 2.0) this.position.x = (p5.width + this.size) / 2.0;
		else if (this.position.x > (p5.width + this.size) / 2.0) this.position.x = (-p5.width - this.size) / 2.0;

		// Check top and bottom edges
		if (this.position.y < (-p5.height - this.size) / 2.0) this.position.y = (p5.height + this.size) / 2.0;
		else if (this.position.y > (p5.height + this.size) / 2.0) this.position.y = (-p5.height - this.size) / 2.0;
	}

	render(p5: P5CanvasInstance) {
		let s = this.size / 3.0;

		p5.push();

		p5.translate(p5.width / 2, p5.height / 2);

		p5.translate(this.position);
		p5.rotate(this.velocity.heading() + Math.PI / 2);

		p5.fill(this.color);
		p5.noStroke();
		p5.triangle(-s, 0, s, 0, 0, -this.size);

		p5.pop();
	}
}
