import { create } from "zustand";
import type { Admin } from "@/types/admin"; 

interface AdminState {
  admin: Admin | null;
  setAdmin: (admin: Admin) => void;
}

const useAdminStore = create<AdminState>((set) => ({
  admin: null,
  setAdmin: (admin) => set({ admin }),
}));

export default useAdminStore;
