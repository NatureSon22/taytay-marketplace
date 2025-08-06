export type ArchivedAdmin = {
  id: string;
  email: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  status: "Active" | "Inactive";
};

export const archivedAdminsData: ArchivedAdmin[] = [
  {
    id: "A001",
    email: "admin.john@example.com",
    firstName: "John",
    middleName: "C.",
    lastName: "Doe",
    status: "Active",
  },
  {
    id: "A002",
    email: "admin.jane@example.com",
    firstName: "Jane",
    middleName: "M.",
    lastName: "Smith",
    status: "Inactive",
  },
  {
    id: "A003",
    email: "admin.mike@example.com",
    firstName: "Mike",
    middleName: "",
    lastName: "Johnson",
    status: "Active",
  },
  {
    id: "A004",
    email: "admin.anna@example.com",
    firstName: "Anna",
    middleName: "B.",
    lastName: "Lee",
    status: "Inactive",
  },
  {
    id: "A005",
    email: "admin.anna@example.com",
    firstName: "Anna",
    middleName: "B.",
    lastName: "Lee",
    status: "Inactive",
  },
  {
    id: "A006",
    email: "admin.anna@example.com",
    firstName: "Anna",
    middleName: "B.",
    lastName: "Lee",
    status: "Inactive",
  },
  {
    id: "A007",
    email: "admin.anna@example.com",
    firstName: "Anna",
    middleName: "B.",
    lastName: "Lee",
    status: "Inactive",
  },
  {
    id: "A008",
    email: "admin.anna@example.com",
    firstName: "Anna",
    middleName: "B.",
    lastName: "Lee",
    status: "Inactive",
  },
  {
    id: "A009",
    email: "admin.anna@example.com",
    firstName: "Anna",
    middleName: "B.",
    lastName: "Lee",
    status: "Inactive",
  },
];

export const archivedProductTypesData = [
  { id: 1, label: "Electronics" },
  { id: 2, label: "Books" },
  { id: 3, label: "Furniture" },
  { id: 4, label: "Clothing" },
  { id: 5, label: "Groceries" },
  { id: 6, label: "Tools" },
  { id: 7, label: "Toys" },
  { id: 8, label: "Beauty" },
  { id: 9, label: "Footwear" },
  { id: 10, label: "Pet Supplies" },
  { id: 11, label: "Sports" },
];

export const archivedCategoryData = [
  { id: "CAT-001", label: "Electronics" },
  { id: "CAT-002", label: "Fashion" },
  { id: "CAT-003", label: "Home Appliances" },
  { id: "CAT-004", label: "Books" },
  { id: "CAT-005", label: "Toys" },
  { id: "CAT-006", label: "Groceries" },
  { id: "CAT-007", label: "Sports" },
  { id: "CAT-008", label: "Furniture" },
  { id: "CAT-009", label: "Office Supplies" },
  { id: "CAT-010", label: "Automotive" },
  { id: "CAT-011", label: "Pets" },
  { id: "CAT-012", label: "Beauty & Personal Care" },
];

export const archivedLinkTypeData = [
  {
    id: "LNK-001",
    img: "https://upload.wikimedia.org/wikipedia/en/thumb/a/a9/TikTok_logo.svg/2560px-TikTok_logo.svg.png",
    label: "Facebook",
  },
  {
    id: "LNK-002",
    img: "https://upload.wikimedia.org/wikipedia/en/thumb/a/a9/TikTok_logo.svg/2560px-TikTok_logo.svg.png",
    label: "Twitter",
  },
  {
    id: "LNK-003",
    img: "https://upload.wikimedia.org/wikipedia/en/thumb/a/a9/TikTok_logo.svg/2560px-TikTok_logo.svg.png",
    label: "Instagram",
  },
  {
    id: "LNK-004",
    img: "https://upload.wikimedia.org/wikipedia/en/thumb/a/a9/TikTok_logo.svg/2560px-TikTok_logo.svg.png",
    label: "LinkedIn",
  },
];
