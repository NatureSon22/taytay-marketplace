export type AccountCredentials = {
  username: string;
  email: string;
  password: string;
};

export type UserProfile = {
  firstName: string;
  middleName?: string;
  lastName: string;
  birthday: Date;
  age: number;
  contactNumber: string;
  province: string;
  municipality: string;
  barangay: string;
};

export type StoreDetails = {
  stallNumbers: string[];
  permit?: File;
  storeName: string;
};

export type RegistrationData = AccountCredentials & UserProfile & StoreDetails;
