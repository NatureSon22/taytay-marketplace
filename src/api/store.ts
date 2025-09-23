import type { Store } from "@/types";
import { createFetchOptions } from "./fetchOptions";

export const updateStoreIcon = async (
  payload: FormData,
  id: string
): Promise<Store> => {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/store/${id}/profile-picture`,
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
    `${import.meta.env.VITE_API_URL}/store/${id}`,
    createFetchOptions({ method: "PUT", body: payload })
  );

  if (!res.ok) {
    const { message } = await res.json();
    throw new Error(message);
  }

  const { data } = await res.json();
  return data;
};

export const getStoreProducts = async (id: string) => {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/store/${id}/products`,
    createFetchOptions({ method: "GET" })
  );

  const body = await res.json();

  if (!res.ok) {
    throw new Error(body.message);
  }

  return body.data;
};
