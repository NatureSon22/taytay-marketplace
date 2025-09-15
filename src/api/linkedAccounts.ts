import type { LinkType } from "@/data/linkTypeData";
import { createFetchOptions } from "./fetchOptions";

export const getLinkedAccounts = async (): Promise<LinkType[]> => {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/links`,
    createFetchOptions({ method: "GET" })
  );

  const body = await res.json();

  if (!res.ok) {
    throw new Error(body.message || "Failed to fetch linked accounts");
  }

  if (!body) {
    return [];
  }

  return body as LinkType[];
};
