let wavesDict = {
	'1s': orbital_1s,
	'2s': orbital_2s,
	'2pz': orbital_2pz,
	//'2px': orbital_2px,
	//'2py': orbital_2py,
	'3s': orbital_3s,
	'3pz': orbital_3pz,
	//'3px': orbital_3px,
	//'3py': orbital_3py,
	'3dz2': orbital_3dz2
}

// N = 1, l = 0, m = 0
function orbital_1s(r, theta, phi) {
	return sqrt(1 / PI) * exp(-r);
}

// N = 2, l = 0, m = 0
function orbital_2s(r, theta, phi) {
	return (1 / 8) * sqrt(2 / PI) * (2 - r) * exp(-r / 2);
}

// N = 2, l = 1, m = 0
function orbital_2pz(r, theta, phi) {
	return (1 / 8) * sqrt(2 / PI) * r * exp(-r / 2) * cos(theta);
}

// N = 2, l = 1, m = ±1
function orbital_2px(r, theta, phi) {
	return (1 / 8) * sqrt(2 / PI) * r * exp(-r / 2) * sin(theta) * 2 * cos(phi);
}

function orbital_2py(r, theta, phi) {
	return (1 / 8) * sqrt(2 / PI) * r * exp(-r / 2) * sin(theta) * 2 * sin(phi);
}

// N = 3, l = 0, m = 0
function orbital_3s(r, theta, phi) {
	return (1 / 243) * sqrt(3 / PI) * (27 - 18 * r + 2 * r * r) * exp(-r / 3);
}

// N = 3, l = 1, m = 0
function orbital_3pz(r, theta, phi) {
	return (1 / 81) * sqrt(2 / PI) * r * (6 - r) * exp(-r / 3) * cos(theta);
}

// N = 3, l = 1, m = ±1
function orbital_3px(r, theta, phi) {
	return (1 / 81) * sqrt(1 / PI) * r * (6 - r) * exp(-r / 3) * sin(theta) * 2 * cos(phi);
}

function orbital_3py(r, theta, phi) {
	return (1 / 81) * sqrt(1 / PI) * r * (6 - r) * exp(-r / 3) * sin(theta) * 2 * sin(phi);
}

// N = 3, l = 2, m = 0
function orbital_3dz2(r, theta, phi) {
	return (1 / 486) * sqrt(6 / PI) * (r * r) * exp(-r / 3) * (3 * cos(theta) * cos(theta) - 1);
}

// N = 3, l = 2, m = ±1, ±2
function orbital_3dxy(r, theta, phi) {
	return (1 / 81) * sqrt(1 / PI) * (r * r) * exp(-r / 3) * sin(theta) * cos(theta) * 2 * (cos(phi) + cos(2 * phi));
}

function orbital_3dyz(r, theta, phi) {
	return (1 / 81) * sqrt(1 / PI) * (r * r) * exp(-r / 3) * sin(theta) * cos(theta) * 2 * (sin(phi) + sin(2 * phi));
}

function orbital_3dzx(r, theta, phi) {
	return (1 / 81) * sqrt(1 / PI) * (r * r) * exp(-r / 3) * sin(theta) * cos(theta) * 2 * (sin(phi) + sin(2 * phi));
}

function orbital_3dx2minusy2(r, theta, phi) {
	return (1 / 81) * sqrt(1 / PI) * (r * r) * exp(-r / 3) * sin(theta) * cos(theta) * 2 * (sin(phi) + sin(2 * phi));
}

// N = 4, l = 0, m = 0
// N = 4, l = 1, m = 0
// N = 4, l = 1, m = ±1
// N = 4, l = 2, m = 0
// N = 4, l = 2, m = ±1, ±2
// N = 4, l = 3, m = 0
// N = 4, l = 3, m = ±1, ±2, ±3

// function orbital_32plus1(r, theta, phi) {
// 	return (1 / 81) * sqrt(1 / PI) * (r * r) * exp(-r / 3) * sin(theta) * cos(theta) * (cos(phi) + i * sin(phi));
// }

// function orbital_32minus1(r, theta, phi) {
// 	return (1 / 81) * sqrt(1 / PI) * (r * r) * exp(-r / 3) * sin(theta) * cos(theta) * (cos(-phi) + i * sin(-phi));
// }

// function orbital_32plus2(r, theta, phi) {
// 	return (1 / 162) * sqrt(1 / PI) * (r * r) * exp(-r / 3) * sin(theta) * sin(theta) * (cos(2 * phi) + i * sin(2 * phi));
// }

// function orbital_32minus2(r, theta, phi) {
// 	return (1 / 162) * sqrt(1 / PI) * (r * r) * exp(-r / 3) * sin(theta) * sin(theta) * (cos(-2 * phi) + i * sin(-2 * phi));
// }