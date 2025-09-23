import { useQuery } from "@tanstack/react-query";
import SummaryCard from "@/components/SummaryCard";
import { IoMdTrendingUp } from "react-icons/io";
import { RiLoader2Fill } from "react-icons/ri";
import { Users } from "lucide-react";

const fetchUserSummary = async () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const res = await fetch(`${API_URL}/accounts`, { credentials: "include" });
  if (!res.ok) throw new Error("Failed to fetch user summary");
  const data = await res.json();
  return data.totals; // we only need totals for the summary
};

function UserSummary() {
  const { data: totals, isLoading, isError } = useQuery({
    queryKey: ["userSummary"],
    queryFn: fetchUserSummary,
  });

  if (isLoading) return <p>Loading summary...</p>;
  if (isError) return <p>Failed to load summary.</p>;

  return (
    <div className="border border-gray-200 bg-white shadow-sm rounded-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800">User Summary</h2>
      <div className="rounded-lg grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
        <SummaryCard
          title="Total Accounts"
          count={totals.totalAccounts}
          icon={<Users />}
          iconBg="bg-blue-100"
          iconColor="text-blue-600"
          textColor="text-blue-600"
        />
        <SummaryCard
          title="Verified Accounts"
          count={totals.totalVerified}
          icon={<RiLoader2Fill />}
          iconBg="bg-green-100"
          iconColor="text-green-600"
          textColor="text-green-600"
        />
        <SummaryCard
          title="Pending Accounts"
          count={totals.totalPending}
          icon={<IoMdTrendingUp />}
          iconBg="bg-yellow-100"
          iconColor="text-yellow-600"
          textColor="text-yellow-600"
        />
      </div>
    </div>
  );
}

export default UserSummary;
