import { type P5CanvasInstance } from 'react-p5-wrapper';
import { Vector2 } from '@common/Vector';

export class Phase {
	private id: number;
	private factor: number;
	private baseSize: number;

	private position: Vector2;
	private radius: number;
	private color: any;

	private point = Vector2.zero();

	private subPhase: Phase | null = null;

	constructor({
		i = 0,
		position = Vector2.zero(),
		baseSize,
		color,
	}: {
		i?: number;
		position?: Vector2;
		baseSize: number;
		color: any;
	}) {
		this.id = i;
		this.factor = i * 2 + 1;

		this.baseSize = baseSize;
		this.position = position;
		this.radius = baseSize / (Math.PI * this.factor);

		this.color = color;
	}

	update(angle: number): any {
		this.point.x = Math.cos(angle * this.factor) * this.radius;
		this.point.y = Math.sin(angle * this.factor) * this.radius;

		this.subPhase?.setPosition({ ...this.point });
		this.subPhase?.update(angle);
	}

	setPosition(position: Vector2) {
		this.position = position;
	}

	getPoint(): Vector2 {
		let subPoint = this.subPhase?.getPoint() ?? Vector2.zero();
		return new Vector2(this.point.x + subPoint.x, this.point.y + subPoint.y);
	}

	render(p5: P5CanvasInstance) {
		p5.push();

		p5.strokeWeight(2);
		p5.stroke(this.color);
		p5.noFill();

		p5.translate(this.position.x, this.position.y);
		p5.circle(0, 0, this.radius * 2);

		p5.stroke(33, 26, 77, 127);
		p5.line(0, 0, this.point.x, this.point.y);

		this.subPhase?.render(p5);

		p5.pop();
	}

	createSubPhase(p5: P5CanvasInstance) {
		if (!this.subPhase) {
			this.subPhase = new Phase({
				i: this.id + 1,
				baseSize: this.baseSize,
				color: this.color,
			});
		} else {
			this.subPhase.createSubPhase(p5);
		}
	}
}
