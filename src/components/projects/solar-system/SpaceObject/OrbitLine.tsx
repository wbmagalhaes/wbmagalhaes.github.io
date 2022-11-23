import { useRef, useLayoutEffect } from 'react';
import { Path } from 'three';
import type { ColorRepresentation, LineLoop } from 'three';

type Props = {
	radius: number;
	color: ColorRepresentation;
};

export function OrbitLine({ radius, color }: Props) {
	const ref = useRef<LineLoop>(null);

	useLayoutEffect(() => {
		const path = new Path().absarc(0, 0, radius, 0, 2 * Math.PI, true);
		const points = path.getPoints(64);
		ref.current?.geometry.setFromPoints(points);
	}, []);

	return (
		<group rotation={[Math.PI / 2, 0, 0]}>
			<lineLoop ref={ref}>
				<lineBasicMaterial color={color} opacity={0.2} linewidth={4} depthWrite={false} transparent />
			</lineLoop>
		</group>
	);
}
