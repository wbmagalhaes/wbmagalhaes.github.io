export class SpaceObject {

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
}
