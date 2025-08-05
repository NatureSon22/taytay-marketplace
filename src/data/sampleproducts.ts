import product1 from "@/assets/Frame 32 (1).png";
import product2 from "@/assets/Frame 32 (2).png";
import product3 from "@/assets/Frame 32 (3).png";
import product4 from "@/assets/Frame 32 (5).png";
import type { Product } from "@/types";

const sampleProducts: Product[] = [
  {
    id: 1,
    productName: "T-shirt with Tape Details",
    productPrice: "120",
    productPictures: [product1],
  },
  {
    id: 2,
    productName: "Skinny Fit Jeans",
    productPrice: "560",
    productPictures: [product2],
  },
  {
    id: 3,
    productName: "Checkered Shirt",
    productPrice: "250",
    productPictures: [product3],
  },
  {
    id: 4,
    productName: "Sleeve Stripped Shirt",
    productPrice: "180",
    productPictures: [product4],
  },
  {
    id: 5,
    productName: "Sleeve Stripped Shirt",
    productPrice: "180",
    productPictures: [product4],
  },
];

export default sampleProducts;
