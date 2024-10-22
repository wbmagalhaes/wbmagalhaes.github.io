import { motion, useAnimationControls, type Variants } from 'framer-motion';
import { useAnimationOnStart } from '@hooks/useAnimationOnStart';
import { type ReactNode } from 'react';

type Props = {
  icon?: ReactNode;
  email: string;
};

export default function EmailBanner({ icon, email }: Props) {
  const controls = useAnimationControls();
  useAnimationOnStart(controls, 'show');

  return (
    <motion.div
      className='hidden md:block fixed top-0 right-6 lg:right-8 xl:right-16 w-12 lg:w-16 xl:w-32 bg-yellow-600 rounded-b-full z-10'
      initial='hidden'
      animate={controls}
      onHoverStart={() => controls.start('hover')}
      onHoverEnd={() => controls.start('normal')}
      variants={itemVariants}
    >
      <span className='absolute h-64 w-full bg-yellow-600 -translate-y-full' />
      <a
        className='font-mono text-sm text-black'
        href={`mailto:${email}`}
        aria-label='Send me an e-mail'
      >
        <div className='flex flex-col place-items-center justify-end gap-2 pt-64 pb-8 lg:pb-12 xl:pb-16'>
          <div className='rotate-90'>{icon}</div>
          <span className='[writing-mode:vertical-rl]'>{email}</span>
        </div>
      </a>
    </motion.div>
  );
}

const itemVariants: Variants = {
  hidden: { y: '-100%' },
  show: {
    y: '0%',
    transition: {
      delay: 1.8,
    },
  },
  normal: { y: 0 },
  hover: { y: 8 },
};
