import { Icon } from '@iconify/react';
import { motion, useAnimationControls, type Variants } from 'framer-motion';
import { useAnimationOnStart } from '@hooks/useAnimationOnStart';
import type { Social } from 'types/social';

type Props = {
  socials: Social[];
};

export default function SocialsBanner({ socials }: Props) {
  const maxIndex = socials.length - 1;

  return (
    <div className='hidden md:block fixed bottom-0 left-6 lg:left-8 xl:left-16 w-12 lg:w-16 xl:w-32 pt-8 lg:pt-12 xl:pt-16 rounded-t-full bg-yellow-600 z-10'>
      <ul className='flex flex-col items-center gap-6 pb-64'>
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
    </div>
  );
}

function SocialItem({ index, link, icon, name }: { index: number } & Social) {
  const controls = useAnimationControls();
  useAnimationOnStart(controls, 'show');

  return (
    <motion.li
      custom={index}
      className='text-back'
      initial='hidden'
      animate={controls}
      onHoverStart={() => controls.start('hover')}
      onHoverEnd={() => controls.start('normal')}
      variants={itemVariants}
    >
      <a href={link} target='_blank' aria-label={name}>
        <Icon className='w-6 h-6' icon={icon} />
      </a>
    </motion.li>
  );
}

const itemVariants: Variants = {
  hidden: { y: 40, opacity: 0 },
  show: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      delay: i * 0.2 + 0.6,
    },
  }),
  normal: { y: 0 },
  hover: { y: -4 },
};
