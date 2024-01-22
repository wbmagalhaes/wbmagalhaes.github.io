import { type P5CanvasInstance } from '@p5-wrapper/react';

export class Food {
	position: any;
	eaten: boolean;

	private size: number;
	private color: any;

	constructor(p5: P5CanvasInstance) {
		this.size = 6;
		this.color = p5.color(232, 54, 45);

		this.position = p5.createVector(p5.random(-1, 1), p5.random(-1, 1)).mult(p5.height / 2);
		this.eaten = false;
	}

	render(p5: P5CanvasInstance) {
		if (this.eaten) {
			return;
		}

		p5.push();

		p5.translate(this.position);

		p5.noStroke();
		p5.fill(this.color);

		let a = this.size / 2;
		let b = this.size;

		p5.beginShape();
		p5.vertex(0, +a);
		p5.vertex(-b, +b);
		p5.vertex(-a, 0);
		p5.vertex(-b, -b);
		p5.vertex(0, -a);
		p5.vertex(+b, -b);
		p5.vertex(+a, 0);
		p5.vertex(+b, +b);
		p5.endShape(p5.CLOSE);

		p5.pop();
	}

	setEaten() {
		if (this.eaten) {
			return;
		}

		this.eaten = true;
	}

	recycle(p5: P5CanvasInstance) {
		if (!this.eaten) {
			return;
		}

		this.position = p5.createVector(p5.random(-1, 1), p5.random(-1, 1)).mult(p5.height / 2);
		this.eaten = false;
	}
}
