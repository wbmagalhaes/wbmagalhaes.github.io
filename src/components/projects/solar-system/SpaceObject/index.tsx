import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Html, useTexture } from '@react-three/drei';
import { OrbitLine } from './OrbitLine';
import { PlanetRing } from './PlanetRing';
import { PlanetAtmosphere } from './PlanetAtmosphere';
import type { Group, Mesh, ColorRepresentation } from 'three';
import type { RingProps } from './PlanetRing';
import type { AtmosphereProps } from './PlanetAtmosphere';

const BASE_SPEED = 0.15;
const BASE_INCLINATION = 1.5;

export type SpaceObjectProps = {
	size: number;
	name?: string;
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
	size = 1,
	name = '',
	distance = 10,
	inclination = 0,
	speed = 0,
	textureURL,
	orbit = undefined,
	ring = undefined,
	atmosphere = undefined,
	emissive = undefined,
	onSelect,
}: SpaceObjectProps & {
	onSelect: (name: string) => void;
}) {
	const [hover, setHover] = useState(false);
	const [startingAngle, _] = useState(Math.random() * 2 * Math.PI);

	const texture = textureURL ? useTexture(textureURL) : null;
	const orbitRef = useRef<Group>(null);
	const planetRef = useRef<Mesh>(null);

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
					{name && (
						<mesh
							onClick={() => onSelect(name)}
							onPointerEnter={() => setHover(true)}
							onPointerLeave={() => setHover(false)}
						>
							<sphereGeometry args={[size * 3, 8, 8]} />
							<meshBasicMaterial opacity={0} depthWrite={false} transparent />
						</mesh>
					)}
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
					{name && (
						<Html
							className="planet-label pb-2 will-change-transform select-none pointer-events-none"
							sprite
							transform
							distanceFactor={20}
							pointerEvents="none"
							position={[0, size * 1.75, 0]}
							style={{
								fontSize: hover ? '1.25rem' : '0.75rem',
								color: 'white',
								transition: '250ms ease',
							}}
						>
							{name}
						</Html>
					)}
				</group>
			</group>
			{orbit && <OrbitLine color={orbit} radius={distance} />}
		</group>
	);
}
