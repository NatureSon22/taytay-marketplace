type SeparatorProps = {
  width?: string;
};

function Separator({ width }: SeparatorProps) {
  return (
    <div className="py-10 grid place-items-center">
      <div className={`border border-slate-200/70 ${width ?? "w-[80%]"}`}></div>
    </div>
  );
}

export default Separator;
