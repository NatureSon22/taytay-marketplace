import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchActLogs,
  fetchActLogById,
  createActLog,
  deleteActLog,
} from "@/services/actLogService";
import type { IActLog } from "@/types/actlog";

export function useActLogs() {
  return useQuery<IActLog[]>({
    queryKey: ["actLogs"],
    queryFn: fetchActLogs,
  });
}

export function useActLog(id: string) {
  return useQuery<IActLog>({
    queryKey: ["actLogs", id],
    queryFn: () => fetchActLogById(id),
    enabled: !!id,
  });
}

export function useCreateActLog() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createActLog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["actLogs"] });
    },
  });
}

export function useDeleteActLog() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteActLog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["actLogs"] });
    },
  });
}
