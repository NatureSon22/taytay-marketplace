import useAuth from "@/hooks/useAuth";
import type { ReactNode } from "react";

type AuthenticatedProps = {
  children: ReactNode;
  renderIfAuthenticated?: boolean;
};

const Authenticated = ({
  renderIfAuthenticated = true,
  children,
}: AuthenticatedProps) => {
  const { account, isPending } = useAuth();

  if (isPending) return null;

  const isAuthenticated = !!account;
  const shouldRenderChildren = renderIfAuthenticated
    ? isAuthenticated
    : !isAuthenticated;

  if (shouldRenderChildren) return children;

  return null;
};

export default Authenticated;
