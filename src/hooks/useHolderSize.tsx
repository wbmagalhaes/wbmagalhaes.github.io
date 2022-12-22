import { useRef, useState, useEffect } from 'react';

export function useHolderSize(): [React.RefObject<HTMLDivElement>, { w: number; h: number }] {
	const holderEl = useRef<HTMLDivElement>(null);
	const [size, setSize] = useState({ w: 800, h: 600 });

	useEffect(() => {
		setSize({
			w: holderEl?.current?.offsetWidth ?? 800,
			h: holderEl?.current?.offsetHeight ?? 600,
		});
	}, [holderEl]);

	return [holderEl, size];
}
