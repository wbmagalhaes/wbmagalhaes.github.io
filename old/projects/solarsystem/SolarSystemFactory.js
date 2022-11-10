import * as THREE from 'https://unpkg.com/three@0.120.1/build/three.module.js';
import { Lensflare, LensflareElement } from 'https://unpkg.com/three@0.120.1/examples/jsm/objects/Lensflare.js';

import { SpaceObject } from './SpaceObject.js';
import { GridMaterial } from './GridMaterial.js';

export class SolarSystemFactory {
	static CreateStars(scene, bgPath) {
		const texLoader = new THREE.TextureLoader();

		texLoader.load(bgPath, (texture) => {
			const stars = new THREE.Mesh(
				new THREE.SphereGeometry(500, 8, 8),
				new THREE.MeshBasicMaterial({
					map: texture,
					side: THREE.BackSide,
				})
			);

			scene.add(stars);
		});
	}

	static CreateAmbient(scene, intensity) {
		const ambientLight = new THREE.AmbientLight('#FFFFFF', intensity);
		scene.add(ambientLight);
	}

	static CreateGrid(scene, size, divisions, offset) {
		let grid = new THREE.GridHelper(size, divisions);
		grid.position.set(0, offset, 0);
		grid.material = GridMaterial(new THREE.Color('white'), 0.1, grid.position, 40);

		scene.add(grid);
	}

	static CreateSolarSystem(scene, data) {
		let solarSystem = new SolarSystem();

		SolarSystemFactory.CreateSun(data.sun, (sun) => {
			solarSystem.addSpaceObject(sun);
			scene.add(sun.group);
		});

		data.planets.forEach((data) => {
			SolarSystemFactory.CreatePlanet(data, (planet) => {
				solarSystem.addSpaceObject(planet);
				scene.add(planet.group);
			});
		});

		return solarSystem;
	}

	static CreateSun(data, onCreate) {
		const texLoader = new THREE.TextureLoader();
		texLoader.load(data.texture, (texture) => {
			const obj = new SpaceObject(data.size, 0, 0, data.speed, texture);

			texLoader.load(data.emissive.texture, (emissiveTexture) => {
				obj.addEmissive(texture, emissiveTexture, data.emissive.color, data.emissive.intensity);
				obj.addAtmosphere(data.atmosphere);
			});

			const pointLight = new THREE.PointLight(data.light);
			obj.group.add(pointLight);

			const flareTextures = data.flare.textures.map((path) => {
				return texLoader.load(path);
			});

			const flare = new Lensflare();
			data.flare.elements.forEach((element) => {
				const tex = flareTextures[element.textureIdx];
				const x = element.x * window.innerWidth;
				const y = element.y;
				const color = new THREE.Color(element.color);
				flare.addElement(new LensflareElement(tex, x, y, color));
			});
			flare.rotation.z = Math.PI / 4;
			pointLight.add(flare);

			onCreate(obj);
		});
	}

	static CreatePlanet(data, onCreate) {
		const texLoader = new THREE.TextureLoader();
		texLoader.load(data.texture, (texture) => {
			const obj = new SpaceObject(data.size, data.distance, data.inclination, data.speed, texture);

			if (data.orbit) {
				obj.addOrbit();
			}

			if (data.atmosphere) {
				obj.addAtmosphere(data.atmosphere);
			}

			if (data.ring) {
				texLoader.load(data.ring.texture, (texture) => {
					obj.addRing(data.ring.inner, data.ring.outer, texture, data.ring.opacity);
					obj.turn(new THREE.Vector3(data.ring.turn.x, data.ring.turn.y, data.ring.turn.z));
				});
			}

			onCreate(obj);
		});
	}
}

class SolarSystem {
	constructor() {
		this.objects = [];
	}

	addSpaceObject(obj) {
		this.objects.push(obj);
	}

	update(dt) {
		this.objects.forEach((o) => {
			o.update(dt);
		});
	}
}
