import { getLoggedInUser } from "@/api/auth";
import useAccountStore from "@/stores/useAccountState";
import useStoreState from "@/stores/useStoreState";
import { useQuery } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import { type ReactNode, useEffect } from "react";
import { Navigate } from "react-router-dom";

type AuthLayerProps = {
  children: ReactNode;
  allowedUserType: "account" | "admin";
};

function AuthLayer({ children, allowedUserType }: AuthLayerProps) {
  const { account, setAccount } = useAccountStore();
  const { setStore } = useStoreState();

  const { data, isPending, isError } = useQuery({
    queryKey: ["auth", "currentUser"],
    queryFn: getLoggedInUser,
    refetchOnWindowFocus: false,
    enabled: !account,
  });

  useEffect(() => {
    if (data) {
      setAccount(data.publicUser);
      setStore(data.store);
    }
  }, [data, setAccount, setStore]);

  if (account) {
    if (account.userType !== allowedUserType) {
      if (account.userType === "account") return <Navigate to="/account" replace />;
      else return <Navigate to="/admin" replace />;
    }
    return children;
  }

  if (isPending) {
    return (
      <div className="grid place-items-center h-screen lg:h-[700px]">
        <LoaderCircle className="size-16 md:size-24 text-slate-300 animate-spin" />
      </div>
    );
  }

  if (isError || !data) {
    return <Navigate to="/login" replace />; 
  }

  return children;
}

export default AuthLayer;
