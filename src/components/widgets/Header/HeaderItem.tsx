import { motion, useAnimationControls } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import Halftone from '@common/Halftone';

type Props = {
  href: string;
  icon?: React.JSX.Element;
  text: string;
  aria: string;
  hoverBgColor?: string;
  hoverDotColor?: string;
  target?: React.HTMLAttributeAnchorTarget;
};

export default function HeaderItem({
  href,
  icon,
  text,
  aria,
  target = '_self',
  hoverBgColor = 'var(--color-wm-oxygen)',
  hoverDotColor = 'var(--color-wm-oxygen-800)',
}: Props) {
  const [angle, setAngle] = useState(0);
  const controls = useAnimationControls();
  const hovering = useRef(false);
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    setAngle(Math.random() * 360);
  }, []);

  const mask = (from: number, to: number) =>
    `linear-gradient(${angle}deg, black ${from}%, transparent ${to}%)`;

  function reveal() {
    hovering.current = true;
    setArmed(true);
    controls.set({ maskImage: mask(-1, 0) });
    controls.start({ maskImage: mask(100, 101) });
  }

  async function conceal() {
    hovering.current = false;
    await controls.start({ maskImage: mask(-1, 0) });
    if (!hovering.current) setAngle(Math.random() * 360);
  }

  return (
    <li className='h-full border-l-2 border-black'>
      <motion.a
        className='group relative overflow-hidden h-full px-4 flex justify-center items-end text-white'
        href={href}
        aria-label={aria}
        target={target}
        onHoverStart={reveal}
        onHoverEnd={conceal}
      >
        <motion.span
          className='absolute inset-0'
          style={{ backgroundColor: hoverBgColor, maskImage: mask(-1, 0) }}
          animate={controls}
          aria-hidden='true'
        >
          {armed && <Halftone className='absolute inset-0 size-full opacity-40' angle={angle} color={hoverDotColor} />}
        </motion.span>
        {icon && (
          <span className='relative inline-flex align-middle sm:align-top sm:mr-1'>
            <div className='w-6 h-6'>{icon}</div>
          </span>
        )}

        <span className='relative inline-flex items-center h-12 pb-3 font-comic text-xl uppercase tracking-[0.08em] font-normal transition-colors duration-150 group-hover:text-black'>{text}</span>
      </motion.a>
    </li>
  );
}
