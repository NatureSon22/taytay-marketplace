// components/GeneralInfoNavbar.tsx

import React from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

type Tab = {
  key: string;
  label: string;
};

type Props = {
  editorTabs: Tab[];
  activeTab: string;
  setActiveTab: (key: string) => void;
  selectedHowToGo: string;
  setSelectedHowToGo: (value: string) => void;
  howToGoOptions: string[];
};

function GeneralInfoNavbar({
  editorTabs,
  activeTab,
  setActiveTab,
  selectedHowToGo,
  setSelectedHowToGo,
  howToGoOptions,
}: Props) {
  return (
    <div className="flex flex-wrap justify-between items-center pr-6">
      <div className="flex flex-wrap">
        {editorTabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 rounded-t-md text-sm font-medium ${
              activeTab === tab.key
                ? "bg-100 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "route" && (
        <div className="mt-2 sm:mt-0">
          <Select value={selectedHowToGo} onValueChange={setSelectedHowToGo}>
            <SelectTrigger className="rounded-t-md rounded-b-none">
              <SelectValue placeholder="Select transportation" />
            </SelectTrigger>
            <SelectContent className="rounded-t-none rounded-b-md">
              {howToGoOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
}

export default GeneralInfoNavbar;
