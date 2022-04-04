class Point {
	constructor(x, y, z, size, wf) {
		this.x = x;
		this.y = y;
		this.z = z;

		const r = sqrt(x * x + y * y + z * z);
		const theta = acos(z / r);
		const phi = atan(y / x);

		this.psi = wf(30 * r / size, theta, phi);
		this.value = Math.abs(this.psi);
	}

	render(minimum, maximum) {
		push();
		translate(this.x, this.y, this.z);

		const radius = map(this.value, minimum, maximum, 2, 6);
		if (this.psi > 0)
			fill(48, 48, 255);
		else
			fill(255, 48, 48);

		sphere(radius);
		pop();
	}

	map(value, start1, stop1, start2, stop2) {
		return (Math.max(Math.min(((value - start1) / (stop1 - start1) * (stop2 - start2)) + start2, stop2), start2));
	}
}