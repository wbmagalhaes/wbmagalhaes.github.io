import { useState } from 'react';
import { useScroll } from '@hooks/useScroll';

import Logo from './Logo';
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
      className={`sticky top-0 z-40 bg-gray-400 border-b-2 border-black w-full transition-all duration-500 ${
        visible ? 'h-32' : 'h-16'
      }`}
    >
      <div className='mx-auto max-w-[68rem] bg-gray-500 px-4 md:px-8 xl:px-0 h-full'>
        <div className='flex items-center justify-between h-full'>
          <a href='/#' aria-label='home'>
            <Logo />
          </a>
          <nav className='h-full'>
            <ul className='flex h-full text-right font-bold'>
              <HeaderItem
                href='/#about'
                text='About Me'
                aria='About Me'
                hoverBgColor='red'
              />
              <HeaderItem
                href='/#experience'
                text='Experience'
                aria='Work Experience'
                hoverBgColor='lime'
              />
              <HeaderItem
                href='/#portfolio'
                text='Portfolio'
                aria='My Portfolio'
                hoverBgColor='blue'
              />
              <HeaderItem
                href='/#contact'
                text='Contact'
                aria='Contact Me'
                hoverBgColor='#fd3'
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
