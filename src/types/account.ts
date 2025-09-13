export type UserProfile = {
  _id?: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  birthday: string;
  age: string;
  contactNumber: string;
  address: string;
};

export type UserCredentials = {
  username: string;
  email: string;
  password?: string;
};

export type UserAccount = UserProfile & UserCredentials;

export type UserAccountMetadata = {
  status: string;
  isVerified: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
};

export type FullUserAccount = UserAccount & UserAccountMetadata & {
  userType: "account" | "admin";
};
