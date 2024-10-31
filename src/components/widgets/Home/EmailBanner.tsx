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
    <div className='fixed w-full'>
      <div className='relative mx-auto max-w-[68rem]'>
        <motion.div
          className='absolute top-0 -right-36 w-12 bg-yellow-600 rounded-b-full hard-shadow z-10'
          initial='hidden'
          animate={controls}
          onHoverStart={() => controls.start('hover')}
          onHoverEnd={() => controls.start('normal')}
          variants={itemVariants}
        >
          <span className='absolute h-36 w-full bg-yellow-600 -translate-y-full' />
          <a
            className='font-mono text-sm text-black'
            href={`mailto:${email}`}
            aria-label='Send me an e-mail'
          >
            <div className='flex flex-col place-items-center justify-end gap-2 pt-36 pb-16'>
              <div className='rotate-90'>{icon}</div>
              <span className='[writing-mode:vertical-rl]'>{email}</span>
            </div>
          </a>
        </motion.div>
      </div>
    </div>
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
