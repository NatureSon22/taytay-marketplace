export interface Admin {
  id: string;
  email: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  password: string;
  status: "Active" | "Inactive";
  role: "Admin" | "Super Admin";
}