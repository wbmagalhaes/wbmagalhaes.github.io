type Props = {
  children: React.ReactNode;
};

export default function CardFooter({ children }: Props) {
  return <div className='px-4 mb-4'>{children}</div>;
}
