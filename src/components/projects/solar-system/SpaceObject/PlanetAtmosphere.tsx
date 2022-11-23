import { useMemo } from 'react';
import { Sphere } from '@react-three/drei';
import { BackSide, AdditiveBlending, ColorRepresentation, Color } from 'three';

export type AtmosphereProps = {
	size: number;
	coefficient: number;
	power: number;
	color: ColorRepresentation;
};

export function PlanetAtmosphere({ size, coefficient, power, color }: AtmosphereProps) {
	const data = useMemo(
		() => ({
			uniforms: {
				color: {
					type: 'c',
					value: new Color(color),
				},
				coefficient: {
					type: 'f',
					value: coefficient,
				},
				power: {
					type: 'f',
					value: power,
				},
			},
			vertexShader: vertexShader,
			fragmentShader: fragmentShader,
			blending: AdditiveBlending,
			side: BackSide,
			transparent: true,
			depthWrite: false,
		}),
		[]
	);

	return (
		<Sphere args={[size, 32, 32]}>
			<shaderMaterial {...data} />
		</Sphere>
	);
}

const fragmentShader = `
	uniform vec3 color;
	uniform float coefficient;
	uniform float power;

	varying vec3 vVertexNormal;
	varying vec3 vVertexWorldPosition;

	void main() {
		vec3 worldCameraToVertex = vVertexWorldPosition - cameraPosition;
		vec3 viewCameraToVertex = (viewMatrix * vec4(worldCameraToVertex, 0.0)).xyz;
		viewCameraToVertex = normalize(viewCameraToVertex);
		float intensity = pow(coefficient + dot(vVertexNormal, viewCameraToVertex), power);
		gl_FragColor = vec4(color, intensity);
	}
`;

const vertexShader = `
	varying vec3 vVertexWorldPosition;
	varying vec3 vVertexNormal;

	void main() {
		vVertexNormal = normalize(normalMatrix * normal);
		vVertexWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
		gl_Position	= projectionMatrix * modelViewMatrix * vec4(position, 1.0);
	}
`;
