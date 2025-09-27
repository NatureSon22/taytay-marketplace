import { getLoggedInUser } from "@/api/auth";
import useAccountStore from "@/stores/useAccountState";
import useStoreState from "@/stores/useStoreState";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const useAuth = () => {
  const {
    setSellerAccount,
    setAdminAccount,
    resetSellerAccount,
    resetAdminAccount,
  } = useAccountStore();
  const { setStore } = useStoreState();

  const { data, status } = useQuery({
    queryKey: ["authenticated"],
    queryFn: getLoggedInUser,
    retry: false,
  });

  useEffect(() => {
    if (status === "success" && data) {
      if (data.type === "admin") {
        setAdminAccount(data.data);
        resetSellerAccount();
      } else {
        setSellerAccount(data.publicUser);
        setStore(data.store);
        resetAdminAccount();
      }
    } else if (status === "error") {
      resetSellerAccount();
      resetAdminAccount();
    }
  }, [
    status,
    data,
    setSellerAccount,
    setAdminAccount,
    resetSellerAccount,
    resetAdminAccount,
    setStore,
  ]);
};

export default useAuth;
