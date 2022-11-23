import { useRef, useLayoutEffect } from 'react';
import { Path } from 'three';
import type { LineLoop } from 'three';

type Props = {
	radius: number;
};

export function OrbitLine({ radius }: Props) {
	const ref = useRef<LineLoop>(null);

	useLayoutEffect(() => {
		const path = new Path().absarc(0, 0, radius, 0, 2 * Math.PI, true);
		const points = path.getPoints(32);
		ref.current?.geometry.setFromPoints(points);
	}, []);

	return (
		<group rotation={[Math.PI / 2, 0, 0]}>
			<lineLoop ref={ref}>
				<lineBasicMaterial color={'#9c88ff'} opacity={0.05} linewidth={1} depthWrite={false} transparent />
			</lineLoop>
		</group>
	);
}
