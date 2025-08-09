import { useQuery } from "@tanstack/react-query";

export interface Admin {
  id: string;
  email: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  status: "Active" | "Inactive";
  role: "Admin" | "Super Admin";
}

export function useAdmins() {
  return useQuery<Admin[]>({
    queryKey: ["admins"],
    queryFn: async () => {
      const res = await fetch("http://localhost:3000/api/admins");
      if (!res.ok) {
        throw new Error("Failed to fetch admins");
      }
      return res.json();
    },
  });
}
