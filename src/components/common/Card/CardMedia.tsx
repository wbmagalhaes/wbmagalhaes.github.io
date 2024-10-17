type Props = {
  children: React.ReactNode;
};

export default function CardMedia({ children }: Props) {
  return (
    <div className='border-b-2 border-black pointer-events-none'>
      {children}
    </div>
  );
}
