import type { UserCredentials, UserProfile } from "@/types/account";

export const updateAccount = async (
  payload: (UserCredentials | UserProfile) & { id: string }
) => {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/accounts/${payload.id}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(payload),
    }
  );

  const body = await res.json();

  if (!res.ok) {
    throw new Error(body.message);
  }

  return body.data;
};
