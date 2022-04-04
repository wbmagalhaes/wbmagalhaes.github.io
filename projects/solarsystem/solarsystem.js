import * as THREE from "https://unpkg.com/three@0.120.1/build/three.module.js";
import { OrbitControls } from "https://unpkg.com/three@0.120.1/examples/jsm/controls/OrbitControls.js";

import { SolarSystemFactory } from "./SolarSystemFactory.js";

const width = 800;
const height = 600;

const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({
	alpha: true,
	antialias: true
});

let camera, controls;

let solarSystem;
const clock = new THREE.Clock(true);

function setup() {
	renderer.setSize(width, height);
	document.getElementById('solar-system').appendChild(renderer.domElement);

	SolarSystemFactory.CreateStars(scene, './textures/2k_stars.jpg');
	SolarSystemFactory.CreateAmbient(scene, 0.2);
	SolarSystemFactory.CreateGrid(scene, 100, 50, -10);

	$.getJSON("data.json", data => {
		solarSystem = SolarSystemFactory.CreateSolarSystem(scene, data);
	});

	camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
	camera.position.set(6, 6, 20);

	controls = new OrbitControls(camera, renderer.domElement);
	controls.enablePan = false;
	controls.enableZoom = true;

	controls.minPolarAngle = 0.623;
	controls.maxPolarAngle = 1.578;

	controls.minDistance = 12;
	controls.maxDistance = 70;
	controls.targetDistance = 18;

	controls.rotateSpeed = 0.4;
	controls.target = new THREE.Vector3(-2, -2, 0);

	controls.update();

	animate();
}

function animate() {
	const dt = clock.getDelta();
	solarSystem?.update(dt);

	renderer.render(scene, camera);
	requestAnimationFrame(animate);
}

export { setup }