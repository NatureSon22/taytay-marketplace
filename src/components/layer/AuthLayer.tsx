import { getLoggedInUser } from "@/api/auth";
import { useQuery } from "@tanstack/react-query";
import { type ReactNode } from "react";
import { Navigate } from "react-router-dom";

type AuthLayerProps = {
  children: ReactNode;
};

function AuthLayer({ children }: AuthLayerProps) {
  const { data, isPending, isError } = useQuery({
    queryKey: ["authenticated"],
    queryFn: getLoggedInUser,
    refetchOnWindowFocus: false,
  });

  if (isPending) {
    return <p>Loading...</p>;
  }

  const isAuthenticated = !isError && data && !(data instanceof Error);

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default AuthLayer;
