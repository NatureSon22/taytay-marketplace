import type { IActLog } from "@/types/actlog";

const API_URL = import.meta.env.VITE_API_URL;

export const fetchActLogs = async (): Promise<IActLog[]> => {
  const res = await fetch(`${API_URL}/logs`);
  if (!res.ok) throw new Error("Failed to fetch logs");
  return res.json();
};

export const fetchActLogById = async (id: string): Promise<IActLog> => {
  const res = await fetch(`${API_URL}/logs/${id}`);
  if (!res.ok) throw new Error("Failed to fetch log");
  return res.json();
};

export const createActLog = async (
  payload: Omit<IActLog, "_id" | "createdAt" | "updatedAt">
): Promise<IActLog> => {
  const res = await fetch(`${API_URL}/logs`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to create log");
  return res.json();
};

export const deleteActLog = async (id: string): Promise<{ message: string }> => {
  const res = await fetch(`${API_URL}/logs/${id}`, {
    method: "DELETE"
  });
  if (!res.ok) throw new Error("Failed to delete log");
  return res.json();
};
