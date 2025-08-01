import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import ReportSelector from "@/components/ReportSelector";
import SearchBar from "./SearchBar";
import UserGrowthTable from "./UserGrowthTable";
import SellerTable from "./SellerTable";
import AdminTable from "./AdminTable";
import ActivityLogTable from "./ActivityLogTable";

function ReportsPage() {
  const [selectedReport, setSelectedReport] = useState("Seller");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div>
      <PageHeader
        title="Reports"
        subtitle="Generate and view activity or sales reports."
      />

      <div className="space-y-10 bg-white border rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between !mb-[20px]">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        <ReportSelector
          selectedReport={selectedReport}
          onChange={(report) => {
            setSelectedReport(report);
            setSearchQuery("");
          }}
        />
        </div>

        {selectedReport === "Seller" && <SellerTable searchQuery={searchQuery} />}
        {selectedReport === "Admin" && <AdminTable searchQuery={searchQuery} />}
        {selectedReport === "User Growth" && <UserGrowthTable searchQuery={searchQuery} />}
        {selectedReport === "Activity Log" && <ActivityLogTable searchQuery={searchQuery} />}
      </div>

  </div>
  );
}

export default ReportsPage;
