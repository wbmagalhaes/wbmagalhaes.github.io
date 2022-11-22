import { BackSide } from 'three';
import { Sphere, useTexture } from '@react-three/drei';

export type StarsProps = { size: number; url: string };

export function Stars({ size, url }: StarsProps) {
	const bgTexture = useTexture(url);
	return (
		<Sphere args={[size, 8, 8]}>
			<meshBasicMaterial map={bgTexture} side={BackSide} />
		</Sphere>
	);
}
