import { getLoggedInUser } from "@/api/auth";
import useAccountStore from "@/stores/useAccountStore";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const useAuth = () => {
  const { setAccount } = useAccountStore();

  const { data, status } = useQuery({
    queryKey: ["authenticated"],
    queryFn: getLoggedInUser,
  });

  useEffect(() => {
    if (status === "success") {
      setAccount(data);
    } else if (status === "error") {
      setAccount(null);
    }
  }, [status, data, setAccount]);
};

export default useAuth;
