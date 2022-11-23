import { useRef, useLayoutEffect } from 'react';
import { Path } from 'three';
import type { ColorRepresentation } from 'three';
import type { LineLoop } from 'three';

type Props = {
	radius: number;
	color: ColorRepresentation;
};

export function OrbitLine({ radius, color }: Props) {
	const ref = useRef<LineLoop>(null);

	useLayoutEffect(() => {
		const path = new Path().absarc(0, 0, radius, 0, 2 * Math.PI, true);
		const points = path.getPoints(32);
		ref.current?.geometry.setFromPoints(points);
	}, []);

	return (
		<group rotation={[Math.PI / 2, 0, 0]}>
			<lineLoop ref={ref}>
				<lineBasicMaterial color={color} opacity={0.05} linewidth={1} depthWrite={false} transparent />
			</lineLoop>
		</group>
	);
}
