const WIDTH = 1000;
const HEIGHT = 900;
const GRID = 40;

const TRACE = 'var(--color-wm-nitrogen-600)';
const BASE = 'var(--color-wm-nitrogen)';

const DIRECTIONS = [
  [1, 0],
  [1, 1],
  [0, 1],
  [-1, 1],
  [-1, 0],
  [-1, -1],
  [0, -1],
  [1, -1],
];

type Point = { x: number; y: number };
type Trace = { points: Point[]; length: number };
type Chip = { x: number; y: number; w: number; h: number; pins: number };

function seeded(seed: number) {
  let state = seed;
  return () => {
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function traces(): Trace[] {
  const random = seeded(42);
  return Array.from({ length: 46 }, () => {
    let x = Math.round((random() * WIDTH) / GRID) * GRID;
    let y = Math.round((random() * HEIGHT) / GRID) * GRID;
    let direction = Math.floor(random() * 8);
    const points = [{ x, y }];
    let length = 0;
    const segments = 2 + Math.floor(random() * 4);
    for (let s = 0; s < segments; s++) {
      const steps = 1 + Math.floor(random() * 4);
      const [dx, dy] = DIRECTIONS[direction];
      x += dx * GRID * steps;
      y += dy * GRID * steps;
      length += Math.hypot(dx, dy) * GRID * steps;
      points.push({ x, y });
      direction = (direction + (random() < 0.5 ? 1 : 7)) % 8;
    }
    return { points, length };
  });
}

function chips(): Chip[] {
  const random = seeded(9);
  return Array.from({ length: 5 }, () => {
    const w = GRID * (2 + Math.floor(random() * 2));
    const h = GRID * (1 + Math.floor(random() * 2));
    return {
      x: Math.round((random() * (WIDTH - w)) / GRID) * GRID,
      y: Math.round((random() * (HEIGHT - h)) / GRID) * GRID,
      w,
      h,
      pins: Math.round(w / 16),
    };
  });
}

const CPU = { x: 760, y: 560, size: 200, pins: 11 };
const CPU_LABEL = 'W-74';

function cpuPins() {
  const { x, y, size, pins } = CPU;
  const step = size / (pins + 1);
  return Array.from({ length: pins }, (_, i) => {
    const offset = step * (i + 1);
    return [
      { x1: x + offset, y1: y - 18, x2: x + offset, y2: y },
      { x1: x + offset, y1: y + size, x2: x + offset, y2: y + size + 18 },
      { x1: x - 18, y1: y + offset, x2: x, y2: y + offset },
      { x1: x + size, y1: y + offset, x2: x + size + 18, y2: y + offset },
    ];
  }).flat();
}

function cpuTraces() {
  const { x, y, size } = CPU;
  const mid = size / 2;
  return [
    `${x + mid - 36},${y - 18} ${x + mid - 36},${y - 80} ${x + mid - 96},${y - 140}`,
    `${x + mid + 36},${y - 18} ${x + mid + 36},${y - 120}`,
    `${x - 18},${y + mid - 36} ${x - 90},${y + mid - 36} ${x - 150},${y + mid - 96}`,
    `${x - 18},${y + mid + 36} ${x - 120},${y + mid + 36} ${x - 160},${y + mid + 76}`,
    `${x + mid},${y + size + 18} ${x + mid},${y + size + 90}`,
  ];
}

type Part = { x: number; y: number; angle: number; kind: 'resistor' | 'capacitor' };

function parts(): Part[] {
  return TRACES.flatMap(({ points }, i) => {
    if (i % 2) return [];
    const [a, b] = points;
    const length = Math.hypot(b.x - a.x, b.y - a.y);
    if (length < GRID * 2) return [];
    return [
      {
        x: (a.x + b.x) / 2,
        y: (a.y + b.y) / 2,
        angle: (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI,
        kind: i % 4 === 0 ? 'resistor' : 'capacitor',
      },
    ];
  });
}

const CPU_PINS = cpuPins();
const CPU_TRACES = cpuTraces();
const TRACES = traces();
const PARTS = parts();
const CHIPS = chips();

const toPoints = (points: Point[]) => points.map(({ x, y }) => `${x},${y}`).join(' ');

export default function CoverCircuit() {
  return (
    <svg
      className='absolute inset-0 size-full pointer-events-none'
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      preserveAspectRatio='xMidYMid slice'
      aria-hidden='true'
    >
      <g fill='none' stroke={TRACE} strokeWidth='4' strokeLinejoin='round' strokeLinecap='round'>
        {TRACES.map(({ points }, i) => (
          <polyline key={i} points={toPoints(points)} />
        ))}
      </g>

      <g fill={BASE} stroke={TRACE} strokeWidth='4'>
        {TRACES.flatMap(({ points }, i) => {
          const start = points[0];
          const end = points[points.length - 1];
          return [
            <circle key={`s${i}`} cx={start.x} cy={start.y} r='7' />,
            <rect key={`e${i}`} x={end.x - 7} y={end.y - 7} width='14' height='14' />,
          ];
        })}
      </g>

      <g stroke={TRACE} strokeWidth='4'>
        {CHIPS.map(({ x, y, w, h, pins }, i) => (
          <g key={i}>
            {Array.from({ length: pins }, (_, p) => {
              const px = x + ((p + 0.5) * w) / pins;
              return (
                <g key={p}>
                  <line x1={px} y1={y - 12} x2={px} y2={y} />
                  <line x1={px} y1={y + h} x2={px} y2={y + h + 12} />
                </g>
              );
            })}
            <rect x={x} y={y} width={w} height={h} rx='4' fill='var(--color-wm-nitrogen-700)' />
            <circle cx={x + 12} cy={y + 12} r='4' fill={TRACE} stroke='none' />
          </g>
        ))}
      </g>

      {PARTS.map(({ x, y, angle, kind }, i) => (
        <g key={i} transform={`translate(${x} ${y}) rotate(${angle})`}>
          {kind === 'resistor' ? (
            <>
              <rect x='-22' y='-9' width='44' height='18' rx='8' fill='var(--color-wm-nitrogen-700)' stroke='var(--color-wm-nitrogen-200)' strokeWidth='3' />
              {[-10, -3, 4].map((bx) => (
                <rect key={bx} x={bx} y='-9' width='4' height='18' fill='var(--color-wm-nitrogen-200)' />
              ))}
            </>
          ) : (
            <>
              <rect x='-4' y='-4' width='8' height='8' fill='var(--color-wm-nitrogen)' />
              <line x1='-5' y1='-15' x2='-5' y2='15' stroke='var(--color-wm-nitrogen-200)' strokeWidth='5' />
              <line x1='5' y1='-15' x2='5' y2='15' stroke='var(--color-wm-nitrogen-200)' strokeWidth='5' />
            </>
          )}
        </g>
      ))}

      <g fill='none' stroke={TRACE} strokeWidth='4' strokeLinejoin='round' strokeLinecap='round'>
        {CPU_TRACES.map((points, i) => (
          <polyline key={i} points={points} />
        ))}
      </g>
      <g stroke='var(--color-wm-nitrogen-200)' strokeWidth='5' strokeLinecap='square'>
        {CPU_PINS.map((pin, i) => (
          <line key={i} {...pin} />
        ))}
      </g>
      <rect x={CPU.x} y={CPU.y} width={CPU.size} height={CPU.size} rx='10' fill='var(--color-wm-nitrogen-700)' stroke='var(--color-wm-nitrogen-200)' strokeWidth='5' />
      <rect x={CPU.x + 40} y={CPU.y + 40} width={CPU.size - 80} height={CPU.size - 80} rx='4' fill='var(--color-wm-nitrogen-800)' stroke={TRACE} strokeWidth='4' />
      <rect x={CPU.x + 54} y={CPU.y + 54} width={CPU.size - 108} height={CPU.size - 108} fill='none' stroke={TRACE} strokeWidth='2' strokeDasharray='6 6' />
      <circle cx={CPU.x + 20} cy={CPU.y + 20} r='6' fill='var(--color-wm-nitrogen-200)' />
      <text
        x={CPU.x + CPU.size / 2}
        y={CPU.y + CPU.size / 2}
        className='font-comic'
        fontSize='30'
        letterSpacing='2'
        textAnchor='middle'
        dominantBaseline='central'
        fill='var(--color-wm-nitrogen-200)'
      >
        {CPU_LABEL}
      </text>
    </svg>
  );
}
