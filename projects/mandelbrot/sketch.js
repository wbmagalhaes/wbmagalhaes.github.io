var threshold = 16;

var mandelbrotScale = 1.5;
var juliaScale = 1.6;

var mandelbrot_offset = [-0.5, 0];
var julia_offset = [-2, 0];

var mandelbrot_program;
var julia_program;

var f;

function preload() {
	f = loadFont('../fonts/arial.otf');
}

function setup() {
	createCanvas(1200, 600, WEBGL).parent("canvas-holder");
	pixelDensity(1);

	mandelbrot_program = createShader(vert, frag);
	julia_program = createShader(vert, frag);

	textFont(f, 18);
	textAlign(LEFT, BOTTOM);
}

function draw() {
	var x = (map(mouseX, 0, width / 2, -1, 1) + mandelbrot_offset[0]) * mandelbrotScale;
	var y = (map(mouseY, 0, height, -1, 1) + mandelbrot_offset[1]) * mandelbrotScale;

	mandelbrot_program.setUniform('resolution', [width / 2, height]);
	mandelbrot_program.setUniform('offset', mandelbrot_offset);
	mandelbrot_program.setUniform('graphScale', mandelbrotScale);

	mandelbrot_program.setUniform('julia', false);

	julia_program.setUniform('resolution', [width / 2, height]);
	julia_program.setUniform('offset', julia_offset);
	julia_program.setUniform('graphScale', juliaScale);

	julia_program.setUniform('julia', true);
	julia_program.setUniform('julia_const', [x, y]);

	noStroke();

	push();
	translate(-width / 4, 0);
	shader(mandelbrot_program);
	plane(width / 2, height);
	pop();

	push();
	translate(width / 4, 0);
	shader(julia_program);
	plane(width / 2, height);
	pop();

	strokeWeight(2);
	stroke(0);
	line(0, -height / 2, 0, height / 2);

	fill(0);
	var xstr = "(" + x.toFixed(5) + ")";
	var ystr = "(" + y.toFixed(5) + ")i";
	translate(-width / 2, height / 2);
	text("c = " + xstr + " + " + ystr, 10, -10);
}

var vert = `
#ifdef GL_ES
    precision highp float;
    precision highp int;
#endif
#extension GL_OES_standard_derivatives : enable

// attributes, in
attribute vec3 aPosition;
attribute vec3 aNormal;
attribute vec2 aTexCoord;
attribute vec4 aVertexColor;

// attributes, out
varying vec3 var_vertPos;
varying vec4 var_vertCol;
varying vec3 var_vertNormal;
varying vec2 var_vertTexCoord;

// matrices
uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;
//uniform mat3 uNormalMatrix;

void main() {
    gl_Position = uProjectionMatrix * uModelViewMatrix * vec4(aPosition, 1.0);

    // just passing things through
    // var_vertPos      = aPosition;
    // var_vertCol      = aVertexColor;
    // var_vertNormal   = aNormal;
    // var_vertTexCoord = aTexCoord;
}`;

var frag = `
#ifdef GL_ES
	precision highp float;
#endif

uniform vec2 resolution;
uniform vec2 offset;
uniform float graphScale;

uniform bool julia;
uniform vec2 julia_const;

int iterate(float start_a, float start_b) {
	const int maxIterations = 100;
	const float threshold = 16.0;

	int result = 0;

	float a = start_a;
	float b = start_b;

	for (int i = 0; i < maxIterations; i++) {
		float aa = a * a;
		float bb = b * b;
		float twoab = 2.0 * a * b;

		float new_a = aa - bb;
		float new_b = twoab;

		if (julia) {
			new_a += julia_const.x;
			new_b += julia_const.y;
		}
		else {
			new_a += start_a;
			new_b += start_b;
		}

		result++;

		float mag = new_a * new_a + new_b * new_b;
		if (mag > threshold)
			break;

		a = new_a;
		b = new_b;
	}

	return result;
}

vec4 hsv2rgb(vec4 c)
{
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
	vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);

	vec3 result = c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
    return vec4(result.x, result.y, result.z, 1.0);
}

void main(void) {
	const int maxIterations = 100;
	vec4 result = vec4(0.0, 0.0, 0.0, 1.0);

	vec2 p = graphScale * (((2.0 * (gl_FragCoord.xy) / resolution.xy) - 1.0) + offset.xy);

	int n = iterate(p.x, p.y * resolution.y / resolution.x);
	if (n < maxIterations) {
		float hue = float(n) / float(maxIterations);
		result = hsv2rgb(vec4(hue, 1.0, 1.0, 1.0));
	}

    gl_FragColor = result;
}`