class Galaxy {

	constructor(position, rotation, n_arms, arm_size, n_particles, particle_size, spiral_offset) {
		this.position = position;
		this.rotation = rotation;

		let angle_step = 2 * PI / n_arms;

		this.arms = [];
		for (let i = 0; i < n_arms; i++) {
			let arm = new Arm(angle_step * i, arm_size, n_particles, particle_size, spiral_offset);
			this.arms.push(arm);
		}
	}

	draw() {
		push();

		translate(this.position.x, this.position.y, this.position.z);
		rotateX(this.rotation.x);
		rotateY(this.rotation.y);
		rotateZ(this.rotation.z);

		for (let i = 0; i < this.arms.length; i++) {
			const arm = this.arms[i];
			arm.draw(this.rotation);
		}

		pop();

		this.rotation.z += rotationSpeed * deltaTime;
	}
}

class Arm {

	constructor(angle, size, n_particles, particle_size, spiral_offset) {
		this.angle = angle;
		this.size = size;

		let pos_step = size / n_particles;

		this.particles = [];
		for (let i = 0; i < n_particles; i++) {
			let pos = pos_step * (i + 1);

			let p_size = map(pos, pos_step, size, particle_size, 0.4 * particle_size);
			let p_alpha = map(pos, pos_step, size, 127, 12);

			let particle = new Particle(pos, p_size, spiral_offset * i, p_alpha);
			this.particles.push(particle);
		}
	}

	draw(galaxy_rotation) {
		push();
		rotateZ(this.angle);

		for (let i = 0; i < this.particles.length; i++) {
			const particle = this.particles[i];
			particle.draw(galaxy_rotation, this.angle);
		}

		pop();
	}
}

class Particle {

	constructor(pos_x, size, offset, alpha) {
		this.pos_x = pos_x;
		this.size = size;
		this.offset = offset;
		this.alpha = alpha;

		this.rotZ = random(-PI, PI);
		this.rotZDir = Math.sign(random(-1, 1));
	}

	draw(galaxy_rotation, arm_angle) {
		push();
		rotateZ(this.offset);
		translate(this.pos_x, 0, 0);

		// desfaz as rotações, faz a imagem virar pra camera
		rotateZ(-this.offset);
		rotateZ(-arm_angle);
		rotateZ(-galaxy_rotation.z);
		rotateY(-galaxy_rotation.y);
		rotateX(-galaxy_rotation.x);
		rotateZ(-z_rotation);
		rotateY(-y_rotation);
		rotateX(-x_rotation);

		rotateZ(this.rotZ);
		this.rotZ += 0.00005 * this.rotZDir * deltaTime;

		tint(255, this.alpha);
		texture(dust);
		rect(0, 0, this.size, this.size);

		pop();
	}
}