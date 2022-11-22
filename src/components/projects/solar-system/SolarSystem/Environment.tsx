import { Grid, Stars } from './';
import type { GridProps, StarsProps } from './';

export type EnvironmentProps = {
	lightIntensity: number;
	fogNear: number;
	fogFar: number;
	starsProps: StarsProps;
	gridProps: GridProps;
};

export function Environment({ lightIntensity, fogNear, fogFar, starsProps, gridProps }: EnvironmentProps) {
	return (
		<>
			<fog attach="fog" args={['black', fogNear, fogFar]} />
			<ambientLight intensity={lightIntensity} />

			<Stars {...starsProps} />
			<Grid {...gridProps} />
		</>
	);
}
