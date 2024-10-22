import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import type { Social } from 'types/social';

type Props = {
  email: string;
  socials: Social[];
};

export default function ContactList({ email, socials }: Props) {
  return (
    <div className='flex flex-wrap justify-center gap-4 mt-1 mb-12'>
      {socials.map(({ link, icon, name }, i) => (
        <Item key={i} link={link} icon={icon} name={name} />
      ))}

      <Item
        key='email'
        link={`mailto:${email}`}
        icon='ic:outline-email'
        name='Email'
      />
    </div>
  );
}

function Item({ link, icon, name }: Social) {
  return (
    <motion.a
      className='inline-flex place-items-center gap-1.5 bg-wm-oxygen hover:bg-wm-oxygen-300 text-wm-hydrogen rounded-full px-4 py-2'
      href={link}
      target='_blank'
      aria-label={name}
    >
      <Icon className='w-6 h-6' icon={icon} />
      <span className='pt-1'>{name}</span>
    </motion.a>
  );
}
