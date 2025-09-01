import type { LoginCredentials } from "@/types/registration";
import { createFetchOptions } from "./fetchOptions";

export const login = async (credentials: LoginCredentials) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(credentials),
  });

  if (!res.ok) {
    const { message } = await res.json();
    throw new Error(message);
  }

  const { data } = await res.json();
  return data;
};

export const register = async (form: FormData) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
    method: "POST",
    body: form,
    credentials: "include",
  });

  if (!res.ok) {
    const { message } = await res.json();
    throw new Error(message);
  }

  const { message } = await res.json();
  return message;
};

export const logout = async () => {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/auth/logout`,
    createFetchOptions({ method: "POST" })
  );

  if (!res.ok) {
    const { message } = await res.json();
    throw new Error(message);
  }

  const { message } = await res.json();
  return message;
};

export const getLoggedInUser = async () => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/user`, {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) {
    const { message } = await res.json();
    throw new Error(message);
  }

  const { data } = await res.json();
  return data;
};
