import { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls, Preload } from '@react-three/drei';
import { Environment } from './Environment';
import { Scene } from './Scene';
import { CameraData, OrbitData, EnvironmentData, SceneData } from './data';

export function SolarSystem() {
	const [planet, setPlanet] = useState<string | null>(null);
	const options = ['Opção A', 'Opção B', 'Opção C'];

	function onSelectPlanet(name: string) {
		setPlanet(name);
	}

	return (
		<div className="container">
			<div className="canvas-holder relative ">
				<Canvas>
					<PerspectiveCamera makeDefault {...CameraData} />
					<OrbitControls {...OrbitData} />
					<Suspense fallback={null}>
						<Environment {...EnvironmentData} />
						<Scene onSelectPlanet={onSelectPlanet} {...SceneData} />
						<Preload all />
					</Suspense>
				</Canvas>
				{planet && (
					<div
						className="absolute z-[100000000] top-0 sm:top-16 bottom-0 sm:bottom-auto left-0 w-56 p-4 sm:pb-8 rounded-r-lg
								flex flex-col gap-4 sm:gap-6
								bg-gradient-to-b from-violet-600 to-indigo-500
								border-r  border-indigo-200"
					>
						<h2 className="text-center font-bold">{planet}</h2>
						<div className="flex flex-col gap-2">
							{options.map((option, i) => (
								<button key={i} className="bg-red-500 font-semibold rounded-full p-1 sm:p-2">
									{option}
								</button>
							))}
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
