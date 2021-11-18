class Orbital {
	constructor(size, n_points, wave_function, is_3d) {
		this.points = [];
		this.maximum = 0;
		this.is_3d = is_3d;

		for (let i = 0; i < n_points; i++) {
			const x = ((Math.random() * 2.0) - 1.0) * size;
			const y = is_3d ? ((Math.random() * 2.0) - 1.0) * size : 0;
			const z = ((Math.random() * 2.0) - 1.0) * size;

			const r = sqrt(x * x + y * y + z * z);
			const theta = acos(z / r);
			const phi = atan(y / x);

			const psi = wave_function(30 * r / size, theta, phi);

			if (abs(psi) > 0.005) {
				this.maximum = Math.max(abs(psi), this.maximum);
				this.points.push(new Point(x, y, z, psi));
			}
		}
	}

	render() {
		for (let i = 0; i < this.points.length; i++) {
			const pt = this.points[i];
			push();
			translate(pt.x, pt.y, pt.z);

			const radius = (this.is_3d ? 6 : 12) * abs(pt.psi) / this.maximum;

			if (pt.psi > 0)
				fill(48, 48, 255);
			else
				fill(255, 48, 48);

			sphere(radius);
			pop();
		}
	}
}