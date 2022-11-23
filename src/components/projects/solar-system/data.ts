import { Vector3 } from 'three';
import type { SceneProps } from './Scene';
import type { EnvironmentProps } from './Environment';
import type { OrbitControlsProps } from '@react-three/drei';
import type { PerspectiveCameraProps } from '@react-three/fiber';

export const CameraData: PerspectiveCameraProps = {
	position: [6, 6, 20],
	fov: 75,
};

export const OrbitData: OrbitControlsProps = {
	enableZoom: true,
	enablePan: false,
	minPolarAngle: 0.625,
	maxPolarAngle: 1.575,
	minDistance: 12,
	maxDistance: 70,
	rotateSpeed: 0.4,
	target: [-2, -2, 0],
};

export const EnvironmentData: EnvironmentProps = {
	lightIntensity: 0.05,
	fogNear: 0.5,
	fogFar: 525,
	starsProps: {
		size: 500,
		textureURL: '/images/projects/solar-system/2k_stars.jpg',
	},
	gridProps: {
		size: 100,
		divisions: 50,
		color: '#a1a8b7',
		origin: new Vector3(0, -10, 0),
		distance: 40,
		opacity: 0.075,
	},
};

export const SceneData: SceneProps = {
	sunProps: {
		textureURL: '/images/projects/solar-system/2k_sun.jpg',
		size: 1.6,
		distance: 0,
		inclination: 0,
		speed: 0.252,
		light: {
			color: '#fcb640',
			intensity: 1,
		},
		emissive: {
			color: '#f56516',
			intensity: 0.3,
		},
		atmosphere: {
			size: 3,
			coefficient: 0.01,
			power: 8,
			color: '#fcb640',
		},
	},
	planetsProps: [
		{
			textureURL: '/images/projects/solar-system/2k_mercury.jpg',
			size: 0.2,
			distance: 3.4,
			inclination: 3.38,
			speed: 1.607,
			orbit: '#a1a8b7',
		},
		{
			textureURL: '/images/projects/solar-system/2k_venus.jpg',
			size: 0.3,
			distance: 5.1,
			inclination: 3.86,
			speed: 1.176,
			orbit: '#a1a8b7',
		},
		{
			textureURL: '/images/projects/solar-system/2k_earth.jpg',
			size: 0.4,
			distance: 6.2,
			inclination: 7.155,
			speed: 1.0,
			orbit: '#a1a8b7',
			atmosphere: {
				size: 0.5,
				coefficient: 0.2,
				power: 2,
				color: '#87c5f5',
			},
		},
		{
			textureURL: '/images/projects/solar-system/2k_mars.jpg',
			size: 0.3,
			distance: 8.2,
			inclination: 5.65,
			speed: 0.808,
			orbit: '#a1a8b7',
			atmosphere: {
				size: 0.33,
				coefficient: 0.2,
				power: 2,
				color: '#f1d7ab',
			},
		},
		{
			textureURL: '/images/projects/solar-system/2k_jupiter.jpg',
			size: 1.1,
			distance: 16,
			inclination: 6.09,
			speed: 0.439,
			orbit: '#a1a8b7',
		},
		{
			textureURL: '/images/projects/solar-system/2k_saturn.jpg',
			size: 0.6,
			distance: 26,
			inclination: 5.51,
			speed: 0.325,
			orbit: '#a1a8b7',
			ring: {
				textureURL: '/images/projects/solar-system/2k_saturn_ring_alpha.png',
				inner: 1,
				outer: 1.8,
				opacity: 0.8,
				rotation: [Math.PI / 2 + 0.2, 0, 0],
			},
		},
		{
			textureURL: '/images/projects/solar-system/2k_uranus.jpg',
			size: 0.5,
			distance: 38,
			inclination: 6.48,
			speed: 0.229,
			orbit: '#a1a8b7',
			ring: {
				textureURL: '/images/projects/solar-system/2k_uranus_ring_alpha.png',
				inner: 0.9,
				outer: 1.0,
				opacity: 0.4,
				rotation: [Math.PI / 2, Math.PI / 2 + 0.2, 0],
			},
		},
		{
			textureURL: '/images/projects/solar-system/2k_neptune.jpg',
			size: 0.4,
			distance: 50,
			inclination: 6.43,
			speed: 0.182,
			orbit: '#a1a8b7',
		},
	],
};
