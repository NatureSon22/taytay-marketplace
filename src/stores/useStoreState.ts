import type { Store } from "@/types";

import { create } from "zustand";

type StoreState = {
  store: Store | null;
  storeIsEmpty: () => boolean;
  setStore: (store: Store | null) => void;
  resetStore: () => void;
};

const useStoreState = create<StoreState>((set, get) => ({
  store: null,
  storeIsEmpty: () => get().store === null,
  setStore: (store: Store | null) => set(() => ({ store: store })),
  resetStore: () => set(() => ({ store: null })),
}));

export default useStoreState;
