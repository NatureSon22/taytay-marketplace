import { NavLink } from "react-router-dom";
import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils"; 

type Props = {
  label: string;
  href: string;
  icon: LucideIcon;
};

export default function SidebarItem({ label, href, icon: Icon }: Props) {
  return (
    <NavLink
      to={href}
      className={({ isActive }) =>
        cn(
          "flex items-center gap-5 px-4 !pl-4 py-4 text-[18px] text-gray-700 hover:bg-gray-100 transition",
          isActive && "bg-gray-100 text-100 font-semibold"
        )
      }
    >
      <Icon className="w-6 h-6" />
      <span>{label}</span>
    </NavLink>
  );
}
