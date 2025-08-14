import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCategories, archiveCategoryById, createCategory, getArchivedCategories, retrieveCategory  } from "@/services/categoryService";
import type { Category } from "@/types/category";

export function useCategories() {
  const queryClient = useQueryClient();

  const categoriesQuery = useQuery<Category[], Error>({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const archiveMutation = useMutation({
    mutationFn: archiveCategoryById,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  return {
    ...categoriesQuery,
    archiveCategory: archiveMutation.mutate,
    isArchiving: archiveMutation.isPending,
  };
}

export function useArchivedCategories() {
  return useQuery<Category[], Error>({
    queryKey: ["archivedCategories"],
    queryFn: getArchivedCategories,
  });
}

export function useRetrieveCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: retrieveCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["archivedCategories"] });
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
}

export function useCreateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
}


