import * as THREE from "https://unpkg.com/three@0.120.1/build/three.module.js";
import { OrbitControls } from "https://unpkg.com/three@0.120.1/examples/jsm/controls/OrbitControls.js";
import { Lensflare, LensflareElement } from "https://unpkg.com/three@0.120.1/examples/jsm/objects/Lensflare.js";

import { GridMaterial } from "./GridMaterial.js";
import { SpaceObject } from "./SpaceObject.js";

const width = 800;
const height = 600;

const xOffset = 2;
const yOffset = 2;
const gridOffset = -5;

const cameraTarget = new THREE.Vector3(-xOffset, -yOffset, 0);

let scene, renderer;
let camera, controls;
let clock;

let spaceObjects = [];

function setup() {
	scene = new THREE.Scene();
	renderer = new THREE.WebGLRenderer({
		alpha: true,
		antialias: true
	});

	renderer.setSize(width, height);
	document.getElementById('solar-system').appendChild(renderer.domElement);

	const tex_loader = new THREE.TextureLoader();

	const stars = new THREE.Mesh(
		new THREE.SphereGeometry(500, 8, 8),
		new THREE.MeshBasicMaterial({
			map: tex_loader.load('./textures/2k_stars.jpg'),
			side: THREE.BackSide
		})
	);
	scene.add(stars);

	const ambientLight = new THREE.AmbientLight('#FFFFFF', 0.3);
	scene.add(ambientLight);

	tex_loader.load('./textures/2k_sun.jpg', texture => {
		const obj = new SpaceObject(1.6, 0, 0, 1.252, texture);

		tex_loader.load('./textures/2k_sun_emission.jpg', emissiveTexture => {
			obj.addEmissive(texture, emissiveTexture, '#f56516', 0.3);
			obj.addAtmosphere(3, 0.01, 8, '#fcb640');
		});

		const pointLight = new THREE.PointLight('#fcb640');
		obj.group.add(pointLight);

		const textureFlare0 = tex_loader.load('./textures/lensflare0.png');
		const textureFlare1 = tex_loader.load('./textures/lensflare1.png');

		const flare = new Lensflare();
		flare.addElement(new LensflareElement(textureFlare0, window.innerWidth * 0.400, 0.0, new THREE.Color('#fcb640')));
		flare.addElement(new LensflareElement(textureFlare1, window.innerWidth * 0.021, 0.6, new THREE.Color('#ffcf7d')));
		flare.addElement(new LensflareElement(textureFlare1, window.innerWidth * 0.026, 0.7, new THREE.Color('#ffcf7d')));
		flare.addElement(new LensflareElement(textureFlare1, window.innerWidth * 0.041, 0.9, new THREE.Color('#ffcf7d')));
		flare.addElement(new LensflareElement(textureFlare1, window.innerWidth * 0.026, 1.0, new THREE.Color('#ffcf7d')));
		flare.rotation.z = Math.PI / 4;
		pointLight.add(flare);

		scene.add(obj.group);
		spaceObjects.push(obj);
	});

	tex_loader.load('./textures/2k_mercury.jpg', texture => {
		const obj = new SpaceObject(0.2, 3.4, 3.38, 1.607, texture);
		obj.addOrbit();

		scene.add(obj.group);
		spaceObjects.push(obj);
	});

	tex_loader.load('./textures/2k_venus.jpg', texture => {
		const obj = new SpaceObject(0.3, 5.1, 3.86, 1.176, texture);
		obj.addOrbit();

		scene.add(obj.group);
		spaceObjects.push(obj);
	});

	tex_loader.load('./textures/2k_earth.jpg', texture => {
		const obj = new SpaceObject(0.4, 6.2, 7.155, 1.000, texture);
		obj.addOrbit();
		obj.addAtmosphere(0.5, 0.2, 2, '#87c5f5');

		scene.add(obj.group);
		spaceObjects.push(obj);
	});

	tex_loader.load('./textures/2k_mars.jpg', texture => {
		const obj = new SpaceObject(0.3, 8.2, 5.65, 0.808, texture);
		obj.addOrbit();
		obj.addAtmosphere(0.33, 0.2, 2, '#f1d7ab');

		scene.add(obj.group);
		spaceObjects.push(obj);
	});

	tex_loader.load('./textures/2k_jupiter.jpg', texture => {
		const obj = new SpaceObject(1.1, 16, 6.09, 0.439, texture);
		obj.addOrbit();

		scene.add(obj.group);
		spaceObjects.push(obj);
	});

	tex_loader.load('./textures/2k_saturn.jpg', texture => {
		const obj = new SpaceObject(0.7, 26, 5.51, 0.325, texture);
		obj.addOrbit();

		tex_loader.load('./textures/2k_saturn_ring_alpha.png', texture => {
			obj.addRing(1.0, 1.8, texture, 0.8);
			obj.turn(new THREE.Vector3(8, 1, -1));
		});

		scene.add(obj.group);
		spaceObjects.push(obj);
	});

	tex_loader.load('./textures/2k_uranus.jpg', texture => {
		const obj = new SpaceObject(0.5, 38, 6.48, 0.229, texture);
		obj.addOrbit();

		tex_loader.load('./textures/2k_uranus_ring_alpha.png', texture => {
			obj.addRing(0.9, 1.0, texture, 0.4);
			obj.turn(new THREE.Vector3(3, -10, 1));
		});

		scene.add(obj.group);
		spaceObjects.push(obj);
	});

	tex_loader.load('./textures/2k_neptune.jpg', texture => {
		const obj = new SpaceObject(0.4, 50, 6.43, 0.182, texture);
		obj.addOrbit();

		scene.add(obj.group);
		spaceObjects.push(obj);
	});

	const size = 100;
	const divisions = 50;
	const gridHelper = new THREE.GridHelper(size, divisions);
	gridHelper.position.set(0, gridOffset, 0);
	gridHelper.material = GridMaterial(
		new THREE.Color('white'),
		0.1,
		gridHelper.position,
		40
	);

	scene.add(gridHelper);

	camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
	camera.position.set(6, 6, 20);

	controls = new OrbitControls(camera, renderer.domElement);
	controls.enablePan = false;
	controls.enableZoom = true;

	controls.minPolarAngle = 0.623;
	controls.maxPolarAngle = 1.578;

	controls.minDistance = 12;
	controls.maxDistance = 50;
	controls.targetDistance = 18;

	controls.rotateSpeed = 0.4;
	controls.target = cameraTarget;

	controls.enableDamping = true;
	controls.update();

	clock = new THREE.Clock(true);
	animate();
}

function animate() {
	const d_time = clock.getDelta();

	spaceObjects.forEach((planet) => {
		planet.update(d_time);
	});

	renderer.render(scene, camera);
	requestAnimationFrame(animate);
}

export { setup }