import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { linkService } from "@/services/linkService";
import type { LinkType } from "@/types/link";

export const useLinks = () => {
  return useQuery<LinkType[]>({
    queryKey: ["links"],
    queryFn: linkService.getLinks,
  });
};

export const useCreateLink = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: FormData) => linkService.createLink(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["links"] });
    },
  });
};

export const useArchiveLink = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => linkService.archiveLink(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["links"] });
    },
  });
};
