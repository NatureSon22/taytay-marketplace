import { create } from "zustand";

type Crumb = {
  label: string;
  path: string;
};

type BreadCrumbState = {
  crumbs: Crumb[] | [];
  addPath: (crumb: Crumb) => void;
  setPath: (crumbs: Crumb[]) => void;
  resetPath: () => void;
};

const useBreadCrumbStore = create<BreadCrumbState>()((set) => ({
  crumbs: [],
  addPath: (crumb: Crumb) =>
    set((state) => {
      const exists = state.crumbs.some((c) => c.path === crumb.path);
      return { crumbs: exists ? state.crumbs : [...state.crumbs, crumb] };
    }),
  setPath: (crumbs: Crumb[]) => set({ crumbs }),
  resetPath: () => set({ crumbs: [] }),
}));

export type { Crumb };
export { useBreadCrumbStore };
