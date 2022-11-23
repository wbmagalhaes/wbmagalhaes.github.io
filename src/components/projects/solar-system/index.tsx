import { Suspense } from 'react';
import { Vector3 } from 'three';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls, Preload } from '@react-three/drei';
import { Environment } from './Environment';
import { Scene } from './Scene';
import { Data } from './data';

export function SolarSystem() {
	return (
		<div className="container">
			<div className="canvas-holder">
				<Canvas>
					<Suspense fallback={null}>
						<Environment
							lightIntensity={0.05}
							fogNear={0.5}
							fogFar={525}
							starsProps={{
								size: 500,
								textureURL: '/images/projects/solar-system/2k_stars.jpg',
							}}
							gridProps={{
								size: 100,
								divisions: 50,
								color: '#a1a8b7',
								origin: new Vector3(0, -10, 0),
								distance: 40,
								opacity: 0.075,
							}}
						/>
						<Scene sunProps={Data.Sun} planetsProps={Data.Planets} />
						<Preload all />
					</Suspense>

					<PerspectiveCamera makeDefault fov={75} position={[6, 6, 20]} rotation={[0, 0, 0]} />

					<OrbitControls
						enableZoom
						enablePan={false}
						minPolarAngle={0.625}
						maxPolarAngle={1.575}
						minDistance={12}
						maxDistance={70}
						rotateSpeed={0.4}
						target={[-2, -2, 0]}
					/>
				</Canvas>
			</div>
		</div>
	);
}
