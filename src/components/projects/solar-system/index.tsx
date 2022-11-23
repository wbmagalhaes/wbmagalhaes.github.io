import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls, Preload } from '@react-three/drei';
import { Environment } from './Environment';
import { Scene } from './Scene';
import { CameraData, OrbitData, EnvironmentData, SceneData } from './data';

export function SolarSystem() {
	return (
		<div className="container">
			<div className="canvas-holder">
				<Canvas>
					<PerspectiveCamera makeDefault {...CameraData} />
					<OrbitControls {...OrbitData} />
					<Suspense fallback={null}>
						<Environment {...EnvironmentData} />
						<Scene {...SceneData} />
						<Preload all />
					</Suspense>
				</Canvas>
			</div>
		</div>
	);
}
