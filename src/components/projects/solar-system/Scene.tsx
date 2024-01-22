import { SpaceObject, type SpaceObjectProps } from './SpaceObject';
import { Sun, type SunProps } from './SpaceObject/Sun';

export type SceneProps = {
	sunProps: SunProps;
	planetsProps: SpaceObjectProps[];
};

export function Scene({
	sunProps,
	planetsProps,
	onSelectPlanet,
}: SceneProps & {
	onSelectPlanet: (name: string) => void;
}) {
	return (
		<>
			<Sun {...sunProps} />
			{planetsProps.map((props, i) => (
				<SpaceObject key={i} onSelect={onSelectPlanet} {...props} />
			))}
		</>
	);
}
