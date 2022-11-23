import { SpaceObject } from './SpaceObject';
import { Sun } from './SpaceObject/Sun';
import type { SpaceObjectProps } from './SpaceObject';
import type { SunProps } from './SpaceObject/Sun';

export type SceneProps = {
	sunProps: SunProps;
	planetsProps: SpaceObjectProps[];
};

export function Scene({ sunProps, planetsProps }: SceneProps) {
	return (
		<>
			<Sun {...sunProps} />
			{planetsProps.map((props, i) => (
				<SpaceObject key={i} {...props} />
			))}
		</>
	);
}
