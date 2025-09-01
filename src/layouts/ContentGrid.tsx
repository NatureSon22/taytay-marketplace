import type { ReactNode } from "react";

type ContentGridProps = {
  children: ReactNode;
};

function ContentGrid({ children }: ContentGridProps) {
  return <div className="w-[80%] grid gap-12 md:w-[85%]">{children}</div>;
}

export default ContentGrid;
