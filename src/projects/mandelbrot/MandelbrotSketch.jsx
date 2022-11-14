import { ReactP5Wrapper } from 'react-p5-wrapper';

export default function MandelbrotSetRender({ holderRef, scale = 1, offset = [0, 0], julia = false }) {
	return <ReactP5Wrapper sketch={(p5) => sketch(p5, holderRef)} scale={scale} offset={offset} julia={julia} />;
}

function sketch(p5, holderRef) {
	let program;
	let scale = 1;
	let offset = [0, 0];
	let julia = false;

	p5.setup = () => {
		const w = holderRef.current.offsetWidth;
		const h = holderRef.current.offsetHeight;
		p5.createCanvas(w, h, p5.WEBGL);
		p5.pixelDensity(1);
		p5.noStroke();

		program = p5.createShader(vert, frag);
	};

	p5.updateWithProps = (props) => {
		scale = props.scale ?? scale;
		offset = props.offset ?? offset;
		julia = props.julia ?? julia;
	};

	p5.draw = () => {
		let x = p5.map(p5.mouseX, 0, p5.width, -1, 1);
		let y = p5.map(p5.mouseY, 0, p5.height, -1, 1);

		program.setUniform('u_resolution', [p5.width, p5.height]);
		program.setUniform('u_offset', offset);
		program.setUniform('u_scale', scale);
		program.setUniform('u_julia', julia);
		program.setUniform('u_julia_constant', [x, y]);

		p5.shader(program);
		p5.plane(p5.width, p5.height);
	};
}

const vert = `
#ifdef GL_ES
	precision highp float;
	precision highp int;
#endif
#extension GL_OES_standard_derivatives : enable

// inputs
attribute vec3 aPosition;
attribute vec3 aNormal;
attribute vec2 aTexCoord;
attribute vec4 aVertexColor;

// outputs
varying vec3 var_vertPos;
varying vec4 var_vertCol;
varying vec3 var_vertNormal;
varying vec2 var_vertTexCoord;

// matrices
uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;

void main() {
	gl_Position = uProjectionMatrix * uModelViewMatrix * vec4(aPosition, 1.0);
}
`;

const frag = `
#ifdef GL_ES
	precision highp float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_offset;
uniform float u_scale;
uniform bool u_julia;
uniform vec2 u_julia_constant;

int iterate(vec2 p, vec2 c) {
	const int maxIterations = 100;
	const float threshold = 16.0;

	int result = 0;

	for (int i = 0; i < maxIterations; i++) {
		result++;

		float _x = p.x * p.x - p.y * p.y + c.x;
		float _y = 2.0 * p.x * p.y + c.y;

		float mag_sqr = _x * _x + _y * _y;
		if (mag_sqr > threshold) {
			break;
		}

		p.x = _x;
		p.y = _y;
	}

	return result;
}

vec4 hsv2rgb(vec4 c) {
	vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
	vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);

	vec3 result = c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
	return vec4(result.x, result.y, result.z, 1.0);
}

void main(void) {
	const int maxIterations = 100;
	vec4 result = vec4(0.0, 0.0, 0.0, 1.0);

	vec2 p = u_scale * (((2.0 * (gl_FragCoord.xy) / u_resolution.xy) - 1.0) + u_offset.xy);

	vec2 point = vec2(p.x, p.y * u_resolution.y / u_resolution.x);
	vec2 c = vec2(u_julia ? u_julia_constant : point);

	int n = iterate(point, c);
	if (n < maxIterations) {
		float hue = float(n) / float(maxIterations);
		result = hsv2rgb(vec4(hue, 1.0, 1.0, 1.0));
	}

	gl_FragColor = result;
}
`;
