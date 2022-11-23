import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, useTexture } from '@react-three/drei';
import { OrbitLine } from './OrbitLine';
import { PlanetRing } from './PlanetRing';
import { PlanetAtmosphere } from './PlanetAtmosphere';
import type { Group, Mesh, ColorRepresentation } from 'three';
import type { RingProps } from './PlanetRing';
import type { AtmosphereProps } from './PlanetAtmosphere';

const BASE_SPEED = 0.33;
const BASE_INCLINATION = 1.5;

export type SpaceObjectProps = {
	size: number;
	distance: number;
	inclination: number;
	speed: number;
	textureURL?: string;
	orbit?: ColorRepresentation;
	ring?: RingProps;
	atmosphere?: AtmosphereProps;
	emissive?: {
		color: ColorRepresentation;
		intensity: number;
	};
};

export function SpaceObject({
	size,
	distance,
	inclination,
	speed,
	textureURL,
	orbit = undefined,
	ring = undefined,
	atmosphere = undefined,
	emissive = undefined,
}: SpaceObjectProps) {
	const texture = textureURL ? useTexture(textureURL) : null;
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
						{emissive ? (
							<meshPhongMaterial
								map={texture}
								emissive={emissive.color}
								emissiveMap={texture}
								emissiveIntensity={emissive.intensity}
								depthWrite={false}
								transparent
							/>
						) : (
							<meshPhongMaterial color="white" map={texture} />
						)}
					</Sphere>
					{ring && <PlanetRing {...ring} />}
					{atmosphere && <PlanetAtmosphere {...atmosphere} />}
				</group>
			</group>
			{orbit && <OrbitLine color={orbit} radius={distance} />}
		</group>
	);
}
