import type { FullUserAccount } from "@/types/account";
import { create } from "zustand";

type AccountState = {
  account: FullUserAccount | null;
  setAccount: (account: FullUserAccount | null) => void;
  resetAccount: () => void;
};

const useAccountStore = create<AccountState>((set) => ({
  account: null,
  setAccount: (account: FullUserAccount | null) => set(() => ({ account })),
  resetAccount: () => set(() => ({ account: null })),
}));

export default useAccountStore;
