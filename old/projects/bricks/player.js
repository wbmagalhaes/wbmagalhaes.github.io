class Player {
	constructor(x, y, w, h) {
		this.rect = new Rect(x, y, w, h);

		this.minX = w / 2 + h / 2;
		this.maxX = width - w / 2 - h / 2;
	}

	move(x) {
		this.rect.center.x = clamp(x, this.minX, this.maxX);
	}

	render() {
		noStroke();
		fill(255);
		this.rect.render();
	}
}
