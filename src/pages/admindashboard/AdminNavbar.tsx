import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaUser } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { ChevronDown } from "lucide-react";
import useAccountStore from "@/stores/useAccountState";
import { useNavigate } from "react-router-dom";
import { logout } from "@/api/auth";

function AdminNavbar() {
  const adminAccount = useAccountStore((state) => state.adminAccount);
  const resetAdminAccount = useAccountStore((state) => state.resetAdminAccount);
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await logout();
    } catch (err) {
      console.error("Logout failed", err);
    } finally {
      resetAdminAccount(); // 👈 clear only the admin state
      navigate("/login");
    }
  }

  return (
    <header className="w-full bg-white shadow-sm border-b px-6 py-4 flex justify-end z-10">
      <DropdownMenu>
        <DropdownMenuTrigger
          className="!outline-none !focus:outline-none"
          asChild
        >
          <button className="flex cursor-pointer gap-4 items-center hover:bg-transparent">
            <div className="flex flex-col text-left">
              <p className="text-[15px] font-roboto">
                {adminAccount?.firstName} {adminAccount?.lastName}
              </p>
              <p className="text-[13px] text-gray-600">
                {adminAccount?.role}
              </p>
            </div>
            <ChevronDown size={16} />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          className="w-48 py-2 rounded-md shadow-md"
        >
          <DropdownMenuItem
            onClick={() => navigate("/admin/settings/account-info-setting")}
            className="cursor-pointer w-full h-[40px] text-gray-700 group transition-colors"
          >
            <FaUser className="mr-2 h-4 w-4 text-gray-600 group-hover:text-black" />
            <span className="group-hover:text-black text-[15px]">
              Manage Profile
            </span>
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={handleLogout}
            className="cursor-pointer w-full h-[40px] text-red-600 bg-red-50 hover:bg-red-500 hover:text-white transition-colors"
          >
            <MdLogout className="mr-2 h-4 w-4" />
            <span>Logout Account</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}

export default AdminNavbar;
