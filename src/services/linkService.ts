import type { LinkType } from "@/types/link";

const API_URL = `${import.meta.env.VITE_API_URL}/links`;

export const linkService = {
    getLinks: async (): Promise<LinkType[]> => {
        const res = await fetch(API_URL, {
            method: "GET",
            credentials: "include",
        });
        if (!res.ok) throw new Error("Failed to fetch links");
        return res.json();
    },

    createLink: async (formData: FormData): Promise<LinkType> => {
    const res = await fetch(API_URL, {
        method: "POST",
        body: formData,
        credentials: "include",
    });  
    if (!res.ok) {
    let errorMessage = "Failed to create link";
    try {
      const errorData = await res.json();
      if (errorData?.message) errorMessage = errorData.message;
    } catch {
    }
    throw new Error(errorMessage);
  }
    return res.json();
    },

    archiveLink: async (id: string): Promise<{ message: string }> => {
        const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        credentials: "include",
        });
        if (!res.ok) throw new Error("Failed to archive link");
        return res.json();
    },
};
