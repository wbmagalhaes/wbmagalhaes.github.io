import { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls, Preload } from '@react-three/drei';
import { Environment } from './Environment';
import { Scene } from './Scene';
import { CameraData, OrbitData, EnvironmentData, SceneData } from './data';
import { motion, AnimatePresence } from 'framer-motion';

const variants = {
	hidden: {
		x: -30,
		opacity: 0,
		scale: 0.9,
		transition: {
			ease: 'easeInOut',
		},
	},
	show: {
		x: 0,
		opacity: 1,
		scale: 1,
		transition: {
			ease: 'easeInOut',
		},
	},
};

export function SolarSystem() {
	const [planet, setPlanet] = useState<string | null>(null);
	const options = ['Opção A', 'Opção B', 'Opção C'];

	function selectPlanet(name: string | null) {
		setPlanet(name);
	}

	return (
		<div className="container">
			<div className="canvas-holder relative">
				<Canvas>
					<PerspectiveCamera makeDefault {...CameraData} />
					<OrbitControls {...OrbitData} />
					<Suspense fallback={null}>
						<Environment {...EnvironmentData} />
						<Scene onSelectPlanet={selectPlanet} {...SceneData} />
						<Preload all />
					</Suspense>
				</Canvas>

				{SceneData.planetsProps.map(({ name }, i) => (
					<AnimatePresence key={i}>
						{planet === name && (
							<motion.div
								className="absolute top-0 sm:top-16 bottom-0 sm:bottom-auto left-0 w-56 neon-card overflow-hidden flex"
								variants={variants}
								initial="hidden"
								animate="show"
								exit="hidden"
							>
								<div className="grow flex flex-col p-4 sm:pb-8 gap-4 sm:gap-6">
									<h2 className="text-center font-bold text-lime-400">{name}</h2>
									<div className="flex flex-col gap-2">
										{options.map((option, i) => (
											<button key={i} className="uppercase font-semibold p-1 sm:p-2 neon-button">
												{option}
											</button>
										))}
									</div>
								</div>
								<button
									className="flex w-6 border-l-2 border-lime-400 text-lime-400"
									onClick={() => selectPlanet(null)}
								>
									<svg
										className="m-auto"
										xmlns="http://www.w3.org/2000/svg"
										width="2em"
										height="2em"
										preserveAspectRatio="xMidYMid meet"
										viewBox="0 0 256 256"
									>
										<path
											fill="currentColor"
											d="M160 216a8.3 8.3 0 0 1-5.7-2.3l-80-80a8.1 8.1 0 0 1 0-11.4l80-80a8.4 8.4 0 0 1 8.8-1.7A8 8 0 0 1 168 48v160a8 8 0 0 1-4.9 7.4a8.5 8.5 0 0 1-3.1.6Zm-68.7-88l60.7 60.7V67.3Z"
										/>
									</svg>
								</button>
							</motion.div>
						)}
					</AnimatePresence>
				))}
			</div>
		</div>
	);
}
