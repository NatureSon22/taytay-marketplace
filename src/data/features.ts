import { ShoppingBasket, Store, Search, Smartphone } from "lucide-react";
import type { ElementType } from "react";

type Feature = {
  icon: ElementType;
  label: string;
  info: string;
};

const features: Feature[] = [
  {
    icon: ShoppingBasket,
    label: "Product Browsing",
    info: "A catalog with categories, detailed product descriptions, and high-quality images.",
  },
  {
    icon: Store,
    label: "Store Directory",
    info: "A list of registered sellers or stores, each with a profile showcasing their offerings and contact information.",
  },
  {
    icon: Search,
    label: "Product Search",
    info: "Search functionality with filters for category, price, or keywords.",
  },
  {
    icon: Smartphone,
    label: "Contact Seller",
    info: "A feature allowing buyers to directly message sellers for inquiries or reservations.",
  },
];

export default features;
