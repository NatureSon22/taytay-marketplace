import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getArchivedLinks, restoreArchivedLink } from "@/services/archivedLinkService";
import type { ArchivedLinkType } from "@/types/link";

export function useArchivedLinks() {
  return useQuery<ArchivedLinkType[], Error>({
    queryKey: ["archivedLinks"],
    queryFn: getArchivedLinks,
  });
}

export function useRestoreArchivedLink() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: restoreArchivedLink,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["archivedLinks"] });
    },
  });
}
