import { Grid } from './Grid';
import { Stars } from './Stars';
import type { GridProps } from './Grid';
import type { StarsProps } from './Stars';

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
