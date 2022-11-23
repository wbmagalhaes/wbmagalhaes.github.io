import { SpaceObject } from './';
import type { SpaceObjectProps } from './';
import type { ColorRepresentation } from 'three';

export type SunProps = SpaceObjectProps & {
	light: { color: ColorRepresentation };
	emissive: { color: ColorRepresentation; intensity: number };
	atmosphere: { size: number; coefficient: number; power: number; color: ColorRepresentation };
	flare: { textures: string[]; elements: { id: number; x: number; y: number; color: ColorRepresentation }[] };
};

export function Sun({ light, ...props }: SunProps) {
	return (
		<>
			<SpaceObject {...props} />
			<pointLight color={light.color} intensity={1} />
		</>
	);
}
