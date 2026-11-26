import { motion, useAnimationControls, type Variants } from 'motion/react';
import { useAnimationOnStart } from '@hooks/useAnimationOnStart';
import { type ReactNode } from 'react';

type Props = {
  icon?: ReactNode;
  email: string;
  delay: number;
};

export default function EmailBanner({ icon, email, delay }: Props) {
  const controls = useAnimationControls();
  useAnimationOnStart(controls, 'show');

  return (
    <div className='fixed z-30 w-full'>
      <div className='relative mx-auto max-w-[68rem]'>
        <motion.div
          className='absolute top-0 -right-36 w-11 flex flex-col items-center z-10'
          custom={delay}
          initial='hidden'
          animate={controls}
          variants={itemVariants}
        >
          <span className='flex flex-col items-center h-40 mb-3'>
            <span className='relative block w-[3px] flex-1 bg-black'>
              <span className='absolute bottom-full h-40 w-full bg-black' />
            </span>
            <svg className='w-4 h-[16px] my-0.5' viewBox='0 0 16 16' aria-hidden='true'>
              <path d='M2 8.5 L14 1.5 M2 14.5 L14 7.5' stroke='black' strokeWidth='3' strokeLinecap='square' fill='none' />
            </svg>
            <span className='block w-[3px] h-10 bg-black' />
          </span>
          <motion.a
            whileHover={{ y: 3, transition: { duration: 0.15 } }}
            className='font-mono text-sm text-black w-full bg-white bg-clip-padding border-[3px] border-black transition-colors duration-150 hover:bg-wm-oxygen hover:text-white'
            href={`mailto:${email}`}
            aria-label='Send me an e-mail'
          >
            <div className='flex flex-col place-items-center gap-2 py-4'>
              <div className='rotate-90'>{icon}</div>
              <span className='[writing-mode:vertical-rl]'>{email}</span>
            </div>
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
}

const itemVariants: Variants = {
  hidden: { y: '-100%', opacity: 0 },
  show: (delay: number) => ({
    y: '0%',
    opacity: 1,
    transition: { delay, opacity: { delay, duration: 0 } },
  }),
};
