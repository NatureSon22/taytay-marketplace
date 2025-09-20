import type { LoginCredentials } from "@/types/registration";
import { createFetchOptions } from "./fetchOptions";

export const login = async (credentials: LoginCredentials) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(credentials),
  });

  const body = await res.json();

  if (!res.ok) {
    throw new Error(body.message || "Login failed");
  }

  const result = await res.json();
  return result;
};

export const register = async (form: FormData): Promise<string> => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
    method: "POST",
    body: form,
    credentials: "include",
  });

  const body = await res.json();

  if (!res.ok) {
    throw new Error(body.message || "Registration failed");
  }

  return body.message as string;
};

export const logout = async (): Promise<string> => {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/auth/logout`,
    createFetchOptions({ method: "POST" })
  );

  const body = await res.json();

  if (!res.ok) {
    throw new Error(body.message || "Logout failed");
  }

  return body.message as string;
};

export const getLoggedInUser = async () => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/user`, {
    method: "GET",
    credentials: "include",
  });

  const body = await res.json();

  if (!res.ok) {
    throw new Error(body.message || "Failed to fetch user");
  }

const result = await res.json();
return result; 
};
