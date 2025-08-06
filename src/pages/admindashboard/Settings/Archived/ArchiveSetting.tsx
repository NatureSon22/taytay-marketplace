import { useState } from "react";
import ArchiveNavbar from "./ArchiveNavbar";
import ArchivedAdminTable from "./ArchivedAdminTable";
import ArchivedProductTypeTable from "./ArchivedProductTypeTable";
import ArchivedCategoriesTable from "./ArchivedCategoriesTable";
import ArchivedLinkTypeTable from "./ArchivedLinkTypeTable";

function ArchiveSetting() {
  const [activeTab, setActiveTab] = useState("Admin");

  return (
    <div>
      <h3 className="text-lg font-medium text-100 mb-4">Archive Setting</h3>
      <ArchiveNavbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="pr-6">
        {activeTab === "Admin" && <ArchivedAdminTable />}
        {activeTab === "Product Type" && <ArchivedProductTypeTable />}
        {activeTab === "Categories" &&  <ArchivedCategoriesTable />}
        {activeTab === "Link Type" && <ArchivedLinkTypeTable />}
      </div>
    </div>
  );
}

export default ArchiveSetting;
