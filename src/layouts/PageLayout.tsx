import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type PaddingTopVariant = "none" | "sm" | "md" | "lg" | "xl" | "default";

type PageLayoutProps = {
  paddingTopVariant?: PaddingTopVariant;
  children: ReactNode;
};

const paddingMap: Record<PaddingTopVariant, string> = {
  none: "pt-0",
  sm: "pt-4 md:pt-6",
  md: "pt-8 md:pt-10",
  lg: "pt-12 md:pt-16",
  xl: "pt-20 md:pt-24",
  default: "pt-4 md:pt-7",
};

function PageLayout({
  paddingTopVariant = "default",
  children,
}: PageLayoutProps) {
  const ptClass = paddingMap[paddingTopVariant];

  return (
    <div className={cn("relative flex-1 flex flex-col pb-20", ptClass)}>
      {children}
    </div>
  );
}

export default PageLayout;
