$(document).ready(function () {

	$('#hud-holder').load('./hud.html', _ => {
		setLength('.hud-border path');
		setLength('.hud-arc path');
		setLength('.hud-border-bottom path');
		setLength('.hud-arrows .arrow path');

		setDurationDelay('.hud-map rect', 5000, 8000, -15000, -2000);

		const mapLines = $('.hud-map .lines path');
		for (let i = 0; i < mapLines.length; i++) {
			mapLines[i].style.opacity = getRandomArbitrary(0.1, 0.5);
		}

		setDurationDelay('.hud-top .pulse');
		setDurationDelay('.hud-bottom .pulse', 500, 3000, -5000, -100);
		setDurationDelay('.hud-bottom .fill-up', 750, 3000, -5000, -100);
	});
});

function setLength(query) {
	const elements = $(query);

	for (let i = 0; i < elements.length; i++) {
		const element = elements[i];
		const length = element.getTotalLength();

		element.style = '--path-length: ' + length + 'px;';
	}
}

function setDurationDelay(query, duMin = 400, duMax = 600, deMin = -500, deMax = -100) {
	const elements = $(query);

	for (let i = 0; i < elements.length; i++) {
		const element = elements[i];

		const delay = ~~getRandomArbitrary(deMin, deMax);
		const duration = ~~getRandomArbitrary(duMin, duMax);

		element.style =
			'animation-delay: ' + delay + 'ms;' +
			'animation-duration: ' + duration + 'ms;';
	}
}

function getRandomArbitrary(min, max) {
	return Math.random() * (max - min) + min;
}
