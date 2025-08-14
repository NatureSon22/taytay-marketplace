import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import ReportSelector from "@/components/ReportSelector";
import SearchBar from "./SearchBar";
import GenerateReportButton from "./GenerateReportButton";
import UserGrowthTable from "./UserGrowthTable";
import SellerTable from "./SellerTable";
import AdminTable from "./AdminTable";
import ActivityLogTable from "./ActivityLogTable";
import { sellerData, dummyData, dummyLogs } from "@/data/userData";
import { useReports } from "@/hooks/useReports";

function ReportsPage() {
  const [selectedReport, setSelectedReport] = useState("Seller");
  const [searchQuery, setSearchQuery] = useState("");
  const { data: admins = [] } = useReports(); 

  return (
    <div>
      <PageHeader
        title="Reports"
        subtitle="Generate and view activity or sales reports."
      />

      <div className="space-y-10 bg-white border rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          {selectedReport !== "User Growth" && (
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder={`Search ${selectedReport}...`}
            />
          )}

          <ReportSelector
            selectedReport={selectedReport}
            onChange={(report) => {
              setSelectedReport(report);
              setSearchQuery("");
            }}
          />

          <GenerateReportButton
            reportTitle={selectedReport}
            data={
              selectedReport === "Seller"
                ? sellerData.filter((s) =>
                    s.fullName.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                : selectedReport === "Admin"
                ? admins.filter((a) =>
                    `${a.firstName} ${a.lastName}`
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase())
                  )
                : selectedReport === "Activity Log"
                ? dummyLogs.filter((log) =>
                    log.user.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                : selectedReport === "User Growth"
                ? dummyData.filter((dummy) =>
                    dummy.month.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                : []
            }
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
