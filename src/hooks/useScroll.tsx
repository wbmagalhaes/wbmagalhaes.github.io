import { useEffect, useRef } from 'react';

export function useScroll(onScroll: (y: number) => void) {
	const handler = useRef(onScroll);
	handler.current = onScroll;

	useEffect(() => {
		let frame = 0;

		function read() {
			frame = 0;
			handler.current(window.scrollY);
		}

		function schedule() {
			if (!frame) frame = requestAnimationFrame(read);
		}

		read();
		window.addEventListener('scroll', schedule, { passive: true });
		return () => {
			window.removeEventListener('scroll', schedule);
			cancelAnimationFrame(frame);
		};
	}, []);
}
