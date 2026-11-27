import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useScroll } from '@hooks/useScroll';

import HeaderItem from './HeaderItem';
import ResumeButton from './ResumeButton';

const MOBILE_LINKS = [
  { href: '/#about', text: 'About Me', color: 'bg-wm-hydrogen-100' },
  { href: '/#skills', text: 'Skills', color: 'bg-wm-sky' },
  { href: '/#experience', text: 'Experience', color: 'bg-wm-leaf' },
  { href: '/#contact', text: 'Contact', color: 'bg-wm-sun' },
];

export default function Header() {
  const [visible, setVisible] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  useScroll((y) => {
    if (visible && y > 150) {
      setVisible(false);
    } else if (!visible && y < 100) {
      setVisible(true);
    }
  });

  return (
    <>
    <header
      className={`fixed top-0 left-0 z-40 header-bar border-b-[5px] border-black w-full overflow-hidden transition-all duration-500 ${
        visible ? 'h-16 lg:h-32' : 'h-16'
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
          <button
            type='button'
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls='mobile-menu'
            aria-label={open ? 'Close menu' : 'Open menu'}
            className='lg:hidden self-end mb-2.5 flex items-center gap-2 bg-wm-sun border-[3px] border-black px-3 py-1.5 shadow-[3px_3px_0_0_black] font-comic uppercase tracking-wider text-lg leading-none active:translate-x-0.5 active:translate-y-0.5 active:shadow-none'
          >
            <svg className='size-5' viewBox='0 0 20 20' aria-hidden='true' stroke='black' strokeWidth='3' strokeLinecap='square'>
              {open ? (
                <path d='M4 4 L16 16 M16 4 L4 16' />
              ) : (
                <path d='M3 5 H17 M3 10 H17 M3 15 H17' />
              )}
            </svg>
            {open ? 'Close' : 'Menu'}
          </button>
          <nav className='hidden lg:block h-full'>
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
    <AnimatePresence>
      {open && (
        <motion.nav
          id='mobile-menu'
          aria-label='Mobile'
          initial={{ y: '-100%' }}
          animate={{ y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }}
          exit={{ y: '-100%', transition: { duration: 0.25, ease: [0.55, 0, 0.8, 0.4], delay: 0.1 } }}
          className='menu-panel lg:hidden fixed inset-x-0 top-16 bottom-0 z-30 flex flex-col justify-center px-6 py-8 overflow-y-auto'
        >
          <ul className='flex flex-col gap-4 w-full max-w-sm mx-auto'>
            {MOBILE_LINKS.map(({ href, text, color }, index) => (
              <motion.li
                key={href}
                initial={{ x: -60, rotate: -8, opacity: 0 }}
                animate={{
                  x: 0,
                  rotate: index % 2 ? 1 : -1,
                  opacity: 1,
                  transition: { type: 'spring', stiffness: 420, damping: 18, delay: 0.08 + index * 0.06 },
                }}
                exit={{ x: -40, opacity: 0, transition: { duration: 0.15, delay: (MOBILE_LINKS.length - index) * 0.03 } }}
              >
                <a
                  href={href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 border-[3px] border-black px-5 py-3.5 shadow-[5px_5px_0_0_black] font-comic uppercase tracking-wider text-3xl leading-none text-black active:scale-[0.96] transition-[scale] duration-100 ${color}`}
                >
                  {text}
                </a>
              </motion.li>
            ))}
            <motion.li
              className='pt-6 flex justify-center'
              onClick={() => setOpen(false)}
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 380, damping: 14, delay: 0.08 + MOBILE_LINKS.length * 0.06 } }}
              exit={{ scale: 0.8, opacity: 0, transition: { duration: 0.12 } }}
            >
              <ResumeButton />
            </motion.li>
          </ul>
        </motion.nav>
      )}
    </AnimatePresence>
    </>
  );
}
