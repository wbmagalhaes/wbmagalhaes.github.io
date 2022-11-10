class Brick {
	constructor(x, y, w, h, color) {
		this.rect = new Rect(x, y, w, h);
		this.color = color;
		this.active = true;
	}

	render() {
		noStroke();
		fill(this.color);
		this.rect.render();
	}

	reset() {
		this.active = true;
	}
}
