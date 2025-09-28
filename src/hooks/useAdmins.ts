import { useState, useMemo } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { updateAdmin as updateAdminApi } from "@/services/admin";
import {
  fetchAdmins,
  archiveAdmin as archiveAdminApi,
  updateAdminStatus as updateAdminStatusApi,
} from "@/services/admin";
import type { Admin } from "@/types/admin";
import useAccountStore from "@/stores/useAccountState";
import { toast } from "sonner";

const API_URL = import.meta.env.VITE_API_URL;

export function useAdmins(enabled: boolean, searchTerm?: string) {
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const setAdminAccount = useAccountStore((state) => state.setAdminAccount);
  
  useQuery<Admin[]>({
    queryKey: ["admins"],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/admins`);
      if (!res.ok) {
        throw new Error("Failed to fetch admins");
      }
      return res.json();
    },
  });

  const { data: admins = [], isLoading } = useQuery({
    queryKey: ["admins"], 
    queryFn: () => fetchAdmins(),
    enabled,
  });

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

const { mutate: archiveAdmin, isPending: isArchiving } = useMutation({
  mutationFn: archiveAdminApi,
  onMutate: async (id) => {
    await queryClient.cancelQueries({ queryKey: ["admins"] });
    const prev = queryClient.getQueryData<any[]>(["admins"]) || [];
    queryClient.setQueryData(
      ["admins"],
      prev.filter((a) => a.id !== id)
    );
    return { prev };
  },
  onError: (_err, _id, ctx) => {
    if (ctx?.prev) queryClient.setQueryData(["admins"], ctx.prev);
    toast.error("Failed to archive admin");
  },
  onSuccess: () => {
    toast.success("Admin archived successfully");
  },
  onSettled: () => {
    queryClient.invalidateQueries({ queryKey: ["admins"] });
  },
});

// Update Admin Status
const { mutate: updateAdminStatus, isPending: isUpdatingStatus } = useMutation({
  mutationFn: ({ id, status }: { id: string; status: "Active" | "Inactive" }) =>
    updateAdminStatusApi(id, status),
  onMutate: async ({ id, status }) => {
    await queryClient.cancelQueries({ queryKey: ["admins"] });
    const prev = queryClient.getQueryData<any[]>(["admins"]) || [];
    queryClient.setQueryData(
      ["admins"],
      prev.map((a) => (a.id === id ? { ...a, status } : a))
    );
    return { prev };
  },
  onError: (_err, _vars, ctx) => {
    if (ctx?.prev) queryClient.setQueryData(["admins"], ctx.prev);
    toast.error("Failed to update admin status");
  },
  onSuccess: () => {
    toast.success("Admin status updated successfully");
  },
  onSettled: () => {
    queryClient.invalidateQueries({ queryKey: ["admins"] });
  },
});

// Update Admin Info
const { mutateAsync: updateAdmin, isPending: isUpdatingAdmin } = useMutation({
  mutationFn: ({ id, data }: { id: string; data: any }) => updateAdminApi(id, data),
  onSuccess: (updatedAdmin) => {
    queryClient.setQueryData<Admin[]>(["admins"], (old) =>
      old ? old.map((a) => (a.id === updatedAdmin.id ? updatedAdmin : a)) : []
    );
    setAdminAccount(updatedAdmin);
    toast.success("Admin information updated successfully");
  },
  onError: (err: any) => {
    toast.error(err?.message || "Failed to update admin information");
  },
});
  return {
    admins: paginatedAdmins,
    isLoading,
    archiveAdmin,
    isArchiving,
    updateAdminStatus,
    isUpdatingStatus,
    updateAdmin,
    isUpdatingAdmin,
    currentPage,
    totalPages,
    setCurrentPage,
  };
}
