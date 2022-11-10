class ElementBox {
	constructor(element) {
		this.name = element['name'];
		this.symbol = element['symbol'];

		this.Z = element['Z'];
		this.mass = element['mass'];

		var position = element['position'];
		this.pos = createVector(position['x'] - 1, position['y'] - 1);

		this.col = color(element['color']);
		this.discover_year = element['discover_year'];
	}

	draw() {
		if (currentYear >= this.discover_year) {
			stroke(0);
			fill(this.col);

			push();
			translate(this.pos.x * boxSize.x, this.pos.y * boxSize.y);
			rect(0, 0, boxSize.x, boxSize.y);

			noStroke();
			fill(0);

			textAlign(LEFT, TOP);
			textSize(8);
			text(this.mass, 4, 4);

			textAlign(CENTER, CENTER);
			textSize(18);
			text(this.symbol, boxSize.x / 2, boxSize.y / 2 - 5);

			textSize(8);
			text(this.name, boxSize.x / 2, boxSize.y / 2 + 12);

			textAlign(CENTER, BOTTOM);
			textSize(10);
			text(this.Z, boxSize.x / 2, boxSize.y - 2);
			pop();
		}
	}
}
