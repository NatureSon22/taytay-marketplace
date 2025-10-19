import { getLoggedInUser } from "@/api/auth";
import useAccountStore from "@/stores/useAccountState";
import useStoreState from "@/stores/useStoreState";
import { useQuery } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import { type ReactNode, useEffect } from "react";
import { Navigate } from "react-router-dom";

type AuthLayerProps = {
  children: ReactNode;
};

function AuthLayer({ children }: AuthLayerProps) {
  const { sellerAccount, adminAccount, setSellerAccount, setAdminAccount } =
    useAccountStore();
  const { setStore } = useStoreState();

  const hasAccount = sellerAccount || adminAccount;

  const { data, isPending, isError } = useQuery({
    queryKey: ["auth", "currentUser"],
    queryFn: getLoggedInUser,
    refetchOnWindowFocus: false,
    //enabled: !hasAccount,
  });

  useEffect(() => {
    if (data) {
      if (data.type === "account") {
        setSellerAccount(data.publicUser);
        setStore(data.store);
        console.log(data);
      } else if (data.type === "admin") {
        console.log("ADMIN DATA: " + data.data);
        setAdminAccount(data.data);
      }
    }
  }, [data, setAdminAccount, setSellerAccount, setStore]);

  if (hasAccount) return children;

  if (isPending) {
    return (
      <div className="grid place-items-center h-screen lg:h-[700px]">
        <LoaderCircle className="size-16 md:size-24 text-slate-300 animate-spin" />
      </div>
    );
  }

  if (isError || !data) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default AuthLayer;
