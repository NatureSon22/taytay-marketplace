
const API_URL = import.meta.env.VITE_API_URL;

export async function fetchArchivedAdmins() {
  const res = await fetch(`${API_URL}/archive-admins`, {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch archived admins");
  }

  return res.json();
}

export async function restoreArchivedAdmin(id: string) {
  const res = await fetch(`${API_URL}/archive-admins/${id}/restore`, {
    method: "POST",
    credentials: "include",
  });
  if (!res.ok) {
    throw new Error("Failed to restore admin");
  }
  return res.json();
}
