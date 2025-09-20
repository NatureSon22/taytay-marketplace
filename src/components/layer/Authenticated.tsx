import useAccountStore from "@/stores/useAccountState";
import type { ReactNode } from "react";

type AuthenticatedProps = {
  children: ReactNode;
  renderIfAuthenticated?: boolean;
};

const Authenticated = ({
  children,
  renderIfAuthenticated = true,
}: AuthenticatedProps): JSX.Element | null => {
  const { sellerAccount, adminAccount } = useAccountStore((state) => state);

  const isAuthenticated = sellerAccount != null || adminAccount != null;

  return renderIfAuthenticated === isAuthenticated ? <>{children}</> : null;
};

export default Authenticated;
