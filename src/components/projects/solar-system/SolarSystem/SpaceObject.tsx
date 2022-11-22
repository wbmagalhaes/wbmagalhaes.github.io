import { useRef, useLayoutEffect } from 'react';

import { Path } from 'three';
import { useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';

import type { Mesh, LineLoop, Texture } from 'three';

const BASE_SPEED = 0.33;
const BASE_INCLINATION = 1.5;

export type SpaceObjectProps = {
	size: number;
	distance: number;
	inclination: number;
	speed: number;
	mainTex: Texture;
	orbit?: boolean;
	ring?: boolean;
};

export function SpaceObject({
	size,
	distance,
	inclination,
	speed,
	mainTex,
	orbit = false,
	ring = false,
}: SpaceObjectProps) {
	const blah = useRef<Mesh>(null);
	const startingAngle = Math.random() * 2 * Math.PI;

	useFrame(({ clock }) => {
		if (!blah.current) {
			return;
		}

		const time = clock.getElapsedTime();
		const angle = startingAngle + BASE_SPEED * speed * time;

		// rotação
		blah.current.rotation.y = angle * 2;

		// translação
		blah.current.position.x = Math.sin(angle) * distance;
		blah.current.position.z = Math.cos(angle) * distance;
	});

	return (
		<group>
			<group rotation={[(BASE_INCLINATION * inclination * Math.PI) / 180, 0, 0]}>
				<Sphere ref={blah} args={[size, 32, 32]}>
					<meshPhongMaterial color="white" map={mainTex} />
				</Sphere>

				{orbit && <OrbitLine radius={distance} />}
			</group>
		</group>
	);
}

function OrbitLine({ radius }: { radius: number }) {
	const ref = useRef<LineLoop>(null);

	useLayoutEffect(() => {
		const path = new Path().absarc(0, 0, radius, 0, 2 * Math.PI, true);
		const points = path.getPoints(32);
		ref.current?.geometry.setFromPoints(points);
	}, []);

	return (
		<group rotation={[Math.PI / 2, 0, 0]}>
			<lineLoop ref={ref}>
				<bufferGeometry attach="geometry" />
				<lineBasicMaterial
					attach="material"
					color={'#9c88ff'}
					opacity={0.1}
					linewidth={1}
					depthWrite={false}
					transparent
				/>
			</lineLoop>
		</group>
	);
}
