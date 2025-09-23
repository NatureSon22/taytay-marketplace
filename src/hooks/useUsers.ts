// hooks/useUsers.ts
import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

const API_URL = import.meta.env.VITE_API_URL;

export type Seller = {
  id: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  birthday: string;
  age: string;
  contactNumber: string;
  address?: string;
  username: string;
  email: string;
  status: "Pending" | "Verified" | "Blocked";
  isVerified: boolean;
  isDeleted: boolean;
};

export function useUsers(userType: "Seller" | "Administrator", searchTerm?: string) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7; // ✅ Sellers table uses 7 per page (like your design)

  // Only fetch if Seller tab is active
  const { data: users = [], isLoading } = useQuery<Seller[]>({
    queryKey: ["sellers"],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/accounts`, {
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to fetch sellers");

      const body = await res.json();
      return body.data; // ✅ unwrap { message, data }
    },
    enabled: userType === "Seller",
  });

  // Filtering
  const filteredUsers = useMemo(() => {
    if (!searchTerm) return users;
    const lower = searchTerm.toLowerCase();
    return users.filter((u) =>
      `${u.firstName} ${u.lastName} ${u.email}`.toLowerCase().includes(lower)
    );
  }, [users, searchTerm]);

  // Pagination
  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredUsers.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredUsers, currentPage]);

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / itemsPerPage));

  return {
    paginatedUsers,
    isLoading,
    currentPage,
    totalPages,
    setCurrentPage,
  };
}
