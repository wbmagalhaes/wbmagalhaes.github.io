import { motion, type Variants } from 'motion/react';

export default function ResumeButton() {
  return (
    <motion.button
      className='text-black'
      initial='initial'
      whileHover='hover'
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className='hard-shadow-4'
        width='206'
        height='46'
        viewBox='-3 -3 210 46'
        fill='var(--color-wm-sun)'
        stroke='black'
        strokeWidth='3'
        strokeLinejoin='round'
      >
        <motion.path
          variants={obj1Variants}
          fill='black'
          d='M 20 0 l -12 0 l 0 40 l 12 0 Z'
        ></motion.path>

        <motion.g variants={obj2Variants}>
          <path d='M 118 0 L 30 0 L 30 40 l 88 0 l 16.5 -20 Z' />
          <text
            x='78'
            y='21'
            className='font-comic'
            fontSize='24'
            letterSpacing='1.5'
            fill='black'
            stroke='none'
            textAnchor='middle'
            dominantBaseline='central'
          >
            RESUME
          </text>
        </motion.g>

        <motion.g variants={obj3Variants}>
          <motion.path variants={wobbleVariants} custom={2} fill='black' d='M 144 0 l -12 0 l 16.5 20 l -16.5 20 l 12 0 l 16.5 -20 Z' />
        </motion.g>
        <motion.g variants={obj4Variants}>
          <motion.path variants={wobbleVariants} custom={3} fill='black' d='M 170 0 l -12 0 l 16.5 20 l -16.5 20 l 12 0 l 16.5 -20 Z' />
        </motion.g>
      </svg>
    </motion.button>
  );
}

const SHIFT_DURATION = 0.34;
const SHIFT_STAGGER = 0.045;
const PARTS = 4;

function shiftVariants(distance: number, index: number): Variants {
  return {
    initial: {
      transform: 'translate(0px, 0px)',
      transition: {
        duration: 0.2,
        ease: [0.25, 1, 0.5, 1],
        delay: (PARTS - 1 - index) * 0.025,
      },
    },
    hover: {
      transform: ['translate(0px, 0px)', 'translate(-3px, 0px)', `translate(${distance}px, 0px)`],
      transition: {
        duration: SHIFT_DURATION,
        times: [0, 0.32, 1],
        ease: [[0.5, 0, 0.75, 0], [0.34, 1.56, 0.64, 1]],
        delay: index * SHIFT_STAGGER,
      },
    },
  };
}

const obj1Variants = shiftVariants(4, 0);
const obj2Variants = shiftVariants(4, 1);
const obj3Variants = shiftVariants(8, 2);
const obj4Variants = shiftVariants(12, 3);

const wobbleVariants: Variants = {
  initial: { x: 0, transition: { duration: 0.12, ease: 'easeOut' } },
  hover: (index: number) => ({
    x: [0, 4, 0],
    transition: {
      delay: SHIFT_DURATION + index * SHIFT_STAGGER + 0.05,
      duration: 0.6,
      ease: [0.45, 0, 0.55, 1],
      repeat: Infinity,
      repeatDelay: 0.05,
    },
  }),
};
