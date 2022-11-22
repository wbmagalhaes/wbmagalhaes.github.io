import { SpaceObject } from './SpaceObject';
import type { SpaceObjectProps } from './SpaceObject';

export type SceneProps = {};

export function Scene({}: SceneProps) {
	return (
		<>
			<Sun />
			<Planets />
		</>
	);
}

function Sun() {
	return (
		<>
			<SpaceObject size={1.6} distance={0} inclination={0} speed={1.252} />
			<pointLight color="#fcb640" intensity={1} />
		</>
	);
}

function Planets() {
	return (
		<>
			<SpaceObject size={0.2} distance={3.4} inclination={3.38} speed={1.607} orbit />
			<SpaceObject size={0.3} distance={5.1} inclination={3.86} speed={1.176} orbit />
			<SpaceObject size={0.4} distance={6.2} inclination={7.155} speed={1.0} orbit />
			<SpaceObject size={0.3} distance={8.2} inclination={5.65} speed={0.808} orbit />
			<SpaceObject size={1.1} distance={16} inclination={6.09} speed={0.439} orbit />
			<SpaceObject size={0.6} distance={26} inclination={5.51} speed={0.325} orbit />
			<SpaceObject size={0.5} distance={38} inclination={6.48} speed={0.229} orbit />
			<SpaceObject size={0.4} distance={50} inclination={6.43} speed={0.182} orbit />
		</>
	);
}
