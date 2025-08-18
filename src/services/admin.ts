
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
  });
  if (!res.ok) throw new Error("Failed to archive admin");
  return res.json();
}

export async function fetchAdmins(): Promise<Administrator[]> {
  const res = await fetch(`${API_URL}/admins`);
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
  });
  if (!res.ok) throw new Error("Failed to update admin status");
  return res.json();
}
