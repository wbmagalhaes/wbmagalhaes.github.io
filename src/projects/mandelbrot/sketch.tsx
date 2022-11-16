import { ReactP5Wrapper } from 'react-p5-wrapper';
import type { P5CanvasInstance, SketchProps } from 'react-p5-wrapper';

interface Props {
	size: { w: number; h: number };
	scale?: number;
	offset?: [number, number];
	julia_const?: [number, number];
}

export default function Sketch({ size, scale = 1, offset = [0, 0], julia_const = undefined }: Props) {
	return <ReactP5Wrapper sketch={sketch} size={size} scale={scale} offset={offset} julia_const={julia_const} />;
}

function sketch(p5: P5CanvasInstance<SketchProps & Props>) {
	let program: any;

	let scale: number | undefined = 1;
	let offset: [number, number] | undefined = [0, 0];
	let julia_const: [number, number] | undefined;

	let size: { w: number; h: number } = { w: 800, h: 600 };

	p5.setup = () => {
		p5.createCanvas(size.w, size.h, p5.WEBGL);
		p5.pixelDensity(1);

		p5.noStroke();
		p5.fill(255);

		program = p5.createShader(vert, frag);
	};

	p5.updateWithProps = (props: SketchProps & Props) => {
		scale = props.scale;
		offset = props.offset;
		julia_const = props.julia_const;

		size = props.size;
		p5.resizeCanvas(size.w, size.h);
	};

	p5.draw = () => {
		program.setUniform('u_resolution', [p5.width, p5.height]);
		program.setUniform('u_offset', offset);
		program.setUniform('u_scale', scale);

		program.setUniform('u_julia', !!julia_const);
		program.setUniform('u_julia_constant', julia_const ?? [0, 0]);

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
