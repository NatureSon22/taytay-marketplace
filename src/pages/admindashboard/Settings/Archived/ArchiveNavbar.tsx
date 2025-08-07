// components/ArchiveNavbar.tsx
import React from "react";

type ArchiveNavbarProps = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

const archiveTabs = ["Admin", "Product Type", "Categories", "Link Type"];

function ArchiveNavbar({ activeTab, setActiveTab }: ArchiveNavbarProps) {
  return (
    <div className="flex mb-4 flex-wrap items-center">
      {archiveTabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`px-4 py-2 rounded-t-md text-sm font-medium ${
            activeTab === tab
              ? "bg-100 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

export default ArchiveNavbar;
