import { SpaceObject } from './';
import type { SpaceObjectProps } from './';
import type { AtmosphereProps } from './PlanetAtmosphere';
import type { ColorRepresentation } from 'three';

export type SunProps = SpaceObjectProps & {
	light: { color: ColorRepresentation };
	atmosphere: AtmosphereProps;
	emissive: {
		color: ColorRepresentation;
		intensity: number;
	};
	flares: {
		textures: string[];
		elements: {
			id: number;
			x: number;
			y: number;
			color: ColorRepresentation;
		}[];
	};
};

export function Sun({ light, flares, ...props }: SunProps) {
	return (
		<>
			<SpaceObject {...props} />
			<pointLight color={light.color} intensity={1} />
		</>
	);
}
