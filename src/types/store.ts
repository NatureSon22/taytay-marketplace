type Accounts = {
  logo: string;
  url: string;
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
  stallNumbers: string[];
  linkedAccounts?: Accounts[];
  paymentMode?: Payment[];
};
