import { cn } from "@/lib/utils";

type StyledTextProps = {
  text: string;
  size: string;
};

function StyledText({ text, size }: StyledTextProps) {
  return (
    <div className={cn("text-center text-100 font-extrabold", size)}>
      {text}
    </div>
  );
}

export default StyledText;
