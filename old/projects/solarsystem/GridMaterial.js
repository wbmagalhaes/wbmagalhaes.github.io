import * as THREE from 'https://unpkg.com/three@0.120.1/build/three.module.js';

export const GridMaterial = (color, opacity, origin, limitDistance) => {
	const vertexShader = `
		varying vec3 vPos;

		void main() {
			vPos = position;
			vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
			gl_Position = projectionMatrix * modelViewPosition;
		}
	`;

	const fragmentShader = `
		uniform vec3 origin;
		uniform vec3 color;
		uniform float limitDistance;
		uniform float maxOpacity;
		varying vec3 vPos;

		void main() {
			float distance = clamp(length(vPos - origin), 0., limitDistance);
			float opacity = (1. - distance / limitDistance) * maxOpacity;
			gl_FragColor = vec4(color, opacity);
		}
	`;

	return new THREE.ShaderMaterial({
		uniforms: {
			color: {
				type: 'c',
				value: color,
			},
			origin: {
				type: 'v3',
				value: origin,
			},
			limitDistance: {
				type: 'f',
				value: limitDistance,
			},
			maxOpacity: {
				type: 'f',
				value: opacity,
			},
		},
		vertexShader: vertexShader,
		fragmentShader: fragmentShader,
		transparent: true,
	});
};
