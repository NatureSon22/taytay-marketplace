import useAccountStore from "@/stores/useAccountStore";
import type { ReactNode } from "react";

type AuthenticatedProps = {
  children: ReactNode;
  renderIfAuthenticated?: boolean;
};

const Authenticated = ({
  children,
  renderIfAuthenticated = true,
}: AuthenticatedProps): JSX.Element | null => {
  const { account } = useAccountStore((state) => state);

  const isAuthenticated = account != null;
  console.log(isAuthenticated);
  console.log("account: " + account);
  return renderIfAuthenticated === isAuthenticated ? <>{children}</> : null;
};

export default Authenticated;
