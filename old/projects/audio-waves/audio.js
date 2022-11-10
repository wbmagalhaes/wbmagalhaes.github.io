const BarWidth = 4;
const BarGap = 2;

$(document).ready(function () {
	$('#audio-holder').load('./audio.html', (_) => {
		setWave();

		let timeInterval = null;
		$('.wave-btn').click(function () {
			timeInterval = pulseWave(timeInterval);
		});
	});
});

function getWidth() {
	return $('.audio')[0].clientWidth * 0.8;
}

function setWave() {
	const BarHolder = $('.bar-holder');
	BarHolder.text('');

	const width = getWidth();
	const n = ~~((width + BarGap) / (BarWidth + BarGap));

	for (let i = 0; i < n; i++) {
		const pos = i * (BarWidth + BarGap) - width / 2 + BarWidth;
		const delay = ~~(-80000 + Math.abs(i - n / 2) * 240);

		const waveA = 5 * Math.cos((pos * 1 * Math.PI) / width);
		const waveB = 1 * Math.cos((pos * 3 * Math.PI) / width);
		const waveC = 2 * Math.cos((pos * 9 * Math.PI) / width);
		const wave = (waveA * waveB * waveC) / 10;

		const maxHeight = Math.abs(wave);
		const minHeight = maxHeight * 0.33;

		const newBar = `<rect class="bar" x="${pos}" y="-200" width="${BarWidth}" height="400"
			style="
			--delay: ${delay}ms;
			--minHeight: ${minHeight};
			--maxHeight: ${maxHeight};"
			</rect>`;

		BarHolder.append(newBar);
	}

	$('#audio-holder').html($('#audio-holder').html());
}

function pulseWave(timeInterval) {
	if (timeInterval != null) {
		clearInterval(timeInterval);
	}

	const bars = $('.bar');
	timeInterval = setInterval(frame, 10);

	let x = 0;

	const width = getWidth();
	const n = bars.length;
	const lim = 2;

	function frame() {
		if (x > lim) {
			clearInterval(timeInterval);
		} else {
			for (let i = 0; i < n; i++) {
				const pos = i * (BarWidth + BarGap) - width / 2 + BarWidth;

				const input = 11 * (x - Math.abs((pos * Math.PI) / width));

				const waveA = Math.cos(clamp(input, -Math.PI, Math.PI));
				const waveB = Math.cos((pos * Math.PI) / width);

				const pulse = Math.max(0, 0.8 * waveA * waveB * waveB);
				bars[i].style.setProperty('--pulse', pulse);
			}

			x += 0.02;
		}
	}

	return timeInterval;
}

function clamp(x, min, max) {
	return Math.min(Math.max(x, min), max);
}
