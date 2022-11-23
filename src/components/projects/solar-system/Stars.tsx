import { BackSide } from 'three';
import { Sphere, useTexture } from '@react-three/drei';

export type StarsProps = { size: number; textureURL?: string };

export function Stars({ size, textureURL = undefined }: StarsProps) {
	const texture = textureURL ? useTexture(textureURL) : null;
	return (
		<Sphere args={[size, 8, 8]}>
			<meshBasicMaterial map={texture} side={BackSide} />
		</Sphere>
	);
}
