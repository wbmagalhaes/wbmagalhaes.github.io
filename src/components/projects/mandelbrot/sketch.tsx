import { ReactP5Wrapper } from 'react-p5-wrapper';
import type { P5CanvasInstance, SketchProps } from 'react-p5-wrapper';
import { MandelbrotOptions } from './MandelbrotOptions';

interface Props {
	size: { w: number; h: number };
	options: MandelbrotOptions;
}

export default function Sketch({ size, options }: Props) {
	return <ReactP5Wrapper sketch={sketch} size={size} options={options} />;
}

function sketch(p5: P5CanvasInstance<SketchProps & Props>) {
	let size: { w: number; h: number } = { w: 800, h: 600 };
	let options: MandelbrotOptions;
	let scale = 1;

	let program: any;

	p5.setup = () => {
		p5.createCanvas(size.w, size.h, p5.WEBGL);
		p5.pixelDensity(1);

		p5.noStroke();
		p5.fill(255);

		program = p5.createShader(vert, frag);
	};

	p5.updateWithProps = (props: SketchProps & Props) => {
		size = props.size;
		p5.resizeCanvas(size.w, size.h);

		options = props.options;
		scale = 2 / Math.exp(options.zoom);
	};

	p5.draw = () => {
		if (!options) {
			return;
		}

		program.setUniform('u_resolution', [p5.width, p5.height]);
		program.setUniform('u_offset', [options.offset.x, options.offset.y]);
		program.setUniform('u_scale', scale);

		program.setUniform('u_julia', !!options.julia_const);
		program.setUniform('u_julia_constant', [options.julia_const?.x ?? 0, options.julia_const?.y ?? 0]);

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

	vec2 p = u_scale * (((2.0 * (gl_FragCoord.xy) / u_resolution.xy) - 1.0)) + u_offset.xy;

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
