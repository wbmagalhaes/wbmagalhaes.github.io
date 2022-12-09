import { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls, Preload, Plane } from '@react-three/drei';
import { Environment } from './Environment';
import { Scene } from './Scene';
import { CameraData, OrbitData, EnvironmentData, SceneData } from './data';
import { AnimatePresence } from 'framer-motion';
import { PlanetCard } from './PlanetCard';

export function SolarSystem() {
	const [planet, setPlanet] = useState<string | null>(null);

	function selectPlanet(name: string | null) {
		setPlanet(name);
	}

	return (
		<div className="canvas-holder relative">
			<Canvas>
				<PerspectiveCamera makeDefault {...CameraData} />
				<OrbitControls {...OrbitData} />
				<Suspense fallback={<Loading />}>
					<Environment {...EnvironmentData} />
					<Scene onSelectPlanet={selectPlanet} {...SceneData} />
					<Preload all />
				</Suspense>
			</Canvas>

			{SceneData.planetsProps.map(({ name }, i) => (
				<AnimatePresence key={i}>
					{planet === name && <PlanetCard name={name} onClose={() => selectPlanet(null)} />}
				</AnimatePresence>
			))}
		</div>
	);
}

function Loading() {
	return (
		<Plane scale={[10000, 10000, 10000]}>
			<meshBasicMaterial color="black" />
		</Plane>
	);
}
