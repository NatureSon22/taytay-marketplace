import type { FullUserAccount } from "@/types/account";
import type { Admin } from "@/types/admin";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type AccountState = {
  sellerAccount: (FullUserAccount & { userType: "account" }) | null;
  adminAccount: (Admin & { userType: "admin" }) | null;

  setSellerAccount: (account: FullUserAccount | null) => void;
  setAdminAccount: (account: Admin | null) => void;

  resetSellerAccount: () => void;
  resetAdminAccount: () => void;
};

const useAccountStore = create<AccountState>()(
  persist(
    (set) => ({
      sellerAccount: null,
      adminAccount: null,

      setSellerAccount: (account) =>
        set(() => ({
          sellerAccount: account ? { ...account, userType: "account" } : null,
        })),

      setAdminAccount: (account) =>
        set(() => ({
          adminAccount: account ? { ...account, userType: "admin" } : null,
        })),

      resetSellerAccount: () => set(() => ({ sellerAccount: null })),
      resetAdminAccount: () => set(() => ({ adminAccount: null })),
    }),
    {
      name: "account-storage", // key in localStorage
    }
  )
);

export default useAccountStore;
