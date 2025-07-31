import PageHeader from "@/components/PageHeader";
import UserSummary from "./UserSummary";
import UserGrowthChart from "./UserGrowthChart";
import UserActivityLog from "./UserActivityLog";

function DashboardPage() {
  return (
    <div>
      <PageHeader
        title="Dashboard"
        subtitle="Welcome to the e-Tiangge Portal Admin Dashboard!"
      />
      
      <div className="pt-6 space-y-6">
        <UserSummary />
        <UserGrowthChart />
        <UserActivityLog />
      </div>

    </div>
  );
}

export default DashboardPage;