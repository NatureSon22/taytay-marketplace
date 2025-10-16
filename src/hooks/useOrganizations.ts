import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Organization } from "@/types/organization";
import { archiveOrganizationById, getArchivedOrganizations, getOrganizations, retrieveOrganization, createOrganization } from "@/services/organizationService";

export function useOrganizations() {
  const queryClient = useQueryClient();

  const organizationsQuery = useQuery<Organization[], Error>({
    queryKey: ["organizations"],
    queryFn: getOrganizations,
  });

  const archiveMutation = useMutation({
    mutationFn: archiveOrganizationById,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["organizations"] });
    },
  });

  return {
    ...organizationsQuery,
    archiveOrganization: archiveMutation.mutate,
    isArchiving: archiveMutation.isPending,
  };
}

export function useArchivedOrganizations() {
  return useQuery<Organization[], Error>({
    queryKey: ["archivedOrganizations"],
    queryFn: getArchivedOrganizations,
  });
}

export function useRetrieveOrganization() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: retrieveOrganization,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["archivedOrganizations"] });
      queryClient.invalidateQueries({ queryKey: ["organizations"] });
    },
  });
}

export function useCreateOrganization() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createOrganization,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["organizations"] });
    },
  });
}


