import { getLoggedInUser } from "@/api/auth";
import useAccountStore from "@/stores/useAccountState";
import useStoreState from "@/stores/useStoreState";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const useAuth = () => {
  const { setAccount } = useAccountStore();
  const { setStore } = useStoreState();

  const { data, status } = useQuery({
    queryKey: ["authenticated"],
    queryFn: getLoggedInUser,
  });

  useEffect(() => {
    if (status === "success") {
      setAccount(data.publicUser);
      setStore(data.store);
    } else if (status === "error") {
      setAccount(null);
      setStore(null);
    }
  }, [status, data, setAccount, setStore]);
};

export default useAuth;
