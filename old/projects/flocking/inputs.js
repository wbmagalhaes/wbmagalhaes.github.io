class Config {
	constructor(holder) {
		this.alignmentWeight = random(1.0, 2.0);
		this.cohesionWeight = random(1.0, 2.0);
		this.repulsionWeight = random(0.5, 1.5);
		this.clearWeight = random(0.2, 0.5);
		this.xenoWeight = random(0.1, 1.0);

		this.alignmentSlider = Config.newInputSlider('Align', holder, this.alignmentWeight);
		this.cohesionSlider = Config.newInputSlider('Cohes', holder, this.cohesionWeight);
		this.repulsionSlider = Config.newInputSlider('Repul', holder, this.repulsionWeight);
		this.clearSlider = Config.newInputSlider('Clear', holder, this.clearWeight);
		this.xenoSlider = Config.newInputSlider('Xeno', holder, this.xenoWeight);
	}

	static newInputSlider(name, parent, value) {
		var title = createP(name);
		title.parent(parent);
		title.class('text-center');

		var slider = createSlider(0, 3, value, 0.1);
		slider.class('form-control-range');
		slider.parent(parent);
		return slider;
	}

	update() {
		this.alignmentWeight = this.alignmentSlider.value();
		this.cohesionWeight = this.cohesionSlider.value();
		this.repulsionWeight = this.repulsionSlider.value();
		this.clearWeight = this.clearSlider.value();
		this.xenoWeight = this.xenoSlider.value();
	}
}
