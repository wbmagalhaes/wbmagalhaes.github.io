import { AnimatePresence, motion, type Variants } from 'motion/react';
import { useState } from 'react';
import type { Work } from 'types/work';

type Props = {
  works: Work[];
  firstPageNumber: number;
};

const FLIP_DURATION = 0.7;

const flip: Variants = {
  enter: (direction: number) => (direction > 0 ? { rotateY: 0, zIndex: 0 } : { rotateY: -105, zIndex: 2 }),
  center: { rotateY: 0, zIndex: 1, transition: { duration: FLIP_DURATION, ease: [0.45, 0, 0.2, 1] } },
  exit: (direction: number) =>
    direction > 0
      ? { rotateY: -105, zIndex: 2, transition: { duration: FLIP_DURATION, ease: [0.45, 0, 0.2, 1] } }
      : { zIndex: 0, transition: { duration: FLIP_DURATION } },
};

function paragraphs(description: string) {
  return description
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .join(' ')
    .split(/(?<=\.)\s+/);
}

function PageFold({ side, label, onClick }: { side: 'left' | 'right'; label: string; onClick: () => void }) {
  return (
    <button
      type='button'
      onClick={onClick}
      aria-label={label}
      className={`absolute bottom-0 size-14 cursor-pointer transition-[scale] duration-200 ${
        side === 'right'
          ? 'right-0 origin-bottom-right hover:scale-125'
          : 'left-0 origin-bottom-left -scale-x-100 hover:-scale-x-125 hover:scale-y-125'
      }`}
    >
      <svg className='size-full overflow-visible' viewBox='0 0 56 56' aria-hidden='true'>
        <path d='M59 -3 L59 59 L-3 59 Z' className='fill-wm-nitrogen-700' />
        <path d='M0 56 L56 0 L4 4 Z' className='fill-wm-hydrogen-400' stroke='black' strokeWidth='3' strokeLinejoin='round' />
      </svg>
    </button>
  );
}

function ExperiencePage({ work, pageNumber }: { work: Work; pageNumber: number }) {
  return (
    <div className='comic-page h-full flex flex-col'>
      <div className='grid flex-1 grid-cols-1 md:grid-cols-12 gap-3 md:gap-4'>
        <div className='comic-panel md:col-span-12 bg-wm-nitrogen p-5 md:p-8 flex flex-col items-start gap-3'>
          <span className='comic-caption'>{work.date}</span>
          <h3 className='comic-headline text-4xl md:text-6xl'>{work.title}</h3>
          <a
            href={work.atURL}
            target='_blank'
            rel='noreferrer'
            className='comic-balloon py-1.5 text-wm-oxygen hover:underline'
          >
            @ {work.name}
          </a>
        </div>

        <div className='comic-panel md:col-span-8 bg-wm-hydrogen-100 p-5 md:p-6 flex flex-col items-start gap-3'>
          {paragraphs(work.description).map((sentence) => (
            <p key={sentence} className='comic-caption bg-white normal-case font-normal text-base leading-snug'>
              {sentence}
            </p>
          ))}
        </div>

        <div className='comic-panel md:col-span-4 bg-wm-sky p-5 md:p-6 flex flex-col items-start gap-4'>
          <span className='comic-caption'>Power-ups</span>
          <ul className='flex flex-wrap gap-2'>
            {work.activities.map((activity) => (
              <li key={activity} className='comic-balloon rounded-md px-3 py-1'>
                {activity}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <footer className='pt-2 md:pt-3 pr-16 text-right font-comic tracking-widest text-lg leading-none'>{pageNumber}</footer>
    </div>
  );
}

export default function ExperienceBook({ works, firstPageNumber }: Props) {
  const [[index, direction], setPage] = useState([0, 1]);

  const turn = (step: number) => setPage(([current]) => [(current + step + works.length) % works.length, step]);

  return (
    <div className='grid [perspective:2400px]'>
      {works.map((work, i) => (
        <div key={work.name} className='invisible [grid-area:1/1]' aria-hidden='true'>
          <ExperiencePage work={work} pageNumber={firstPageNumber + i} />
        </div>
      ))}

      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={index}
          className='relative [grid-area:1/1] origin-left [backface-visibility:hidden]'
          custom={direction}
          variants={flip}
          initial='enter'
          animate='center'
          exit='exit'
        >
          <ExperiencePage work={works[index]} pageNumber={firstPageNumber + index} />
          {index > 0 && <PageFold side='left' label='Previous page' onClick={() => turn(-1)} />}
          <PageFold
            side='right'
            label={index < works.length - 1 ? 'Next page' : 'Back to first page'}
            onClick={() => turn(index < works.length - 1 ? 1 : -index)}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
