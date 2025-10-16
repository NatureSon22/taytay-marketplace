import type { Organization } from "@/types/organization";

const API_URL = import.meta.env.VITE_API_URL;

export async function getOrganizations(): Promise<Organization[]> {
  const res = await fetch(`${API_URL}/organizations`,{
    method: "GET",
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to fetch organizations");
  return res.json();
}

export async function archiveOrganizationById(id: string): Promise<{ message: string }> {
  const res = await fetch(`${API_URL}/organizations/${id}/archive`, {
    method: "DELETE",
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to archive organization");
  return res.json();
}

export async function createOrganization(data: { organizationName: string }) {
  const res = await fetch(`${API_URL}/organizations`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    let errorMessage = "Failed to create category";
    try {
      const errorData = await res.json();
      if (errorData?.message) {
        errorMessage = errorData.message;
      }
    } catch {
      // ignore JSON parse errors, keep default
    }
    throw new Error(errorMessage);
  }

  return res.json();
}


export async function getArchivedOrganizations() {
  const res = await fetch(`${API_URL}/archived-organizations`, {
    method: "GET",
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to fetch archived organizations");
  return res.json();
}

export async function retrieveOrganization(id: string) {
  const res = await fetch(`${API_URL}/archived-organizations/${id}/restore`, {
    method: "POST",
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to retrieve organization");
  return res.json();
}
