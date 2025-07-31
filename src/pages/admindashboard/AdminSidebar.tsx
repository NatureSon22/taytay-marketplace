import {
  LayoutDashboard,
  Users,
  FileBarChart,
  Settings,
} from "lucide-react";
import SidebarItem from "./SidebarItem";
import heroLogo from "@/assets/hero-logo.png";

const menu = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/admin/dashboard" },
  { label: "Users", icon: Users, href: "/admin/users" },
  { label: "Reports", icon: FileBarChart, href: "/admin/reports" },
  { label: "Settings", icon: Settings, href: "/admin/settings" },
];

function AdminSidebar() {
  return (
    <aside className="w-74 h-screen bg-white border-r shadow-sm flex flex-col">
      <div className="px-6 py-4 text-xl font-bold flex align-center justify-center pt-6 pb-[80px]">
            <img src={heroLogo} alt="Hero Logo" className="h-[80px] w-auto" />
      </div>
      <nav className="flex-1">
        {menu.map((item) => (
          <SidebarItem
            key={item.label}
            label={item.label}
            icon={item.icon}
            href={item.href}
          />
        ))}
      </nav>
    </aside>
  );
}

export default AdminSidebar