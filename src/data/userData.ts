export type Seller = {
  id: string;
  email: string;
  fullName: string;
  storeName: string;
  status: "Pending" | "Verified";
  image: string; 
};


export type Administrator = {
  id: string;
  email: string;
  firstName: string;
  middleName: string;
  lastName: string;
  status: "Active" | "Inactive";
};

export const sellerData = [
  {
    id: "SELL001",
    image: "/images/dummy-doc.png",
    fullName: "Alice Santos",
    email: "alice.santos@example.com",
    storeName: "Santos Sari-Sari Store",
    status: "Pending",
  },
  {
    id: "SELL002",
    image: "/images/dummy-doc.png",
    fullName: "Ben Cruz",
    email: "ben.cruz@example.com",
    storeName: "Cruz General Goods",
    status: "Verified",
  },
  {
    id: "SELL003",
    image: "/images/dummy-doc.png",
    fullName: "Carla Dizon",
    email: "carla.dizon@example.com",
    storeName: "Dizon Groceries",
    status: "Pending",
  },
  {
    id: "SELL004",
    image: "/images/dummy-doc.png",
    fullName: "David Reyes",
    email: "david.reyes@example.com",
    storeName: "Reyes Retail Hub",
    status: "Pending",
  },
  {
    id: "SELL005",
    image: "/images/dummy-doc.png",
    fullName: "Ella Navarro",
    email: "ella.navarro@example.com",
    storeName: "Navarro Shop",
    status: "Verified",
  },
  {
    id: "SELL006",
    image: "/images/dummy-doc.png",
    fullName: "Francis Tan",
    email: "francis.tan@example.com",
    storeName: "Tan’s Mini Mart",
    status: "Verified",
  },
  {
    id: "SELL007",
    image: "/images/dummy-doc.png",
    fullName: "Grace Lim",
    email: "grace.lim@example.com",
    storeName: "Lim Convenience",
    status: "Pending",
  },
  {
    id: "SELL008",
    image: "/images/dummy-doc.png",
    fullName: "Henry Ong",
    email: "henry.ong@example.com",
    storeName: "Ong Hardware",
    status: "Verified",
  },
  {
    id: "SELL009",
    image: "/images/dummy-doc.png",
    fullName: "Ivy Mendoza",
    email: "ivy.mendoza@example.com",
    storeName: "Mendoza Online Shop",
    status: "Pending",
  },
  {
    id: "SELL010",
    image: "/images/dummy-doc.png",
    fullName: "Jake Rivera",
    email: "jake.rivera@example.com",
    storeName: "Rivera Fresh Goods",
    status: "Pending",
  },
  {
    id: "SELL011",
    image: "/images/dummy-doc.png",
    fullName: "Kyla Delos Reyes",
    email: "kyla.delosreyes@example.com",
    storeName: "Kyla's Corner",
    status: "Verified",
  },
  {
    id: "SELL012",
    image: "/images/dummy-doc.png",
    fullName: "Leo Garcia",
    email: "leo.garcia@example.com",
    storeName: "Garcia Storefront",
    status: "Verified",
  },
  {
    id: "SELL013",
    image: "/images/dummy-doc.png",
    fullName: "Mina Chua",
    email: "mina.chua@example.com",
    storeName: "Chua Essentials",
    status: "Pending",
  },
  {
    id: "SELL014",
    image: "/images/dummy-doc.png",
    fullName: "Noel Fernandez",
    email: "noel.fernandez@example.com",
    storeName: "Fernandez Supplies",
    status: "Verified",
  },
  {
    id: "SELL015",
    image: "/images/dummy-doc.png",
    fullName: "Olivia Torres",
    email: "olivia.torres@example.com",
    storeName: "Torres Trade Hub",
    status: "Pending",
  },
];

export const adminData: Administrator[] = [
  {
    id: "ADM001",
    email: "alex.torres@example.com",
    firstName: "Alex",
    middleName: "Gomez",
    lastName: "Torres",
    status: "Active",
  },
  {
    id: "ADM002",
    email: "bella.martin@example.com",
    firstName: "Bella",
    middleName: "Grace",
    lastName: "Martin",
    status: "Inactive",
  },
  {
    id: "ADM003",
    email: "carlos.diaz@example.com",
    firstName: "Carlos",
    middleName: "Ramon",
    lastName: "Diaz",
    status: "Active",
  },
  {
    id: "ADM004",
    email: "diana.lee@example.com",
    firstName: "Diana",
    middleName: "Marie",
    lastName: "Lee",
    status: "Inactive",
  },
  {
    id: "ADM005",
    email: "ethan.nguyen@example.com",
    firstName: "Ethan",
    middleName: "Minh",
    lastName: "Nguyen",
    status: "Active",
  },
  {
    id: "ADM006",
    email: "fiona.kim@example.com",
    firstName: "Fiona",
    middleName: "Eun",
    lastName: "Kim",
    status: "Inactive",
  },
  {
    id: "ADM007",
    email: "george.brown@example.com",
    firstName: "George",
    middleName: "Allen",
    lastName: "Brown",
    status: "Active",
  },
  {
    id: "ADM008",
    email: "hannah.smith@example.com",
    firstName: "Hannah",
    middleName: "Louise",
    lastName: "Smith",
    status: "Inactive",
  },
  {
    id: "ADM009",
    email: "ian.jones@example.com",
    firstName: "Ian",
    middleName: "Michael",
    lastName: "Jones",
    status: "Active",
  },
  {
    id: "ADM010",
    email: "julia.chan@example.com",
    firstName: "Julia",
    middleName: "Mei",
    lastName: "Chan",
    status: "Inactive",
  },
  {
    id: "ADM011",
    email: "kevin.williams@example.com",
    firstName: "Kevin",
    middleName: "Lee",
    lastName: "Williams",
    status: "Active",
  },
  {
    id: "ADM012",
    email: "lisa.moore@example.com",
    firstName: "Lisa",
    middleName: "Ann",
    lastName: "Moore",
    status: "Inactive",
  },
];

export const dummyData = [
  { month: "January", users: 40 },
  { month: "February", users: 80 },
  { month: "March", users: 120 },
  { month: "April", users: 150 },
  { month: "May", users: 200 },
  { month: "June", users: 250 },
  { month: "July", users: 300 },
  { month: "August", users: 0 },
  { month: "September", users: 0 },
  { month: "October", users: 0 },
  { month: "November", users: 0 },
  { month: "December", users: 0 },
];

export const dummyLogs = [
  { id: 1, user: "Juan Dela Cruz", action: "Updated profile", date: "2025-07-30 10:45 AM", day: "Wednesday" },
  { id: 2, user: "Maria Santos", action: "Added new product", date: "2025-07-29 2:15 PM", day: "Tuesday" },
  { id: 3, user: "Pedro Reyes", action: "Deleted account", date: "2025-07-28 11:10 AM", day: "Monday" },
  { id: 4, user: "Anne Lopez", action: "Changed password", date: "2025-07-28 9:45 AM", day: "Monday" },
  { id: 5, user: "Karl Moreno", action: "Logged in", date: "2025-07-27 5:20 PM", day: "Sunday" },
  { id: 6, user: "Luisa Lim", action: "Reset password", date: "2025-07-26 3:10 PM", day: "Saturday" },
  { id: 7, user: "Enrico Tan", action: "Updated email", date: "2025-07-25 1:30 PM", day: "Friday" },
  { id: 8, user: "Juan Dela Cruz", action: "Updated profile", date: "2025-07-30 10:45 AM", day: "Wednesday" },
  { id: 9, user: "Maria Santos", action: "Added new product", date: "2025-07-29 2:15 PM", day: "Tuesday" },
  { id: 10, user: "Pedro Reyes", action: "Deleted account", date: "2025-07-28 11:10 AM", day: "Monday" },
  { id: 11, user: "Anne Lopez", action: "Changed password", date: "2025-07-28 9:45 AM", day: "Monday" },
  { id: 12, user: "Karl Moreno", action: "Logged in", date: "2025-07-27 5:20 PM", day: "Sunday" },
  { id: 13, user: "Luisa Lim", action: "Reset password", date: "2025-07-26 3:10 PM", day: "Saturday" },
  { id: 14, user: "Enrico Tan", action: "Updated email", date: "2025-07-25 1:30 PM", day: "Friday" },
  { id: 15, user: "Juan Dela Cruz", action: "Updated profile", date: "2025-07-30 10:45 AM", day: "Wednesday" },
  { id: 16, user: "Maria Santos", action: "Added new product", date: "2025-07-29 2:15 PM", day: "Tuesday" },
  { id: 17, user: "Pedro Reyes", action: "Deleted account", date: "2025-07-28 11:10 AM", day: "Monday" },
  { id: 18, user: "Anne Lopez", action: "Changed password", date: "2025-07-28 9:45 AM", day: "Monday" },
  { id: 19, user: "Karl Moreno", action: "Logged in", date: "2025-07-27 5:20 PM", day: "Sunday" },
  { id: 20, user: "Luisa Lim", action: "Reset password", date: "2025-07-26 3:10 PM", day: "Saturday" },
  { id: 21, user: "Enrico Tan", action: "Updated email", date: "2025-07-25 1:30 PM", day: "Friday" },
];