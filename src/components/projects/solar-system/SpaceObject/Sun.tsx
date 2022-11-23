import { SpaceObject } from './';
import type { SpaceObjectProps } from './';
import type { AtmosphereProps } from './PlanetAtmosphere';
import type { ColorRepresentation } from 'three';

export type SunProps = SpaceObjectProps & {
	light: { color: ColorRepresentation; intensity: number };
	atmosphere: AtmosphereProps;
	emissive: {
		color: ColorRepresentation;
		intensity: number;
	};
};

export function Sun({ light, ...props }: SunProps) {
	return (
		<>
			<SpaceObject {...props} />
			<pointLight color={light.color} intensity={light.intensity} />
		</>
	);
}
