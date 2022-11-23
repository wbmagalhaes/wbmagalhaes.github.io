import { Grid } from './Grid';
import { Stars } from './Stars';
import type { GridProps } from './Grid';
import type { StarsProps } from './Stars';

export type EnvironmentProps = {
	lightIntensity: number;
	starsProps: StarsProps;
	gridProps: GridProps;
};

export function Environment({ lightIntensity, starsProps, gridProps }: EnvironmentProps) {
	return (
		<>
			<ambientLight intensity={lightIntensity} />
			<Stars {...starsProps} />
			<Grid {...gridProps} />
		</>
	);
}
