const API_URL = "http://localhost:3000/api"; 

export async function fetchArchivedAdmins() {
  const res = await fetch(`${API_URL}/archive-admins`);

  if (!res.ok) {
    throw new Error("Failed to fetch archived admins");
  }

  return res.json();
}

export async function restoreArchivedAdmin(id: string) {
  const res = await fetch(`${API_URL}/archive-admins/${id}/restore`, {
    method: "POST",
  });
  if (!res.ok) {
    throw new Error("Failed to restore admin");
  }
  return res.json();
}
