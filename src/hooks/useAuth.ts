import { getLoggedInUser } from "@/api/auth";
import useAccountStore from "@/stores/useAccountStore";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const useAuth = () => {
  const { account, setAccount } = useAccountStore();
  const { data, isPending, isSuccess, isError } = useQuery({
    queryKey: ["authenticated"],
    queryFn: getLoggedInUser,
    refetchOnWindowFocus: false,
    enabled: !account,
  });

  useEffect(() => {
    if (isPending) return;

    if (isSuccess && data) {
      if (
        !account ||
        ("accountId" in account &&
          "accountId" in data &&
          account.accountId !== data.accountId)
      ) {
        setAccount(data);
      }
    } else if (isError) {
      setAccount(null);
    }
  }, [isPending, isSuccess, data, isError, setAccount, account]);

  return { account, isPending };
};

export default useAuth;
