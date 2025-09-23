import { NavLink, useLocation } from "react-router-dom";

const sidebarItems = [
  { label: "Admin", href: "/admin/settings/admin-setting" },
  { label: "Categories", href: "/admin/settings/category-setting" },
  { label: "Product Type", href: "/admin/settings/product-type-setting" },
  { label: "Link Type", href: "/admin/settings/link-type-setting" },
  { label: "General Information", href: "/admin/settings/general-information-setting" },
  { label: "Account Information", href: "/admin/settings/account-info-setting" },
  { label: "Archives", href: "/admin/settings/archive-setting" },
];

function SettingsSidebar() {
  const location = useLocation();

  return (
    <aside className="w-64 border-r border-gray-200 bg-white">
      {sidebarItems.map((item) => {
        const isAdminDefault =
          item.label === "Admin" &&
          (location.pathname === "/admin/settings" || location.pathname === item.href);

        return (
          <NavLink
            key={item.href}
            to={item.href}
            className={({ isActive }) =>
              `block px-4 py-4 ${
                isActive || isAdminDefault
                  ? "text-100 bg-gray-200 font-semibold"
                  : "hover:bg-gray-100"
              }`
            }
          >
            {item.label}
          </NavLink>
        );
      })}
    </aside>
  );
}

export default SettingsSidebar;