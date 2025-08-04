import SummaryCard from "@/components/SummaryCard";
import { IoMdTrendingUp } from "react-icons/io";
import { RiLoader2Fill } from "react-icons/ri";
import { Users } from "lucide-react";

function UserSummary() {    
  return (
    <div className="border border-gray-200 bg-white shadow-sm rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800">User Summary</h2>
      <div className="rounded-lg grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
       <SummaryCard
        title="Total Accounts"
        count={150}
        icon={<Users />}
        iconBg="bg-blue-100"
        iconColor="text-blue-600"
        textColor="text-blue-600"
        />

        <SummaryCard
        title="Active Accounts"
        count={100}
        icon={<RiLoader2Fill />}
        iconBg="bg-green-100"
        iconColor="text-green-600"
        textColor="text-green-600"
        />

        <SummaryCard
        title="Pending Accounts"
        count={50}
        icon={<IoMdTrendingUp />}
        iconBg="bg-yellow-100"
        iconColor="text-yellow-600"
        textColor="text-yellow-600"
        />
        </div>
      </div>
  )
   }

export default UserSummary;
