import type { IGeneralInformation } from "@/types/generalInformation";

const API_URL = `${import.meta.env.VITE_API_URL}/general-information`;

export async function fetchGeneralInformation(): Promise<IGeneralInformation> {
  const res = await fetch(API_URL, {
    method: "GET",
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to fetch general information");
  return res.json();
}

export async function saveGeneralInformation(
  info: IGeneralInformation
): Promise<IGeneralInformation> {
  const res = await fetch(API_URL, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(info),
  });
  if (!res.ok) throw new Error("Failed to save general information");
  return res.json();
}
