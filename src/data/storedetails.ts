import type { Store } from "@/types";
import profile from "@/assets/storeImg.png";
import lazada from "@/assets/Lazada-Logo.png";
import shopee from "@/assets/Shopee-Logo.png";
import paymaya from "@/assets/PayMaya_Logo.png";
import gcash from "@/assets/GCash-Logo.png";

const storedetail: Partial<Store> = {
  _id: "store-0001",
  profilePicture: profile,
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Suspendisse potenti. Sed vel magna sit amet ante facilisis tincidunt.",
  storeName: "Store Name",
  joinedDate: "January 1, 2000",
  contactNumber: "000-000-0000",
  email: "store@email.com",
  stallNumbers: ["000", "001"],
  linkedAccounts: [
    {
      logo: lazada,
      url: "",
      platform: "",
    },
    {
      logo: shopee,
      url: "",
      platform: "",
    },
  ],
  paymentMode: [{ logo: paymaya }, { logo: gcash }],
};

export default storedetail;
