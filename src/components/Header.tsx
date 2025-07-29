type HeaderProps = {
  text: string;
};

function Header({ text }: HeaderProps) {
  return (
    <p className="uppercase font-kenzoestic text-center text-4xl text-100 lg:text-6xl">
      {text}
    </p>
  );
}

export default Header;
