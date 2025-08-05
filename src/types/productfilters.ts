export type SortField = "price" | "popularity" | "alphabetical";

export type SortOrder =
  | "low-high"
  | "high-low"
  | "most-liked"
  | "most-viewed"
  | "a-z"
  | "z-a";

export type SortRule = {
  field: SortField;
  order: SortOrder;
};

export type FilterField = "category" | "apparel";

export type ProductFilterSettings = {
  category: string | null;
  apparel: string | null;
  sort: SortRule[];
};
