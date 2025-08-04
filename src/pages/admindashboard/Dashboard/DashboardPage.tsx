import UserSummary from "./UserSummary";
import UserGrowthChart from "./UserGrowthChart";
import UserActivityLog from "./UserActivityLog";

function DashboardPage() {
  return (
    <div>
      <div>
        <div className="py-5">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-gray-600">Welcome to the e-Tiangge Portal Admin Dashboard!</p>
        </div>
        <hr />
      </div>
      
      <div className="pt-6 space-y-6">
        <UserSummary />
        <UserGrowthChart />
        <UserActivityLog />
      </div>

    </div>
  );
}

export default DashboardPage;