import { P5CanvasInstance } from 'react-p5-wrapper';

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

		p5.fill(this.color);
		p5.noStroke();
		p5.circle(0, 0, this.size);

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
