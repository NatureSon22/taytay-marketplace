import PageHeader from "@/components/PageHeader";
import Sidebar from "./SettingsSidebar";
import { Outlet } from "react-router-dom";

function SettingsPage() {
  return (
    <div className="flex-1 pb-6">
      <PageHeader 
        title="Settings"
        subtitle="Configure system preferences and admin options."
      />
      <div className="flex gap-6 border border-gray-200 bg-white shadow-sm rounded-md">
        <Sidebar />
        <div className="flex-1 py-6 min-h-[720px] max-h-[720px] overflow-y-auto ">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;
