import type { Admin } from "@/types/admin";

const API_URL = import.meta.env.VITE_API_URL;

export type Administrator = {
  id: string; 
  email: string;
  firstName: string;
  lastName: string;
  status: "Active" | "Inactive";
  role: "Admin" | "Super Admin";
};

export async function archiveAdmin(id: string): Promise<{ message: string }> {
  const res = await fetch(`${API_URL}/admins/${id}/archive`, {
    method: "DELETE",
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to archive admin");
  return res.json();
}

export async function fetchAdmins(): Promise<Administrator[]> {
  const res = await fetch(`${API_URL}/admins`, {
    method: "GET",
    credentials: "include",
  });
  if (!res.ok) throw new Error(`Failed to fetch admins: ${res.statusText}`);
  return res.json();
}

export async function createAdmin(data: {
  id: string;
  email: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  role: "Admin" | "Super Admin";
}) {
  const response = await fetch(`${API_URL}/admins`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to create admin");
  }

  return response.json();
}

export async function updateAdminStatus(id: string, status: "Active" | "Inactive") {
  const res = await fetch(`${API_URL}/admins/${id}/status`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to update admin status");
  return res.json();
}

export async function updateAdmin(
  id: string,
  data: Partial<Admin> & { currentPassword?: string; newPassword?: string }
): Promise<Admin> {
  const res = await fetch(`${API_URL}/admins/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to update admin");
  }

  const json = await res.json();
  return json.admin; 
}
