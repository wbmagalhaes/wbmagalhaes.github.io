import { useEffect } from 'react';

export function useScroll(onScroll: () => void) {
	useEffect(() => {
		window.addEventListener('scroll', onScroll);

		return () => {
			window.removeEventListener('scroll', onScroll);
		};
	});
}
