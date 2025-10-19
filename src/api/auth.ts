import type { LoginCredentials } from "@/types/registration";
import { createFetchOptions } from "./fetchOptions";
import type { FullUserAccount } from "@/types/account";
import type { Admin } from "@/types/admin";
import type { Store } from "@/types";

export type Seller = {
  publicUser: FullUserAccount;
  store: Store;
};

export type LoginResponse =
  | {
      message: string;
      type: "admin";
      data: Admin;
    }
  | {
      message: string;
      type: "account";
      data: Seller;
    };

export type LoginVerification = {
  code: string;
  email: string;
  userId: string;
  userType: string;
};

export const login = async (
  credentials: LoginCredentials
): Promise<LoginResponse> => {
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

  if (body.type === "admin") {
    return {
      message: body.message,
      type: "admin",
      data: body.data as Admin,
    };
  } else {
    return {
      message: body.message,
      type: "account",
      data: {
        publicUser: body.data.publicUser,
        store: body.data.store,
      },
    };
  }
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

  const { publicUser, store } = body.data;
  return publicUser && store
    ? { publicUser, store, type: body.data.type }
    : body.data;
};

export const sendVerification = async (email: string) => {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/auth/send-verification`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    }
  );

  const body = await res.json();

  if (!res.ok) {
    throw new Error(body.message || "Failed to send verification");
  }

  return body.message;
};

export const loginVerification = async (data: LoginVerification) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/verify-code`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const body = await res.json();

  if (!res.ok) {
    throw new Error(body.message || "Failed to send verification");
  }

  return body.message;
};
