import type { Store } from "@/types";
import profile from "@/assets/storeImg.png";
import lazada from "@/assets/Lazada-Logo.png";
import shopee from "@/assets/Shopee-Logo.png";
import paymaya from "@/assets/PayMaya_Logo.png";
import gcash from "@/assets/GCash-Logo.png";

const storedetail: Store = {
  id: "sample-id001",
  profilePicture: profile,
  description:
    "STYL E.BOSS offers a curated selection of trendy, high-quality clothing and accessories designed to let you stand out. From everyday essentials to statement pieces, we’ve got everything you need to express your unique style without breaking the bank. As a proud member of the Taytay Tiangge community, we specialize in Ready-to-Wear (RTW) garments, sourced and crafted with care, ensuring that every piece reflects Taytay’s renowned quality and affordability. Whether you’re dressing for work, a casual day out, or a special occasion, STYL E.BOSS has you covered.",
  storeName: "styl e. boss",
  joinedDate: "November 19, 2014",
  contactNo: "+63 1234 567",
  email: "styl.boss@gmail.com",
  stallNumbers: ["127", "128"],
  linkedAccounts: [
    { logo: lazada, url: "" },
    { logo: shopee, url: "" },
  ],
  paymentMode: [{ logo: paymaya }, { logo: gcash }],
};

export default storedetail;
