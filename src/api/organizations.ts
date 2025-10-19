import { createFetchOptions } from "./fetchOptions";

export const getOrganizations = async () => {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/organizations/`,
    createFetchOptions({ method: "GET" })
  );

  const body = await res.json();

  if (!res.ok) {
    throw new Error(body.message || "Failed to get organizations");
  }

  return body;
};
