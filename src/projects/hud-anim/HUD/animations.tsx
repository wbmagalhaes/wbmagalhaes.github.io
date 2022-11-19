const pulse = {
	hidden: {
		opacity: 0,
	},
	show: () => ({
		opacity: [0, 1, 0],
		transition: {
			repeat: Infinity,
			duration: 2,
			ease: 'easeInOut',
			delay: Math.random() * 2,
		},
	}),
};

const rotate = {
	hidden: {
		rotate: 0,
	},
	show: {
		rotate: 180,
		transition: {
			repeat: Infinity,
			duration: 2,
			ease: 'linear',
		},
	},
};

const fillRect = {
	hidden: {
		scaleX: 0.15,
		originX: 0,
	},
	show: () => ({
		scaleX: [0.15, 1, 0.15],
		originX: 0,
		transition: {
			duration: 1.75,
			repeat: Infinity,
			ease: 'easeInOut',
			delay: Math.random() * 2,
		},
	}),
};

const flash = {
	hidden: {
		opacity: 0,
	},
	show: (delay: number = 0) => ({
		opacity: [0, 0, 1, 0, 1],
		transition: {
			ease: 'easeInOut',
			duration: 0.75,
			delay: delay,
		},
	}),
};

const fadeIn = {
	hidden: {
		opacity: 0,
	},
	show: (delay: number = 0) => ({
		opacity: 1,
		transition: {
			duration: 0.5,
			ease: 'easeInOut',
			delay: delay,
		},
	}),
};

const fillPath = {
	hidden: {
		opacity: 0,
		pathLength: 0,
	},
	show: ({ delay, duration }: { delay: number; duration: number }) => ({
		opacity: 1,
		pathLength: 1,
		transition: {
			opacity: {
				duration: 0.01,
			},
			duration: duration,
			ease: 'easeInOut',
			delay: delay,
		},
	}),
};

const fillPathMiddle = {
	hidden: {
		opacity: 0,
		pathLength: 0,
		pathOffset: 0.5,
	},
	show: ({ delay, duration }: { delay: number; duration: number }) => ({
		opacity: 1,
		pathLength: 1,
		pathOffset: 0,
		transition: {
			opacity: {
				duration: 0.01,
			},
			duration: duration,
			ease: 'easeInOut',
			delay: delay,
		},
	}),
};

const slideFromLeft = {
	hidden: {
		x: -50,
	},
	show: ({ delay, duration }: { delay: number; duration: number }) => ({
		x: 0,
		transition: {
			duration: duration,
			ease: 'backOut',
			delay: delay,
		},
	}),
};

const slideFromRight = {
	hidden: {
		x: 50,
	},
	show: ({ delay, duration }: { delay: number; duration: number }) => ({
		x: 0,
		transition: {
			duration: duration,
			ease: 'backOut',
			delay: delay,
		},
	}),
};

export { pulse, rotate, flash, fadeIn, fillPath, fillPathMiddle, fillRect, slideFromLeft, slideFromRight };
