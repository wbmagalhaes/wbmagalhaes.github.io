import { useMemo } from 'react';

export type GridProps = {
	size: number;
	divisions: number;
	color: THREE.Color;
	origin: THREE.Vector3;
	distance: number;
	opacity: number;
};

export function Grid({ size, divisions, color, origin, distance, opacity }: GridProps) {
	const data = useMemo(
		() => ({
			uniforms: {
				color: {
					type: 'v3',
					value: color,
				},
				origin: {
					type: 'c',
					value: origin,
				},
				limitDistance: {
					type: 'f',
					value: distance,
				},
				maxOpacity: {
					type: 'f',
					value: opacity,
				},
			},
			fragmentShader,
			vertexShader,
			transparent: true,
		}),
		[]
	);

	return (
		<gridHelper position={origin} args={[size, divisions]}>
			<shaderMaterial attach="material" {...data} />
		</gridHelper>
	);
}

const fragmentShader = `
	uniform vec3 color;
	uniform vec3 origin;
	uniform float limitDistance;
	uniform float maxOpacity;

	varying vec3 vPos;

	void main() {
		float distance = clamp(length(vPos - origin), 0.0, limitDistance);
		float opacity = (1.0 - distance / limitDistance) * maxOpacity;
		gl_FragColor = vec4(color, opacity);
	}
`;

const vertexShader = `
	varying vec3 vPos;

	void main() {
		vPos = position;
		vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
		gl_Position = projectionMatrix * modelViewPosition;
	}
`;
