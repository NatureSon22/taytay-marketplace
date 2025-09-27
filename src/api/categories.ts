import { createFetchOptions } from "./fetchOptions";

export const getAllCategories = async () => {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/categories`,
    createFetchOptions({ method: "GET" })
  );

  const body = await res.json();

  if (!res.ok) {
    throw new Error(body.message || "Failed to fetch linked accounts");
  }

  return body;
};

export const getAllCategoriesForStore = async (id: string) => {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/categories/${id}`,
    createFetchOptions({ method: "GET" })
  );

  const body = await res.json();

  if (!res.ok) {
    throw new Error(body.message || "Failed to fetch linked accounts");
  }

  return body;
};
