import accountTabs from "@/data/accounttabs";
import CenterLayout from "@/layouts/CenterLayout";
import PageLayout from "@/layouts/PageLayout";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Link, Outlet } from "react-router";

function AccountWrapper() {
  const [selectedTab, setSelectedTab] = useState(accountTabs[0].path);

  const handleSelectTab = (path: string) => {
    setSelectedTab(path);
  };

  return (
    <PageLayout>
      <CenterLayout>
        <div className="w-[90%] flex flex-col gap-8 lg:flex-row lg:gap-20">
          <div className="w-full max-w-[400px] h-full lg:border-r-2 lg:max-w-[260px]">
            <div className="h-min flex items-center lg:flex-col lg:items-stretch">
              {accountTabs.map((tab) => {
                return (
                  <Link
                    key={tab.label}
                    className={cn(
                      "py-3 flex-1 text-center",
                      selectedTab === tab.path
                        ? "bg-slate-200"
                        : "hover:bg-slate-100"
                    )}
                    to={tab.path}
                    onClick={() => handleSelectTab(tab.path)}
                  >
                    {tab.label}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="flex-1 flex">
            <Outlet />
          </div>
        </div>
      </CenterLayout>
    </PageLayout>
  );
}

export default AccountWrapper;
