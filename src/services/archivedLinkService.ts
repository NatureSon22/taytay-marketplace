import type { ArchivedLinkType } from "@/types/link";

const API_URL = "http://localhost:3000/api/archived-links";

export async function getArchivedLinks(): Promise<ArchivedLinkType[]> {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Failed to fetch archived links");
  return res.json();
}

export async function restoreArchivedLink(id: string): Promise<void> {
  const res = await fetch(`${API_URL}/restore/${id}`, {
    method: "POST",
  });
  if (!res.ok) throw new Error("Failed to restore link");
}
