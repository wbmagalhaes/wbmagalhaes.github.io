import * as THREE from "https://unpkg.com/three@0.120.1/build/three.module.js";

export const AtmosphereMaterial = (coefficient, power, glowColor) => {
	const vertexShader = `
		varying vec3 vVertexWorldPosition;
		varying vec3 vVertexNormal;

		void main() {
			vVertexNormal = normalize(normalMatrix * normal);
			vVertexWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
			gl_Position	= projectionMatrix * modelViewMatrix * vec4(position, 1.0);
		}
	`;

	const fragmentShader = `
		uniform vec3 glowColor;
		uniform float coefficient;
		uniform float power;

		varying vec3 vVertexNormal;
		varying vec3 vVertexWorldPosition;

		void main() {
			vec3 worldCameraToVertex = vVertexWorldPosition - cameraPosition;
			vec3 viewCameraToVertex = (viewMatrix * vec4(worldCameraToVertex, 0.0)).xyz;
			viewCameraToVertex = normalize(viewCameraToVertex);
			float intensity = pow(coefficient + dot(vVertexNormal, viewCameraToVertex), power);
			gl_FragColor = vec4(glowColor, intensity);
		}
	`;

	return new THREE.ShaderMaterial({
		uniforms: {
			coefficient: {
				type: "f",
				value: coefficient
			},
			power: {
				type: "f",
				value: power
			},
			glowColor: {
				type: "c",
				value: glowColor
			},
		},
		vertexShader: vertexShader,
		fragmentShader: fragmentShader,
		blending: THREE.AdditiveBlending,
		side: THREE.BackSide,
		transparent: true,
		depthWrite: false
	});
}