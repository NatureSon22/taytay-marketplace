import React, { useState } from "react";
import RichTextEditor from "./RichTextEditor";
import GeneralInfoNavbar from "./GeneralInfoNavbar";
import {
  defaultTerms,
  defaultPrivacy,
  defaultAbout,
  defaultContact,
  defaultHowToGoList,
  howToGoOptions,
  editorTabs,
} from "@/data/generalInformationData";

function GeneralInformationSetting() {
  const [selectedHowToGo, setSelectedHowToGo] = useState("UV Express");
  const [activeTab, setActiveTab] = useState("terms");

  const [terms, setTerms] = useState(defaultTerms);
  const [privacy, setPrivacy] = useState(defaultPrivacy);
  const [about, setAbout] = useState(defaultAbout);
  const [contact, setContact] = useState(defaultContact);
  const [howToGoList, setHowToGoList] = useState(defaultHowToGoList);

  const getHowToGoIndex = (label: string) => howToGoOptions.indexOf(label);

  const handleEditorChange = (newValue: string) => {
    switch (activeTab) {
      case "terms":
        setTerms(newValue);
        break;
      case "privacy":
        setPrivacy(newValue);
        break;
      case "about":
        setAbout(newValue);
        break;
      case "contact":
        setContact(newValue);
        break;
      case "route":
        const idx = getHowToGoIndex(selectedHowToGo);
        if (idx !== -1) {
          const updated = [...howToGoList];
          updated[idx] = newValue;
          setHowToGoList(updated);
        }
        break;
    }
  };

  const getEditorValue = () => {
    switch (activeTab) {
      case "terms":
        return terms;
      case "privacy":
        return privacy;
      case "about":
        return about;
      case "contact":
        return contact;
      case "route":
        const idx = getHowToGoIndex(selectedHowToGo);
        return idx !== -1 ? howToGoList[idx] : "";
      default:
        return "";
    }
  };

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
    </div>
  );
}

export default GeneralInformationSetting;
