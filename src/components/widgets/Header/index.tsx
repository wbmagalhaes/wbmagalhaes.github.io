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
            className={`group self-end mb-3.5 ml-2 flex items-end gap-3 origin-bottom-left transition-[scale] duration-500 ${visible ? 'scale-100' : 'scale-[0.7]'}`}
          >
            <span className='block -skew-x-12 bg-white px-3 py-1 shadow-[3px_3px_0_0_var(--color-wm-oxygen)]'>
              <span className='block skew-x-12 font-comic uppercase whitespace-nowrap tracking-[0.1em] text-2xl leading-none text-black'>
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
                hoverDotColor='var(--color-wm-hydrogen-600)'
              />
              <HeaderItem
                href='/#experience'
                text='Experience'
                aria='Work Experience'
                hoverBgColor='var(--color-wm-leaf)'
                hoverDotColor='var(--color-wm-leaf-700)'
              />
              <HeaderItem
                href='/#portfolio'
                text='Portfolio'
                aria='My Portfolio'
                hoverBgColor='var(--color-wm-sky)'
                hoverDotColor='var(--color-wm-sky-700)'
              />
              <HeaderItem
                href='/#contact'
                text='Contact'
                aria='Contact Me'
                hoverBgColor='var(--color-wm-sun)'
                hoverDotColor='var(--color-wm-sun-700)'
              />
              <li className='h-full border-l-2 border-black pl-6 flex justify-center items-end pb-2'>
                <ResumeButton />
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
