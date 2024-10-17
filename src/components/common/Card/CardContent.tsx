type Props = {
  children: React.ReactNode;
};

export default function CardContent({ children }: Props) {
  return <div className='p-4'>{children}</div>;
}
