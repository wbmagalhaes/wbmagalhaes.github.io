import { useTexture } from '@react-three/drei';
import type { Texture } from 'three';

import { SpaceObject } from './SpaceObject';
import type { SpaceObjectProps } from './SpaceObject';

const sunURL = '/images/projects/solar-system/2k_sun.jpg';
const mercuryURL = '/images/projects/solar-system/2k_mercury.jpg';
const venusURL = '/images/projects/solar-system/2k_venus.jpg';
const earthURL = '/images/projects/solar-system/2k_earth.jpg';
const marsURL = '/images/projects/solar-system/2k_mars.jpg';
const jupiterURL = '/images/projects/solar-system/2k_jupiter.jpg';
const saturnURL = '/images/projects/solar-system/2k_saturn.jpg';
const saturnRingURL = '/images/projects/solar-system/2k_saturn_ring_alpha.png';
const uranusURL = '/images/projects/solar-system/2k_uranus.jpg';
const uranusRingURL = '/images/projects/solar-system/2k_uranus_ring_alpha.png';
const neptuneURL = '/images/projects/solar-system/2k_neptune.jpg';

export type SceneProps = {};

export function Scene({}: SceneProps) {
	const [
		sunTex,
		mercuryTex,
		venusTex,
		earthTex,
		marsTex,
		jupiterTex,
		saturnTex,
		saturnRingTex,
		uranusTex,
		uranusRingTex,
		neptuneTex,
	] = useTexture([
		sunURL,
		mercuryURL,
		venusURL,
		earthURL,
		marsURL,
		jupiterURL,
		saturnURL,
		saturnRingURL,
		uranusURL,
		uranusRingURL,
		neptuneURL,
	]);

	return (
		<>
			<Sun sunTex={sunTex} />
			<Planets
				mercuryTex={mercuryTex}
				venusTex={venusTex}
				earthTex={earthTex}
				marsTex={marsTex}
				jupiterTex={jupiterTex}
				saturnTex={saturnTex}
				saturnRingTex={saturnRingTex}
				uranusTex={uranusTex}
				uranusRingTex={uranusRingTex}
				neptuneTex={neptuneTex}
			/>
		</>
	);
}

function Sun({ sunTex }: { sunTex: Texture }) {
	return (
		<>
			<SpaceObject size={1.6} distance={0} inclination={0} speed={0.252} mainTex={sunTex} />
			<pointLight color="#fcb640" intensity={1} />
		</>
	);
}

function Planets({
	mercuryTex,
	venusTex,
	earthTex,
	marsTex,
	jupiterTex,
	saturnTex,
	saturnRingTex,
	uranusTex,
	uranusRingTex,
	neptuneTex,
}: {
	mercuryTex: Texture;
	venusTex: Texture;
	earthTex: Texture;
	marsTex: Texture;
	jupiterTex: Texture;
	saturnTex: Texture;
	saturnRingTex: Texture;
	uranusTex: Texture;
	uranusRingTex: Texture;
	neptuneTex: Texture;
}) {
	return (
		<>
			<SpaceObject size={0.2} distance={3.4} inclination={3.38} speed={1.607} mainTex={mercuryTex} orbit />
			<SpaceObject size={0.3} distance={5.1} inclination={3.86} speed={1.176} mainTex={venusTex} orbit />
			<SpaceObject size={0.4} distance={6.2} inclination={7.155} speed={1.0} mainTex={earthTex} orbit />
			<SpaceObject size={0.3} distance={8.2} inclination={5.65} speed={0.808} mainTex={marsTex} orbit />
			<SpaceObject size={1.1} distance={16} inclination={6.09} speed={0.439} mainTex={jupiterTex} orbit />
			<SpaceObject
				size={0.6}
				distance={26}
				inclination={5.51}
				speed={0.325}
				mainTex={saturnTex}
				orbit
				ring={{
					inner: 1,
					outer: 1.8,
					opacity: 0.8,
					texture: saturnRingTex,
					rotation: [Math.PI / 2, 0, 0],
				}}
			/>
			<SpaceObject
				size={0.5}
				distance={38}
				inclination={6.48}
				speed={0.229}
				mainTex={uranusTex}
				orbit
				ring={{
					inner: 0.9,
					outer: 1.0,
					opacity: 0.4,
					texture: uranusRingTex,
					rotation: [Math.PI / 2, Math.PI / 2, 0],
				}}
			/>
			<SpaceObject size={0.4} distance={50} inclination={6.43} speed={0.182} mainTex={neptuneTex} orbit />
		</>
	);
}
