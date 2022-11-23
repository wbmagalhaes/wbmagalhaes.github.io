import { useRef, useLayoutEffect } from 'react';
import { DoubleSide } from 'three';
import { useTexture } from '@react-three/drei';
import { PlanetRingGeometry } from './PlanetRingGeometry';
import type { Mesh } from 'three';

export type RingProps = {
	inner: number;
	outer: number;
	textureURL?: string;
	opacity: number;
	rotation: [number, number, number];
};

export function PlanetRing({ inner, outer, textureURL, opacity, rotation }: RingProps) {
	const texture = textureURL ? useTexture(textureURL) : null;
	const ref = useRef<Mesh>(null);

	useLayoutEffect(() => {
		if (!ref.current) {
			return;
		}

		const geometry = new PlanetRingGeometry(inner, outer, 64);
		ref.current.geometry = geometry;
	}, []);

	return (
		<group rotation={rotation}>
			<mesh ref={ref}>
				<meshBasicMaterial color={'white'} map={texture} side={DoubleSide} opacity={opacity} transparent />
			</mesh>
		</group>
	);
}
