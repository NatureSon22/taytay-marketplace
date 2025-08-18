import type { ArchivedLinkType } from "@/types/link";

const API_URL = import.meta.env.VITE_API_URL;

export async function getArchivedLinks(): Promise<ArchivedLinkType[]> {
  const res = await fetch(`${API_URL}/archived-links`);
  if (!res.ok) throw new Error("Failed to fetch archived links");
  return res.json();
}

export async function restoreArchivedLink(id: string): Promise<void> {
  const res = await fetch(`${API_URL}/archived-links/restore/${id}`, {
    method: "POST",
  });
  if (!res.ok) throw new Error("Failed to restore link");
}
