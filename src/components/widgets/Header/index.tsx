import { useState } from 'react';
import { useScroll } from '@hooks/useScroll';

import HeaderItem from './HeaderItem';
import ResumeButton from './ResumeButton';

export default function Header() {
  const [visible, setVisible] = useState(true);

  useScroll((y) => {
    if (visible && y > 150) {
      setVisible(false);
    } else if (!visible && y < 100) {
      setVisible(true);
    }
  });

  return (
    <header
      className={`fixed top-0 left-0 z-40 bg-wm-oxygen border-b-[5px] border-black w-full overflow-hidden transition-all duration-500 ${
        visible ? 'h-32' : 'h-16'
      }`}
    >
      <div className='relative mx-auto max-w-[68rem] px-4 md:px-8 xl:px-0 h-full'>
        <div className='flex items-center justify-between h-full'>
          <a
            href='/#'
            aria-label='home'
            className='group self-end mb-2.5 ml-2 flex items-end gap-3'
          >
            <span className='block -skew-x-12 bg-white px-3 py-1 shadow-[3px_3px_0_0_var(--color-wm-oxygen)]'>
              <span className='block skew-x-12 font-comic uppercase whitespace-nowrap tracking-[0.1em] text-3xl leading-none text-black'>
                W.M. <span className='text-wm-oxygen'>Comics</span>
              </span>
            </span>
          </a>
          <nav className='h-full'>
            <ul className='flex h-full text-right font-bold'>
              <HeaderItem
                href='/#about'
                text='About Me'
                aria='About Me'
                hoverBgColor='var(--color-wm-hydrogen-100)'
                hoverDotColor='var(--color-wm-lilac)'
              />
              <HeaderItem
                href='/#skills'
                text='Skills'
                aria='My Skills'
                hoverBgColor='var(--color-wm-sky)'
                hoverDotColor='var(--color-wm-gold-700)'
              />
              <HeaderItem
                href='/#experience'
                text='Experience'
                aria='Work Experience'
                hoverBgColor='var(--color-wm-leaf)'
                hoverDotColor='var(--color-wm-nitrogen)'
              />
              <HeaderItem
                href='/#contact'
                text='Contact'
                aria='Contact Me'
                hoverBgColor='var(--color-wm-sun)'
                hoverDotColor='var(--color-wm-tangerine)'
              />
              <li className='h-full border-l-2 border-black pl-6 flex justify-center items-end pb-1.5'>
                <ResumeButton />
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
