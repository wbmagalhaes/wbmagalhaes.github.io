type Props = {
  bgColor?: string;
  title: string;
  subtitle?: string;
  left?: React.ReactNode;
  right?: React.ReactNode;
};

export default function CardHeader({
  bgColor = 'white',
  title,
  subtitle,
  left,
  right,
}: Props) {
  return (
    <div
      className='flex p-4 gap-4 border-b-2 border-black card-header'
      style={{
        backgroundColor: bgColor,
      }}
    >
      {left && (
        <div className='grow-0 shrink-0 flex-auto flex items-start'>{left}</div>
      )}

      <div className='grow-1 shrink-1 flex-auto flex flex-col items-start justify-center gap-1'>
        <div className='text-xl leading-tight font-bold'>{title}</div>
        {subtitle && (
          <div className='text-sm leading-none font-thin'>{subtitle}</div>
        )}
      </div>

      {right && (
        <span className='ml-auto pl-2 grow-0 shrink-0 flex-auto flex items-start'>
          {right}
        </span>
      )}
    </div>
  );
}
