class Tile {
	constructor(x, y) {
		this.x = floor(x);
		this.y = floor(y);
		this.empty = true;
	}

	show() {
		stroke(98);
		strokeWeight(1);

		if (this.empty)
			fill(0);
		else
			fill(127);

		rect(this.x * tileSize, this.y * tileSize, tileSize, tileSize);
	}
}