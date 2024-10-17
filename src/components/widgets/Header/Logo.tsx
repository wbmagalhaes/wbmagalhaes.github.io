export default function Logo() {
  return (
    <svg
      className='w-10 h-10 text-black hover:text-wm-oxygen hover:scale-125 transition-all duration-300'
      xmlns='http://www.w3.org/2000/svg'
      preserveAspectRatio='xMidYMid meet'
      viewBox='0 0 24 24'
    >
      <g
        fill='none'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
      >
        <path d='M19 6.873a2 2 0 0 1 1 1.747v6.536a2 2 0 0 1-1.029 1.748l-6 3.833a2 2 0 0 1-1.942 0l-6-3.833A2 2 0 0 1 4 15.157V8.62a2 2 0 0 1 1.029-1.748l6-3.572a2.056 2.056 0 0 1 2 0l6 3.573H19z' />
        <path
          className='stroke-black origin-center'
          transform='scale(0.8)'
          d='m9 8l1 8l2-5l2 5l1-8'
        />
      </g>
    </svg>
  );
}
