import { Icon } from '@iconify/react';
import type { TechList } from 'types/tech';

type Props = {
  techs: TechList[];
};

export default function TechStack({ techs }: Props) {
  return (
    <div className='flex flex-col gap-4 mt-2'>
      {techs.map(({ title, list }, i) => (
        <div className='flex flex-col gap-2' key={i}>
          <h2 className='text-wm-oxygen-300 font-mono'>{title}</h2>
          <ul className='flex flex-wrap gap-1'>
            {list.map(({ name, icon, color }, i) => (
              <li
                key={i}
                className='inline-flex rounded-full px-4 py-1.5 gap-2 items-center bg-wm-carbon-900'
              >
                <span className='text-sm '>{name}</span>
                <Icon icon={icon} color={color} />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
