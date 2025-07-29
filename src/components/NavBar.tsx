import NavLogo from "@/assets/nav-logo.png";
import SearchBar from "./SearchBar";
import { Link, useLocation } from "react-router";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import SideBar from "./SideBar";
import navLabels from "@/data/navigation";

function NavBar() {
  const location = useLocation();
  const [selectedPath, setSelectedPath] = useState(location.pathname ?? "/");
  const [openSideBar, setOpenSideBar] = useState(false);

  useEffect(() => {
    setSelectedPath(location.pathname);
    window.scrollTo({
      top: 0,
      left: 0,
    });
  }, [location.pathname]);

  const handleSelectedPath = (path: string) => () => {
    setSelectedPath(path);
  };

  const handleOpenSideBar = () => {
    setOpenSideBar((prev) => !prev);
  };

  return (
    <>
      <div className="flex items-center py-6 px-5 gap-5 md:px-24">
        <div className="flex items-center gap-5 flex-[1.5] md:gap-8">
          <img src={NavLogo} className="hidden sm:block" />
          <SearchBar />
        </div>

        <div className="flex-1 justify-between hidden sm:flex">
          {navLabels.map((el) => {
            return (
              <Link
                key={el.path}
                to={el.path}
                className={`font-semibold relative inline-block px-2 hover:text-100 ${
                  selectedPath === el.path ? "text-100" : ""
                }`}
                onClick={handleSelectedPath(el.path)}
              >
                <p>{el.label}</p>
                <div
                  className={
                    selectedPath === el.path
                      ? "absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-full py-[3px] rounded-full bg-100"
                      : ""
                  }
                ></div>
              </Link>
            );
          })}
        </div>

        <Button
          variant={"outline"}
          className="sm:hidden"
          onClick={handleOpenSideBar}
        >
          <Menu />
        </Button>
      </div>

      <SideBar
        openSideBar={openSideBar}
        handleOpenSideBar={handleOpenSideBar}
      />
    </>
  );
}

export default NavBar;
