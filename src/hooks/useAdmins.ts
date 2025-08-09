import { useState, useMemo } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchAdmins,
  archiveAdmin as archiveAdminApi,
  updateAdminStatus as updateAdminStatusApi,
} from "@/services/admin";

export function useAdmins(enabled: boolean, searchTerm: string) {
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Fetch Admins
  const { data: admins = [], isLoading } = useQuery({
    queryKey: ["admins", searchTerm],
    queryFn: () => fetchAdmins(searchTerm),
    enabled,
  });

  // Filtered + Paginated
  const filteredAdmins = useMemo(() => {
    if (!searchTerm) return admins;
    const lower = searchTerm.toLowerCase();
    return admins.filter((a) =>
      `${a.firstName} ${a.lastName} ${a.email}`.toLowerCase().includes(lower)
    );
  }, [admins, searchTerm]);

  const paginatedAdmins = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAdmins.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAdmins, currentPage]);

  const totalPages = Math.max(1, Math.ceil(filteredAdmins.length / itemsPerPage));

  // Archive Mutation
  const { mutate: archiveAdmin, isLoading: isArchiving } = useMutation({
    mutationFn: archiveAdminApi,
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["admins", searchTerm] });
      const prev = queryClient.getQueryData<any[]>(["admins", searchTerm]) || [];
      queryClient.setQueryData(
        ["admins", searchTerm],
        prev.filter((a) => a.id !== id)
      );
      return { prev };
    },
    onError: (_err, _id, ctx) => {
      if (ctx?.prev) queryClient.setQueryData(["admins", searchTerm], ctx.prev);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["admins", searchTerm] });
    },
  });

  // Status Update Mutation
  const { mutate: updateAdminStatus, isLoading: isUpdatingStatus } = useMutation({
    mutationFn: ({ id, status }: { id: string; status: "Active" | "Inactive" }) =>
      updateAdminStatusApi(id, status),
    onMutate: async ({ id, status }) => {
      await queryClient.cancelQueries({ queryKey: ["admins", searchTerm] });
      const prev = queryClient.getQueryData<any[]>(["admins", searchTerm]) || [];
      queryClient.setQueryData(
        ["admins", searchTerm],
        prev.map((a) => (a.id === id ? { ...a, status } : a))
      );
      return { prev };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.prev) queryClient.setQueryData(["admins", searchTerm], ctx.prev);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["admins", searchTerm] });
    },
  });

  return {
    admins: paginatedAdmins,
    isLoading,
    archiveAdmin,
    isArchiving,
    updateAdminStatus,
    isUpdatingStatus,
    currentPage,
    totalPages,
    setCurrentPage,
  };
}
