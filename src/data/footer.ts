type FooterNavLink = {
  label: string;
  path: string;
  id?: string;
};

type FooterNavSection = {
  title: string;
  items: FooterNavLink[];
};

const footerNav: FooterNavSection[] = [
  {
    title: "Information",
    items: [
      {
        label: "About Us",
        path: "/about",
      },
      {
        label: "Terms & Conditions",
        path: "/terms-and-conditions",
      },
      {
        label: "Privacy Policy",
        path: "/privacy-policy",
      },
    ],
  },
  {
    title: "Categories",
    items: [
      {
        label: "Men's Fashion",
        path: "/products",
        id: "68c408bf6849a6ad67baa1c9",
      },
      {
        label: "Women's Fashion",
        path: "/products",
        id: "68c409096849a6ad67baa1d1",
      },
      {
        label: "Kid's",
        path: "/products",
        id: "68c409436849a6ad67baa1e8",
      },
    ],
  },
  {
    title: "Help & Support",
    items: [
      {
        label: "Contact Us",
        path: "/contact-us",
      },
    ],
  },
];

export default footerNav;
