import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getProductTypes, archiveProductTypeById, createProductType, getArchivedProductTypes, retrieveProductType } from "@/services/productTypeService";
import type { ProductType } from "@/types/producttype";

export function useProductTypes() {
  const queryClient = useQueryClient();

  const productTypesQuery = useQuery<ProductType[], Error>({
    queryKey: ["productTypes"],
    queryFn: getProductTypes,
  });

  const archiveMutation = useMutation({
    mutationFn: archiveProductTypeById,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["productTypes"] });
    },
  });

  return {
    ...productTypesQuery,
    archiveProductTypes: archiveMutation.mutate,
    isArchiving: archiveMutation.isPending,
  };
}

export function useArchivedProductType() {
  return useQuery<ProductType[], Error>({
    queryKey: ["archivedProductTypes"],
    queryFn: getArchivedProductTypes,
  });
}

export function useRetrieveProductType() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: retrieveProductType,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["archivedProductTypes"] });
      queryClient.invalidateQueries({ queryKey: ["productTypes"] });
    },
  });
}

export function useCreateProductType() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProductType,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["productTypes"] });
    },
  });
}


