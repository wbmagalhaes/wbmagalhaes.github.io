import * as THREE from 'https://unpkg.com/three@0.120.1/build/three.module.js';
import { AtmosphereMaterial } from './AtmosphereMaterial.js';
import { PlanetRingGeometry } from './PlanetRingGeometry.js';

const BASE_SPEED = 0.2;
const BASE_INCLINATION = 2;

export class SpaceObject {
	constructor(size, distance, inclination, speed, texture) {
		this.size = size;
		this.distance = distance;
		this.inclination = inclination * BASE_INCLINATION;
		this.speed = speed * BASE_SPEED;

		this.meshGroup = new THREE.Group();

		this.objectMesh = new THREE.Mesh(
			new THREE.SphereGeometry(this.size, 32, 32),
			new THREE.MeshLambertMaterial({
				color: '#FFF',
				map: texture,
				depthWrite: true,
			})
		);

		this.meshGroup.add(this.objectMesh);
		this.meshGroup.position.set(this.distance, 0, 0);

		this.orbitGroup = new THREE.Group();
		this.orbitGroup.add(this.meshGroup);

		this.orbitGroup.rotation.x = this.inclination * (Math.PI / 180);
		this.angle = Math.random() * 2 * Math.PI;

		this.group = new THREE.Group();
		this.group.add(this.orbitGroup);
	}

	addEmissive(texture, emissiveTexture, color, intensity) {
		this.objectMesh.material = new THREE.MeshPhongMaterial({
			map: texture,
			emissive: color,
			emissiveMap: emissiveTexture,
			emissiveIntensity: intensity,
			depthWrite: false,
			transparent: true,
		});
	}

	addAtmosphere(data) {
		const atmosphere = new THREE.Mesh(
			new THREE.SphereGeometry(data.size, 32, 32),
			AtmosphereMaterial(data.coefficient, data.power, new THREE.Color(data.color))
		);

		this.meshGroup.add(atmosphere);
	}

	addOrbit() {
		const orbit_line = new THREE.LineLoop(
			new THREE.CircleGeometry(this.distance, 128),
			new THREE.LineBasicMaterial({
				color: '#a1a8b7',
				transparent: true,
				opacity: 0.2,
				linewidth: 3,
				depthWrite: false,
			})
		);

		orbit_line.geometry.vertices.shift();
		orbit_line.rotation.x = this.inclination * (Math.PI / 180) + Math.PI / 2;

		this.group.add(orbit_line);
	}

	addRing(inner, outer, texture, opacity) {
		const ring = new THREE.Mesh(
			new PlanetRingGeometry(inner, outer, 64),
			new THREE.MeshBasicMaterial({
				color: '#FFF',
				map: texture,
				side: THREE.DoubleSide,
				transparent: true,
				opacity: opacity,
			})
		);

		ring.rotation.x = Math.PI / 2;
		this.objectMesh.add(ring);
	}

	turn(direction) {
		var pos = new THREE.Vector3();
		this.meshGroup.getWorldPosition(pos);
		this.meshGroup.lookAt(pos.add(direction));
	}

	update(deltaTime) {
		this.meshGroup.rotation.y -= (this.speed / 10) * deltaTime;
		this.angle -= this.speed * deltaTime;

		this.meshGroup.position.z = Math.cos(this.angle) * this.distance;
		this.meshGroup.position.x = Math.sin(this.angle) * this.distance;
	}
}
