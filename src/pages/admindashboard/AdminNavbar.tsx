import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaUser } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

function AdminNavbar() {
  return (
    <header className="w-full bg-white shadow-sm border-b px-6 py-4 flex justify-end z-10">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" 
           className="flex cursor-pointer border-none gap-4 hover:bg-transparent hover:text-inherit">
            <div className="flex flex-col  text-left gap-1  ">
            <p className="text-[15px] font-roboto">Kenneth San Pedro</p>
            <p className="text-[13px] text-gray-600">Administrator</p>
            </div>
            <ChevronDown size={16} />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-48 flex items-center flex-col">
          <DropdownMenuItem
            onClick={() => {
            }}
            className="cursor-pointer hover:bg-gray-100 w-full h-[40px] text-gray-800 group transition-colors"
            >
            <FaUser className="mr-2 text-[50px] text-gray-600 group-hover:text-black" />
            <span className="group-hover:text-black text-[15px]">Manage Profile</span>
            </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
            }}
            className="cursor-pointer bg-red-100 w-full h-[40px] hover:bg-red-500 focus:bg-red-500 text-red-600 group transition-colors"
            >
            <MdLogout className="mr-2 h-4 w-4 text-red-500 group-hover:text-white" />
            <span className="group-hover:text-white">Logout Account</span>
           </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}

export default AdminNavbar;