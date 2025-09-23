const API_URL = import.meta.env.VITE_API_URL;

export type Seller = {
  _id: string;
  email: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  storeName?: string;
  status: "Pending" | "Verified" | "Blocked";
  isVerified: boolean;
};

export async function fetchSellers(): Promise<Seller[]> {
  const res = await fetch(`${API_URL}/accounts`, {
    method: "GET",
    credentials: "include",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch sellers");
  }

  const json = await res.json();
  return json.data;
}

export async function updateSellerStatus(
  _id: string,
  status: "Pending" | "Verified" | "Blocked"
) {
  const res = await fetch(`${API_URL}/accounts/${_id}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to update seller status");
  }

  return res.json();
}
