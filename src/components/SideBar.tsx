import navLabels from "@/data/navigation";
import { Button } from "./ui/button";
import { LoaderCircle, Menu } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useState } from "react";
import useAccountStore from "@/stores/useAccountState";
import { useMutation } from "@tanstack/react-query";
import useStoreState from "@/stores/useStoreState";
import { toast } from "sonner";
import { logout } from "@/api/auth";

type SideBarProps = {
  openSideBar: boolean;
  handleOpenSideBar: () => void;
};

function SideBar({ openSideBar, handleOpenSideBar }: SideBarProps) {
  const [selectedPath, setSelectedPath] = useState("/home");
  const { sellerAccount, resetSellerAccount } = useAccountStore();
  const { resetStore } = useStoreState();
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      resetSellerAccount();
      resetStore();
      navigate("/");
    },
    onError: () => {
      toast.error("Something went wrong. Please try again");
    },
    onSettled: () => {
      handleOpenSideBar();
    },
  });

  const clickLogout = () => {
    mutate();
  };

  return (
    <div
      className={`fixed z-20 h-screen w-screen bg-slate-950/70 transition-opacity duration-300 ${
        openSideBar
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none hidden"
      }`}
      onClick={handleOpenSideBar}
    >
      <div
        className={`absolute w-[60%] max-w-[300px] sm:hidden h-screen bg-white right-0 py-14 flex flex-col gap-8 px-10 transform transition-transform duration-300 ease-in-out ${
          openSideBar ? "translate-x-0" : ""
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <Button
          variant={"outline"}
          className="ml-auto"
          onClick={handleOpenSideBar}
        >
          <Menu />
        </Button>

        <div className="grid gap-6">
          {navLabels.map((el) => (
            <Link
              key={el.path}
              to={el.path}
              className={`font-semibold relative inline-block w-max pr-3 hover:text-100 ${
                selectedPath === el.path ? "text-100" : ""
              }`}
              onClick={() => {
                setSelectedPath(el.path);
                handleOpenSideBar();
              }}
            >
              <p>{el.label}</p>
              {selectedPath === el.path && (
                <div className="absolute -bottom-2 left-1/2 transform w-full -translate-x-1/2 py-[3px] rounded-full bg-100"></div>
              )}
            </Link>
          ))}

          {sellerAccount && (
            <>
              <Link
                to="/account/manage"
                className="font-semibold relative inline-block w-max pr-3 hover:text-100"
                onClick={handleOpenSideBar}
              >
                Manage Account
              </Link>

              <Link
                to="/account/store"
                className="font-semibold relative inline-block w-max pr-3 hover:text-100"
                onClick={handleOpenSideBar}
              >
                Manage Store
              </Link>

              {/* ✅ Only the logout stays as a button */}
              <Button
                onClick={clickLogout}
                variant="destructive"
                className="mt-4 py-6"
              >
                {isPending ? (
                  <div className="flex items-center justify-center gap-2">
                    <LoaderCircle className="animate-spin" />
                    <p className="text-gray-400">Logging out...</p>
                  </div>
                ) : (
                  "Logout"
                )}
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default SideBar;
