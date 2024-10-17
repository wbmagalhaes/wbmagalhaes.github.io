function About({ ...props }) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      preserveAspectRatio='xMidYMid meet'
      viewBox='0 0 24 24'
    >
      <path
        fill='currentColor'
        d='M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10c-.006 5.52-4.48 9.994-10 10Zm-8-9.828A8 8 0 1 0 4 12v.172ZM14 17h-3v-4h-1v-2h3v4h1v2Zm-1-8h-2V7h2v2Z'
      />
    </svg>
  );
}

function Experience({ ...props }) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      preserveAspectRatio='xMidYMid meet'
      viewBox='0 0 24 24'
    >
      <path
        fill='currentColor'
        d='M14 6V4h-4v2h4zM4 9v9c0 .55.45 1 1 1h14c.55 0 1-.45 1-1V9c0-.55-.45-1-1-1H5c-.55 0-1 .45-1 1zm16-3c1.11 0 2 .89 2 2v11c0 1.11-.89 2-2 2H4c-1.11 0-2-.89-2-2l.01-11c0-1.11.88-2 1.99-2h4V4c0-1.11.89-2 2-2h4c1.11 0 2 .89 2 2v2h4z'
      />
    </svg>
  );
}

function Projects({ ...props }) {
  return (
    <svg
      {...props}
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
        <rect width='7' height='7' x='3' y='3' rx='1' />
        <rect width='7' height='7' x='3' y='14' rx='1' />
        <rect width='7' height='7' x='14' y='3' rx='1' />
        <rect width='7' height='7' x='14' y='14' rx='1' />
      </g>
    </svg>
  );
}

function Contact({ ...props }) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      preserveAspectRatio='xMidYMid meet'
      viewBox='0 0 24 24'
    >
      <path
        fill='currentColor'
        d='M20 4v12H5.17L4 17.17V4h16m0-2H4c-1.1 0-2 .9-2 2v15.59c0 .89 1.08 1.34 1.71.71L6 18h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z'
      />
    </svg>
  );
}

function Resume({ ...props }) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      preserveAspectRatio='xMidYMid meet'
      viewBox='0 0 24 24'
    >
      <path
        fill='currentColor'
        d='M6 2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6H6m0 2h7v5h5v11H6V4m2 8v2h8v-2H8m0 4v2h5v-2H8Z'
      />
    </svg>
  );
}

export default {
  About,
  Experience,
  Projects,
  Contact,
  Resume,
};
