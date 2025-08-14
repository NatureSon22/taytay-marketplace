import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchArchivedAdmins, restoreArchivedAdmin } from "@/services/adminArchivedService";

export function useArchivedAdmins() {
  const queryClient = useQueryClient();

  const { data: archivedAdmins = [], isLoading } = useQuery({
    queryKey: ["archivedAdmins"],
    queryFn: fetchArchivedAdmins,
  });

  const { mutate: restoreAdmin, isPending: isRestoring } = useMutation({
    mutationFn: (id: string) => restoreArchivedAdmin(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["archivedAdmins"] });
      queryClient.invalidateQueries({ queryKey: ["admins"] });
    },
  });

  return { archivedAdmins, isLoading, restoreAdmin, isRestoring };
}
