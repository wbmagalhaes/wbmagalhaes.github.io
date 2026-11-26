import { Icon } from '@iconify/react';
import { motion, useAnimationControls, type Variants } from 'motion/react';
import { useAnimationOnStart } from '@hooks/useAnimationOnStart';
import type { Social } from 'types/social';
import { COVER_INTRO_DURATION, socialItemDelay } from './introTiming';

type Props = {
  socials: Social[];
};

export default function SocialsBanner({ socials }: Props) {
  const maxIndex = socials.length - 1;

  return (
    <div className='fixed z-30 w-full pointer-events-none'>
      <div className='relative mx-auto max-w-[68rem] h-svh'>
        <div className='absolute bottom-36 -left-32 w-12 z-10'>
          <ul className='flex flex-col items-center gap-5 pointer-events-auto'>
            {socials.map(({ link, icon, name }, i) => (
              <SocialItem
                key={i}
                index={maxIndex - i}
                link={link}
                icon={icon}
                name={name}
              />
            ))}
          </ul>

          <motion.span
            className='relative flex flex-col items-center h-36 w-full mt-5'
            variants={lineVariants}
            initial='hidden'
            animate='show'
          >
            <span className='block w-[3px] h-10 bg-black' />
            <svg className='w-4 h-[10px] my-0.5' viewBox='0 0 16 10' aria-hidden='true'>
              <path d='M2 8.5 L14 1.5' stroke='black' strokeWidth='3' strokeLinecap='square' />
            </svg>
            <span className='relative block w-[3px] flex-1 bg-black'>
              <span className='absolute top-full h-36 w-full bg-black' />
            </span>
          </motion.span>
        </div>
      </div>
    </div>
  );
}

function SocialItem({ index, link, icon, name }: { index: number } & Social) {
  const controls = useAnimationControls();
  useAnimationOnStart(controls, 'show');

  return (
    <a className='text-black' href={link} target='_blank' aria-label={name}>
      <motion.li
        custom={index}
        className='size-11 grid place-items-center bg-white bg-clip-padding border-[3px] border-black transition-colors duration-150 hover:bg-wm-oxygen hover:text-white'
        initial='hidden'
        animate={controls}
        onHoverStart={() => controls.start('hover')}
        onHoverEnd={() => controls.start('normal')}
        variants={itemVariants}
      >
        <Icon className='w-6 h-6' icon={icon} />
      </motion.li>
    </a>
  );
}

const lineVariants: Variants = {
  hidden: { y: '100%', opacity: 0 },
  show: {
    y: '0%',
    opacity: 1,
    transition: {
      delay: COVER_INTRO_DURATION,
      opacity: { delay: COVER_INTRO_DURATION, duration: 0 },
      duration: 0.6,
      type: 'spring',
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 40, opacity: 0, scale: 0.7 },
  show: (i: number) => ({
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      delay: socialItemDelay(i),
    },
  }),
  normal: { y: 0, transition: { duration: 0.15 } },
  hover: { y: -3, transition: { duration: 0.15 } },
};
