import type { ReactNode } from "react";

type PadLayoutProps = {
  children: ReactNode;
};

function PadLayout({ children }: PadLayoutProps) {
  return <div className="py-7 lg:py-10">{children}</div>;
}

export default PadLayout;
