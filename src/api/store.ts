import type { Store } from "@/types";
import { createFetchOptions } from "./fetchOptions";
import type { Pagination } from "@/types/pagination";

export const getStores = async (
  storeName: string = "",
  page: number = 1,
  sort: string = ""
) => {
  const res = await fetch(
    `${
      import.meta.env.VITE_API_URL
    }/stores?storeName=${storeName}&page=${page}&sort=${sort}`,
    createFetchOptions({ method: "GET" })
  );

  const body = await res.json();

  if (!res.ok) {
    throw new Error(body.message || "Failed to fetch stores");
  }

  return body;
};

export const getStore = async (id: string): Promise<Store> => {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/stores/${id}`,
    createFetchOptions({ method: "GET" })
  );

  const body = await res.json();

  if (!res.ok) {
    const { message } = await res.json();
    throw new Error(message);
  }

  return body.data;
};

export const updateStoreIcon = async (
  payload: FormData,
  id: string
): Promise<Store> => {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/stores/${id}/profile-picture`,
    createFetchOptions({ method: "PUT", body: payload, stringifyBody: false })
  );

  if (!res.ok) {
    const { message } = await res.json();
    throw new Error(message);
  }

  const { data } = await res.json();
  return data;
};

export const updateStoreData = async (
  payload: Partial<Store>,
  id: string
): Promise<Store> => {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/stores/${id}`,
    createFetchOptions({ method: "PUT", body: payload })
  );

  if (!res.ok) {
    const { message } = await res.json();
    throw new Error(message);
  }

  const { data } = await res.json();
  return data;
};

export const getStoreProducts = async (
  id: string,
  productCategory: string = "",
  productType: string = "",
  page: number = 1
) => {
  const res = await fetch(
    `${
      import.meta.env.VITE_API_URL
    }/stores/${id}/products?productCategory=${productCategory}&productType=${productType}&page=${page}`,
    createFetchOptions({ method: "GET" })
  );

  const body = await res.json();

  if (!res.ok) {
    throw new Error(body.message);
  }

  return { products: body.data, pagination: body.pagination as Pagination };
};
