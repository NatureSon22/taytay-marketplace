import { getLoggedInUser } from "@/api/auth";
import useAccountStore from "@/stores/useAccountState";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const useAuth = () => {
  const { setSellerAccount, setAdminAccount, resetSellerAccount, resetAdminAccount } =
    useAccountStore();

  const { data, status } = useQuery({
    queryKey: ["authenticated"],
    queryFn: getLoggedInUser,
    retry: false, 
  });

  useEffect(() => {
    if (status === "success" && data) {
      if (data.type === "account") {
        setSellerAccount(data.data);
        resetAdminAccount();
      } else if (data.type === "admin") {
        setAdminAccount(data.data);
        resetSellerAccount();
      }
    } else if (status === "error") {
      resetSellerAccount();
      resetAdminAccount();
    }
  }, [status, data, setSellerAccount, setAdminAccount, resetSellerAccount, resetAdminAccount]);
};

export default useAuth;
