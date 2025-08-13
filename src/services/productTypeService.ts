import type { ProductType } from "@/types/producttype";

const API_URL = import.meta.env.VITE_API_URL;

export async function getProductTypes(): Promise<ProductType[]> {
  const res = await fetch(`${API_URL}/product-types`);
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
}

export async function archiveProductTypeById(id: string): Promise<{ message: string }> {
  const res = await fetch(`${API_URL}/product-types/${id}/archive`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to archive category");
  return res.json();
}

export async function createProductType(data: { id: string; label: string }) {
  const res = await fetch(`${API_URL}/product-types`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create category");
  return res.json();
}

export async function getArchivedProductTypes() {
  const res = await fetch(`${API_URL}/archive-product-types`);
  if (!res.ok) throw new Error("Failed to fetch archived categories");
  return res.json();
}

export async function retrieveProductType(id: string) {
  const res = await fetch(`${API_URL}/archive-product-types/${id}/restore`, {
    method: "POST",
  });
  if (!res.ok) throw new Error("Failed to retrieve category");
  return res.json();
}
