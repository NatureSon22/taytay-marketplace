import type { UserAccount } from "@/types/account";
import { create } from "zustand";

type AccountState = {
  account: UserAccount | null;
  setAccount: (account: UserAccount | null) => void;
  resetAccount: () => void;
};

const useAccountStore = create<AccountState>((set) => ({
  account: null,
  setAccount: (account: UserAccount | null) => set(() => ({ account })),
  resetAccount: () => set(() => ({ account: null })),
}));

export default useAccountStore;
