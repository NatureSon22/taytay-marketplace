import useAccountStore from "@/stores/useAccountStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import personIcon from "@/assets/person icon.avif";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { logout } from "@/api/auth";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";

function ProfileDropDownMenu() {
  const { resetAccount } = useAccountStore((state) => state);
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      resetAccount();
      navigate("/");
    },
    onError: () => {
      toast.error("Something went wrong. Please try again");
    },
  });

  const clickLogout = () => {
    mutate();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="size-11 border rounded-full cursor-pointer overflow-hidden transition-all duration-200 hover:scale-105 hover:ring-2 hover:ring-500">
          <img
            className="h-full w-full object-cover rounded-full"
            src={personIcon}
            alt="profile"
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[180px] shadow-xs border-gray-200">
        <DropdownMenuLabel className="text-center cursor-pointer">
          STORE
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="py-2 justify-center hover:bg-gray-100 cursor-pointer"
          onClick={() => navigate("/account/manage")}
        >
          Manage Account
        </DropdownMenuItem>

        <DropdownMenuItem
          className="py-2 justify-center hover:bg-gray-100 cursor-pointer"
          onClick={() => navigate("/account/store")}
        >
          Manage Store
        </DropdownMenuItem>

        <DropdownMenuItem
          className="py-2 font-semibold text-400 justify-center hover:bg-gray-100 cursor-pointer"
          onClick={clickLogout}
        >
          {isPending ? (
            <>
              <LoaderCircle className="animate-spin" />
              <p className="text-200">Logging out</p>
            </>
          ) : (
            <p>Logout</p>
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ProfileDropDownMenu;
