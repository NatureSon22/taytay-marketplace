import { useState, useEffect } from "react";
import RichTextEditor from "./RichTextEditor";
import GeneralInfoNavbar from "./GeneralInfoNavbar";
import { howToGoOptions, editorTabs } from "@/data/generalInformationData";
import { useGeneralInformation } from "@/hooks/useGeneralInformation";
import type { IGeneralInformation } from "@/types/generalInformation";
import { Button } from "@/components/ui/button";

function GeneralInformationSetting() {
  const { data, isLoading, isError, saveInfo, isSaving } = useGeneralInformation();

  const [selectedHowToGo, setSelectedHowToGo] = useState("UV Express");
  const [activeTab, setActiveTab] = useState("terms");
  const [formData, setFormData] = useState<IGeneralInformation | null>(null);

  useEffect(() => {
    if (data) setFormData(data);
  }, [data]);

  const howToGoKeyMap: Record<string, keyof IGeneralInformation> = {
    "UV Express": "uvexpress",
    "Jeepney": "jeepney",
    "MRT": "mrt",
    "UV + Bus": "uvandbus",
    "Ride Hailing Apps": "ridehailingapps"
  };

  const handleEditorChange = (newValue: string) => {
    if (!formData) return;

    const updated = { ...formData };

    switch (activeTab) {
      case "terms":
        updated.termsandcondition = newValue;
        break;
      case "privacy":
        updated.privacypolicy = newValue;
        break;
      case "about":
        updated.about = newValue;
        break;
      case "contact":
        updated.contactinfo = newValue;
        break;
      case "route":
        const key = howToGoKeyMap[selectedHowToGo];
        if (key) updated[key] = newValue;
        break;
    }

    setFormData(updated);
  };

  const getEditorValue = () => {
    if (!formData) return "";

    switch (activeTab) {
      case "terms":
        return formData.termsandcondition;
      case "privacy":
        return formData.privacypolicy;
      case "about":
        return formData.about;
      case "contact":
        return formData.contactinfo;
      case "route":
        const key = howToGoKeyMap[selectedHowToGo];
        return key ? formData[key] : "";
      default:
        return "";
    }
  };

  const handleSave = () => {
    if (formData) {
      saveInfo(formData);
    }
  };

  if (isLoading) return <p>Loading general information...</p>;
  if (isError) return <p>Error loading general information.</p>;

  return (
    <div>
      <h3 className="text-lg font-medium text-100 mb-4">General Information</h3>

      <GeneralInfoNavbar
        editorTabs={editorTabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedHowToGo={selectedHowToGo}
        setSelectedHowToGo={setSelectedHowToGo}
        howToGoOptions={howToGoOptions}
      />

      <div className="pr-6">
        <RichTextEditor
          key={activeTab === "route" ? selectedHowToGo : activeTab}
          label={
            activeTab === "route"
              ? selectedHowToGo
              : editorTabs.find((tab) => tab.key === activeTab)?.label || ""
          }
          value={getEditorValue()}
          onChange={handleEditorChange}
        />
      </div>
      <div className="flex justify-end pr-6">
        <Button
          onClick={handleSave}
          disabled={isSaving}
          className="bg-100 cursor-pointer text-md hover:bg-100 text-white"
        >
          Save Changes
        </Button>
      </div>
      
    </div>
  );
}

export default GeneralInformationSetting;
