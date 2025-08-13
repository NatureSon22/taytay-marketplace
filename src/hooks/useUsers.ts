import { useEffect, useState } from "react";
import { sellerData } from "@/data/userData"; 
import { fetchAdmins } from "@/services/admin"; 

const USERS_PER_PAGE = 9;

export function useUsers(userType: "Seller" | "Administrator", searchTerm: string) {
  const [rawUsers, setRawUsers] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function loadUsers() {
      if (userType === "Seller") {
        setRawUsers(sellerData);
      } else {
        const admins = await fetchAdmins();
        setRawUsers(admins);
      }
      setCurrentPage(1);
    }
    loadUsers();
  }, [userType]);

  const filteredUsers = rawUsers.filter((user) =>
    Object.values(user).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

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
