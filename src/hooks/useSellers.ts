import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchSellers,
  updateSellerStatus,
  type Seller,
} from "@/services/seller";

export function useSellers(enabled: boolean, searchTerm?: string) {
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  // ✅ fetch sellers
  const { data: sellers = [], isLoading } = useQuery<Seller[]>({
    queryKey: ["sellers"],
    queryFn: fetchSellers,
    enabled,
  });

  // ✅ search
  const filtered = useMemo(() => {
    if (!searchTerm) return sellers;
    const lower = searchTerm.toLowerCase();
    return sellers.filter((s) =>
      `${s.firstName} ${s.lastName} ${s.email}`.toLowerCase().includes(lower)
    );
  }, [sellers, searchTerm]);

  // ✅ pagination
  const paginated = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filtered.slice(start, start + itemsPerPage);
  }, [filtered, currentPage]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));

  const { mutate: updateStatus, isPending: isUpdatingStatus } = useMutation({
    mutationFn: ({
      _id,
      status,
    }: {
      _id: string;
      status: "Pending" | "Verified" | "Blocked";
    }) => updateSellerStatus(_id, status), // service fn
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["sellers"] }),
  });

  return {
    sellers: paginated,
    isLoading,
    updateStatus,        // use in <UserStatusSelect>
    isUpdatingStatus,    // loading state
    currentPage,
    totalPages,
    setCurrentPage,
  };
}
