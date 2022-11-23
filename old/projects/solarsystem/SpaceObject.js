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
}
