import { useState } from "react";
import LinkTypeSettingForm from "./LinkTypeFormSetting";
import LinkTypeTable from "./LinkTypeTable";
import { linkTypeData } from "@/data/linkTypeData";
import type { LinkType } from "@/data/linkTypeData";

function LinkTypeSetting() {
  const [links, setLink] = useState<LinkType[]>(linkTypeData);

  const handleArchive = (id: string) => {
    setLink((prev) => prev.filter((link) => link.id !== id));
  };

  return (
    <div className="flex flex-col gap-6 pr-6">
      <LinkTypeSettingForm />
      <LinkTypeTable links={links} onArchive={handleArchive} />
    </div>
  );
}

export default LinkTypeSetting;