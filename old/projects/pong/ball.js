class Ball {
	constructor() {
		this.reset(random(-1.0, 1.0));
	}

	update() {
		var hitDist = this.checkhitTab();

		if (hitDist != 0) {
			this.velocity.y *= -1;
			var dir = this.velocity.x > 0 ? 1 : -1;
			this.velocity.x += dir * hitDist;
			this.speed += incrementSpeed;
			this.speed = min(this.speed, maxSpeed);
			this.velocity.setMag(this.speed);
			predBall();
		}

		if (this.checkHitWall()) {
			this.velocity.x *= -1;
			this.speed += incrementSpeed;
			this.speed = min(this.speed, maxSpeed);
			this.velocity.setMag(this.speed);
			predBall();
		}

		this.position.add(this.velocity);

		return this.checkHitGoal();
	}

	reset(dir) {
		this.position = createVector(width / 2, height / 2);

		this.speed = startSpeed;
		this.velocity = createVector(random(-9.0, 9.0), random(3.0, 3.0) * dir).setMag(this.speed);
	}

	show() {
		noStroke();
		fill(255);

		ellipseMode(CENTER);
		ellipse(this.position.x, this.position.y, ballSize);
	}

	checkHitGoal() {
		if (this.position.y < 0) return 2;
		else if (this.position.y > height) return 1;
		return 0;
	}

	checkHitWall() {
		return this.position.x < 0 || this.position.x > width;
	}

	checkhitTab() {
		if (this.velocity.y < 0 && this.position.y <= tabThick + tabYPos) {
			if (this.position.x < tabA.position.x + tabWide / 2 && this.position.x > tabA.position.x - tabWide / 2)
				return abs(this.position.x - tabA.position.x) / tabWide;
		} else if (this.velocity.y > 0 && this.position.y >= height - tabThick - tabYPos) {
			if (this.position.x < tabB.position.x + tabWide / 2 && this.position.x > tabB.position.x - tabWide / 2) {
				return abs(this.position.x - tabB.position.x) / tabWide;
			}
		}

		return 0;
	}
}
