import { motion, type Variants } from 'framer-motion';

export default function ResumeButton() {
  return (
    <motion.button
      className='text-black font-semibold'
      initial='initial'
      whileHover='hover'
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className='hard-shadow-4'
        width='206'
        height='46'
        viewBox='-3 -3 210 46'
        fill='red'
        stroke='black'
        strokeWidth='3'
        strokeLinejoin='round'
      >
        <motion.path
          variants={obj1Variants}
          d='M 20 0 l -12 0 l 0 40 l 12 0 Z'
        ></motion.path>

        <motion.g variants={obj2Variants}>
          <path d='M 118 0 L 30 0 L 30 40 l 88 0 l 16.5 -20 Z' />
          <text
            x='78'
            y='20'
            fill='black'
            textAnchor='middle'
            dominantBaseline='central'
            stroke='none'
          >
            Resume
          </text>
        </motion.g>

        <motion.path
          variants={obj3Variants}
          d='M 144 0 l -12 0 l 16.5 20 l -16.5 20 l 12 0 l 16.5 -20 Z'
        ></motion.path>
        <motion.path
          variants={obj4Variants}
          d='M 170 0 l -12 0 l 16.5 20 l -16.5 20 l 12 0 l 16.5 -20 Z'
        ></motion.path>
      </svg>
    </motion.button>
  );
}

const obj1Variants: Variants = {
  initial: {
    transform: 'translate(0px, 0px)',
    transition: {
      ease: 'backInOut',
    },
  },
  hover: {
    transform: 'translate(4px, 0px)',
    transition: {
      delay: 0.0,
    },
  },
};

const obj2Variants: Variants = {
  initial: {
    transform: 'translate(0px, 0px)',
    transition: {
      ease: 'backInOut',
    },
  },
  hover: {
    transform: 'translate(4px, 0px)',
    transition: {
      delay: 0.0,
    },
  },
};

const obj3Variants: Variants = {
  initial: {
    transform: 'translate(0px, 0px)',
    transition: {
      ease: 'backInOut',
    },
  },
  hover: {
    transform: 'translate(8px, 0px)',
    transition: {
      delay: 0.075,
    },
  },
};

const obj4Variants: Variants = {
  initial: {
    transform: 'translate(0px, 0px)',
    transition: {
      ease: 'backInOut',
    },
  },
  hover: {
    transform: 'translate(12px, 0px)',
    transition: {
      delay: 0.115,
    },
  },
};
