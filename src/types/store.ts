export type Category = {
  _id?: string;
  label: string;
  isDeleted?: boolean;
};

export type Accounts = {
  logo?: string;
  url: string;
  platform: string;
  isDeleted?: boolean;
  platformName?: string;
};

type Payment = {
  logo: string;
};

export type Store = {
  _id: string;
  profilePicture?: string;
  description: string;
  storeName: string;
  joinedDate: string;
  contactNumber: string;
  email: string;
  categories: Category[];
  stallNumbers: string[];
  linkedAccounts?: Accounts[];
  paymentMode?: Payment[];
};
