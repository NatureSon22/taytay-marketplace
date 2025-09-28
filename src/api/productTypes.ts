import { createFetchOptions } from "./fetchOptions";

export const getAllProductTypes = async () => {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/product-types`,
    createFetchOptions({ method: "GET" })
  );

  const body = await res.json();

  if (!res.ok) {
    throw new Error(body.message || "Failed to fetch linked accounts");
  }

  return body;
};

export const getAllProductTypesForStore = async (id: string) => {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/product-types/${id}`,
    createFetchOptions({ method: "GET" })
  );

  const body = await res.json();

  if (!res.ok) {
    throw new Error(body.message || "Failed to fetch linked accounts");
  }

  return body;
};
