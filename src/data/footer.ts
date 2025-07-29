type FooterNavLink = {
  label: string;
  path: string;
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
        path: "/men-fashion",
      },
      {
        label: "Women's Fashion",
        path: "/women-fashion",
      },
      {
        label: "Kid's",
        path: "/kids-fashion",
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
