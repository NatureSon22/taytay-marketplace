import type { ReactNode } from "react";

type FilterBarWrapperProps = {
  children: ReactNode;
};

function FilterBarWrapper({ children }: FilterBarWrapperProps) {
  return (
    <div className={"z-20 w-full h-full absolute left-0 top-0"}>
      <div className="w-full border border-yellow-400 h-full">{children}</div>
    </div>
  ); 
}

export default FilterBarWrapper;
