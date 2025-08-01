import { useState } from "react";
import { sellerData, adminData } from "@/data/userData";

const USERS_PER_PAGE = 9;

export function useUsers(userType: "Seller" | "Administrator", searchTerm: string) {
  const rawUsers = userType === "Seller" ? sellerData : adminData;

  const filteredUsers = rawUsers.filter((user) =>
    Object.values(user).some((value) =>
      value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * USERS_PER_PAGE,
    currentPage * USERS_PER_PAGE
  );

  return {
    paginatedUsers,
    currentPage,
    totalPages,
    setCurrentPage,
  };
}
