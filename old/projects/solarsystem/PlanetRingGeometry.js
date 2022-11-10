import * as THREE from 'https://unpkg.com/three@0.120.1/build/three.module.js';

export class PlanetRingGeometry extends THREE.BufferGeometry {
	constructor(innerRadius, outerRadius, thetaSegments) {
		super();

		this.type = 'PlanetRingGeometry';

		innerRadius = innerRadius || 0;
		outerRadius = outerRadius || 50;
		thetaSegments = thetaSegments || 8;

		const normal = new THREE.Vector3(0, 0, 1);

		const indices = [];
		const vertices = [];
		const normals = [];
		const uvs = [];

		for (let i = 0; i < thetaSegments; i++) {
			const angleLo = (i / thetaSegments) * Math.PI * 2;
			const angleHi = ((i + 1) / thetaSegments) * Math.PI * 2;

			const vertex1 = new THREE.Vector3(innerRadius * Math.cos(angleLo), innerRadius * Math.sin(angleLo), 0);
			const vertex2 = new THREE.Vector3(outerRadius * Math.cos(angleLo), outerRadius * Math.sin(angleLo), 0);
			const vertex3 = new THREE.Vector3(innerRadius * Math.cos(angleHi), innerRadius * Math.sin(angleHi), 0);
			const vertex4 = new THREE.Vector3(outerRadius * Math.cos(angleHi), outerRadius * Math.sin(angleHi), 0);

			vertices.push(vertex1.x, vertex1.y, vertex1.z);
			vertices.push(vertex2.x, vertex2.y, vertex2.z);
			vertices.push(vertex3.x, vertex3.y, vertex3.z);
			vertices.push(vertex4.x, vertex4.y, vertex4.z);

			const vertexIdx = i * 4;
			indices.push(vertexIdx + 2, vertexIdx + 1, vertexIdx + 0);
			indices.push(vertexIdx + 3, vertexIdx + 1, vertexIdx + 2);

			normals.push(normal.x, normal.y, normal.z);
			normals.push(normal.x, normal.y, normal.z);

			uvs.push(0, 0);
			uvs.push(1, 1);

			uvs.push(0, 0);
			uvs.push(1, 1);
		}

		this.setIndex(indices);
		this.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
		this.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
		this.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));

		this.boundingSphere = new THREE.Sphere(new THREE.Vector3(), outerRadius);
	}
}
