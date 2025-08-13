import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchGeneralInformation,
  saveGeneralInformation,
} from "@/services/generalInformationService";
import type { IGeneralInformation } from "@/types/generalInformation";

export function useGeneralInformation() {
  const queryClient = useQueryClient();

  const query = useQuery<IGeneralInformation>({
    queryKey: ["generalInformation"],
    queryFn: fetchGeneralInformation,
  });

  const mutation = useMutation({
    mutationFn: (info: IGeneralInformation) => saveGeneralInformation(info),
    onSuccess: (data) => {
      queryClient.setQueryData(["generalInformation"], data);
    },
  });

  return {
    ...query,
    saveInfo: mutation.mutate,
    isSaving: mutation.isPending,
  };
}
