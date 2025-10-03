import { useQuery } from "@tanstack/react-query";
import type { Admin } from "@/types/admin";

const API_URL = import.meta.env.VITE_API_URL;

export function useReports() {
  return useQuery<Admin[]>({
    queryKey: ["admins"],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/admins`, {
        credentials: "include",
      });
      if (!res.ok) {
        throw new Error("Failed to fetch admins");
      }
      return res.json();
    },
  });
}
