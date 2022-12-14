import { useEffect } from 'react';

export function useScroll(onScroll: (y: number) => void) {
	function callScroll() {
		onScroll(document.documentElement.scrollTop);
	}

	useEffect(() => {
		callScroll();
		window.addEventListener('scroll', callScroll);
		return () => {
			window.removeEventListener('scroll', callScroll);
		};
	});
}
