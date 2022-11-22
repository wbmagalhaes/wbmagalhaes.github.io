import { useRef } from 'react';

import { useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';

import { Mesh, Vector3 } from 'three';

const BASE_SPEED = 0.33;
const BASE_INCLINATION = 1.5;

export type SpaceObjectProps = {
	size: number;
	distance: number;
	inclination: number;
	speed: number;
	orbit?: boolean;
};

export function SpaceObject({ size, distance, inclination, speed, orbit = false }: SpaceObjectProps) {
	const blah = useRef<Mesh>(null);
	const startingAngle = Math.random() * 2 * Math.PI;

	useFrame(({ clock }) => {
		if (!blah.current) {
			return;
		}

		const time = clock.getElapsedTime();
		const angle = startingAngle + BASE_SPEED * speed * time;

		// rotação
		blah.current.rotation.y = angle / 10;

		// translação
		blah.current.position.x = Math.sin(angle) * distance;
		blah.current.position.z = Math.cos(angle) * distance;
	});

	return (
		<group rotation={[(BASE_INCLINATION * inclination * Math.PI) / 180, 0, 0]}>
			<Sphere ref={blah} args={[size, 32, 32]}>
				<meshPhongMaterial color="white" />
			</Sphere>
		</group>
	);
}
