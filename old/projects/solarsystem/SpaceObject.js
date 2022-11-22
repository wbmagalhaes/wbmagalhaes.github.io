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
}
