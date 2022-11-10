class Orbital {
	constructor(size, wf) {
		this.points = [];

		this.maximum = 0;
		this.minimum = 5000;

		const step = 32;
		const threshold = 0.005;

		for (let i = 0; i < 2 * size; i += step) {
			for (let j = 0; j < 2 * size; j += step) {
				for (let k = 0; k < 2 * size; k += step) {
					const x = i - size;
					const y = j - size;
					const z = k - size;

					const point = new Point(x, y, z, size, wf);

					if (point.value > threshold) {
						const l = new Point(x + 0, y + step, z + 0, size, wf);
						const r = new Point(x + 0, y - step, z + 0, size, wf);
						const b = new Point(x - step, y + 0, z + 0, size, wf);
						const f = new Point(x + step, y + 0, z + 0, size, wf);
						const u = new Point(x + 0, y + 0, z + step, size, wf);
						const d = new Point(x + 0, y + 0, z - step, size, wf);

						if (
							u.value < threshold ||
							d.value < threshold ||
							l.value < threshold ||
							r.value < threshold ||
							f.value < threshold ||
							b.value < threshold
						) {
							this.maximum = Math.max(point.value, this.maximum);
							this.minimum = Math.min(point.value, this.minimum);
							this.points.push(point);
						}
					}
				}
			}
		}
	}

	render() {
		this.points.forEach((point) => {
			point.render(this.minimum, this.maximum);
		});
	}
}
