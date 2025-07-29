import category1 from "@/assets/category1.png";
import category2 from "@/assets/category2.png";
import category3 from "@/assets/category3.png";
import category4 from "@/assets/category4.png";
import category5 from "@/assets/category5.png";
import category6 from "@/assets/category6.png";

type Category = {
  img: string;
  label: string;
}

const categories: Category[] = [
  {
    img: category1,
    label: "Footwear",
  },
  {
    img: category2,
    label: "Kid's",
  },
  {
    img: category3,
    label: "Women's Fashion",
  },
  {
    img: category4,
    label: "Fabrics",
  },
  {
    img: category5,
    label: "Accessories",
  },
  {
    img: category6,
    label: "Men's Fashion",
  },
];

export default categories;
