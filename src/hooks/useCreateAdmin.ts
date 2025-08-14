import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAdmin } from "@/services/admin";

export function useCreateAdmin(onSuccessCallback?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createAdmin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admins"] }); 
      if (onSuccessCallback) onSuccessCallback(); 
    },
  });
}