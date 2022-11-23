import type { SpaceObjectProps } from './SpaceObject';
import type { SunProps } from './SpaceObject/Sun';

export const Data: {
	Sun: SunProps;
	Planets: SpaceObjectProps[];
} = {
	Sun: {
		textureURL: '/images/projects/solar-system/2k_sun.jpg',
		size: 1.6,
		distance: 0,
		inclination: 0,
		speed: 0.252,
		light: {
			color: '#fcb640',
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
		flare: {
			textures: ['./textures/lensflare0.png', './textures/lensflare1.png'],
			elements: [
				{
					id: 0,
					x: 0.4,
					y: 0.0,
					color: '#fcb640',
				},
				{
					id: 1,
					x: 0.021,
					y: 0.6,
					color: '#ffcf7d',
				},
				{
					id: 1,
					x: 0.026,
					y: 0.7,
					color: '#ffcf7d',
				},
				{
					id: 1,
					x: 0.041,
					y: 0.9,
					color: '#ffcf7d',
				},
				{
					id: 1,
					x: 0.026,
					y: 1.0,
					color: '#ffcf7d',
				},
			],
		},
	},
	Planets: [
		{
			textureURL: '/images/projects/solar-system/2k_mercury.jpg',
			size: 0.2,
			distance: 3.4,
			inclination: 3.38,
			speed: 1.607,
			orbit: true,
		},
		{
			textureURL: '/images/projects/solar-system/2k_venus.jpg',
			size: 0.3,
			distance: 5.1,
			inclination: 3.86,
			speed: 1.176,
			orbit: true,
		},
		{
			textureURL: '/images/projects/solar-system/2k_earth.jpg',
			size: 0.4,
			distance: 6.2,
			inclination: 7.155,
			speed: 1.0,
			orbit: true,
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
			orbit: true,
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
			orbit: true,
		},
		{
			textureURL: '/images/projects/solar-system/2k_saturn.jpg',
			size: 0.6,
			distance: 26,
			inclination: 5.51,
			speed: 0.325,
			orbit: true,
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
			orbit: true,
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
			orbit: true,
		},
	],
};
