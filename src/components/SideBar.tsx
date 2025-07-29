import navLabels from "@/data/navigation";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import { Link } from "react-router";
import { useState } from "react";

type SideBarProps = {
  openSideBar: boolean;
  handleOpenSideBar: () => void;
};

function SideBar({ openSideBar, handleOpenSideBar }: SideBarProps) {
  const [selectedPath, setSelectedPath] = useState("/home");

  const handleSelectedPath = (path: string) => () => {
    setSelectedPath(path);
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

        <div className="grid gap-9">
          {navLabels.map((el) => {
            return (
              <Link
                key={el.path}
                to={"/"}
                className={`font-semibold relative inline-block w-max pr-3 hover:text-100 ${
                  selectedPath === el.path ? "text-100" : ""
                }`}
                onClick={handleSelectedPath(el.path)}
              >
                <p>{el.label}</p>
                <div
                  className={
                    selectedPath === el.path
                      ? "absolute -bottom-2 left-1/2 transform w-full -translate-x-1/2  py-[3px] rounded-full bg-100"
                      : ""
                  }
                ></div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default SideBar;
