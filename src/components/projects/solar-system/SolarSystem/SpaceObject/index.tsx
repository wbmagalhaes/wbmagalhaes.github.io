import { useRef } from 'react';

import { useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import { OrbitLine } from './OrbitLine';
import { PlanetRing } from './PlanetRing';

import type { Group, Mesh, Texture } from 'three';
import type { RingProps } from './PlanetRing';

const BASE_SPEED = 0.33;
const BASE_INCLINATION = 1.5;

export type SpaceObjectProps = {
	size: number;
	distance: number;
	inclination: number;
	speed: number;
	mainTex: Texture;
	orbit?: boolean;
	ring?: RingProps;
};

export function SpaceObject({
	size,
	distance,
	inclination,
	speed,
	mainTex,
	orbit = false,
	ring = undefined,
}: SpaceObjectProps) {
	const orbitRef = useRef<Group>(null);
	const planetRef = useRef<Mesh>(null);
	const startingAngle = Math.random() * 2 * Math.PI;

	useFrame(({ clock }) => {
		if (!planetRef.current) {
			return;
		}

		if (!orbitRef.current) {
			return;
		}

		const time = clock.getElapsedTime();
		const angle = startingAngle + BASE_SPEED * speed * time;

		// translação
		orbitRef.current.rotation.y = angle;
		// rotação
		planetRef.current.rotation.y = angle * 2;
	});

	return (
		<group rotation={[(BASE_INCLINATION * inclination * Math.PI) / 180, 0, 0]}>
			<group ref={orbitRef}>
				<group position={[distance, 0, 0]}>
					<Sphere ref={planetRef} args={[size, 32, 32]}>
						<meshPhongMaterial color="white" map={mainTex} />
					</Sphere>
					{ring && <PlanetRing {...ring} />}
				</group>
			</group>
			{orbit && <OrbitLine radius={distance} />}
		</group>
	);
}
