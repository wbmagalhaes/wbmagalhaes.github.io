type Props = {
  angle?: number;
  radial?: boolean;
  center?: [number, number];
  fadeStart?: number;
  minRadius?: number;
  color?: string;
  spacing?: number;
  width?: number;
  height?: number;
  className?: string;
};

export default function Halftone({
  angle = 0,
  radial = false,
  center = [0.5, 0.5],
  fadeStart = 0,
  minRadius = 0.4,
  color = 'rgb(0 0 0 / 0.35)',
  spacing = 6,
  width = 160,
  height = 128,
  className,
}: Props) {
  const maxRadius = spacing * 0.62;
  const progressAt = radial ? radialProgress(width, height, center) : linearProgress(angle, width, height);

  const dots = [];
  for (let row = 0; row * spacing <= height + spacing; row++) {
    const offset = row % 2 ? spacing / 2 : 0;
    for (let col = 0; col * spacing <= width + spacing; col++) {
      const x = col * spacing + offset;
      const y = row * spacing;
      const strength = (progressAt(x, y) - fadeStart) / (1 - fadeStart);
      const r = maxRadius * Math.min(1, Math.max(0, strength));
      if (r < minRadius) continue;
      dots.push(<circle key={`${row}-${col}`} cx={x} cy={y} r={r.toFixed(2)} />);
    }
  }

  return (
    <svg
      className={className}
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio='xMidYMid slice'
      fill={color}
      aria-hidden='true'
    >
      {dots}
    </svg>
  );
}

function linearProgress(angle: number, width: number, height: number) {
  const radians = (angle * Math.PI) / 180;
  const dx = Math.sin(radians);
  const dy = -Math.cos(radians);
  const reach = Math.abs(dx) * width + Math.abs(dy) * height;
  const origin = { x: dx < 0 ? width : 0, y: dy < 0 ? height : 0 };
  return (x: number, y: number) => 1 - ((x - origin.x) * dx + (y - origin.y) * dy) / reach;
}

function radialProgress(width: number, height: number, [fx, fy]: [number, number]) {
  const cx = width * fx;
  const cy = height * fy;
  const reach = Math.hypot(Math.max(cx, width - cx), Math.max(cy, height - cy));
  return (x: number, y: number) => Math.hypot(x - cx, y - cy) / reach;
}
