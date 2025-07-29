import type { ReactNode } from "react";

type CenterLayoutProps = {
  children: ReactNode;
};

function CenterLayout({ children }: CenterLayoutProps) {
  return <div className="flex justify-center">{children}</div>;
}

export default CenterLayout;
