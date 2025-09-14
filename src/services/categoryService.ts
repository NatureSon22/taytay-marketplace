import type { Category } from "@/types/category";

const API_URL = import.meta.env.VITE_API_URL;

export async function getCategories(): Promise<Category[]> {
  const res = await fetch(`${API_URL}/categories`,{
    method: "GET",
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
}

export async function archiveCategoryById(id: string): Promise<{ message: string }> {
  const res = await fetch(`${API_URL}/categories/${id}/archive`, {
    method: "DELETE",
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to archive category");
  return res.json();
}

export async function createCategory(data: { id: string; label: string }) {
  const res = await fetch(`${API_URL}/categories`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create category");
  return res.json();
}

export async function getArchivedCategories() {
  const res = await fetch(`${API_URL}/archive-categories`, {
    method: "GET",
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to fetch archived categories");
  return res.json();
}

export async function retrieveCategory(id: string) {
  const res = await fetch(`${API_URL}/archive-categories/${id}/restore`, {
    method: "POST",
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to retrieve category");
  return res.json();
}
