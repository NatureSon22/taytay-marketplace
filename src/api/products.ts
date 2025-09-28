import type { Product } from "@/types";
import { createFetchOptions } from "./fetchOptions";
import type { Pagination } from "@/types/pagination";
import type { Item } from "@/components/SearchBar";

export type CreateProductResponse = {
  data: Product;
  message: string;
};

export const getProducts = async (
  page: number,
  productCategory: string = "",
  productType: string = "",
  sort: { field: string; order: string }[] = []
) => {
  const res = await fetch(
    `${
      import.meta.env.VITE_API_URL
    }/products?productCategory=${productCategory}&productType=${productType}&page=${page}&sort=${encodeURIComponent(
      JSON.stringify(sort)
    )}`,
    createFetchOptions({ method: "GET" })
  );

  const body = await res.json();

  if (!res.ok) {
    throw new Error(body.message);
  }

  return {
    products: body?.data,
    pagination: body.pagination as Pagination,
  };
};

export const getProduct = async (id: string): Promise<Product> => {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/products/${id}`,
    createFetchOptions({ method: "GET" })
  );

  const body = await res.json();

  if (!res.ok) {
    throw new Error(body.message);
  }

  return body.data;
};

export const getProductSuggestions = async (
  productName: string
): Promise<Item[]> => {
  const res = await fetch(
    `${
      import.meta.env.VITE_API_URL
    }/products/suggestions?productName=${productName}`,
    createFetchOptions({ method: "GET" })
  );

  const body = await res.json();

  if (!res.ok) {
    throw new Error(body.message);
  }

  return body.data;
};

export const createProduct = async (
  formData: FormData
): Promise<CreateProductResponse> => {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/products/`,
    createFetchOptions({ method: "POST", body: formData, stringifyBody: false })
  );

  if (!res.ok) {
    const { message } = await res.json();
    throw new Error(message);
  }

  const { data, message } = await res.json();
  return { data, message };
};
