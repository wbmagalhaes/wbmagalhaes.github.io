export default function Logo({ className = 'w-8 h-8 text-black' }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns='http://www.w3.org/2000/svg'
      preserveAspectRatio='xMidYMid meet'
      viewBox='0 0 24 24'
    >
      <g
        fill='none'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2.6'
      >
        <path d='M19 6.873a2 2 0 0 1 1 1.747v6.536a2 2 0 0 1-1.029 1.748l-6 3.833a2 2 0 0 1-1.942 0l-6-3.833A2 2 0 0 1 4 15.157V8.62a2 2 0 0 1 1.029-1.748l6-3.572a2.056 2.056 0 0 1 2 0l6 3.573H19z' />
        <path
          className='origin-center'
          transform='scale(0.8)'
          d='m9 8l1 8l2-5l2 5l1-8'
        />
      </g>
    </svg>
  );
}
