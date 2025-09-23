import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const fetchUserGrowth = async () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const res = await fetch(`${API_URL}/accounts/growth`, {credentials: "include", method: "GET"});
  if (!res.ok) throw new Error("Failed to fetch user growth");
  const data = await res.json();

  const formatted = data.data.map((d: { month: string; users: number }) => {
    const [year, month] = d.month.split("-").map(Number);
    const date = new Date(year, month - 1);
    const formattedMonth = new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" }).format(date);
    return {
      month: formattedMonth,
      users: d.users,
    };
  });

  return formatted;
};

function UserGrowthChart() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["userGrowth"],
    queryFn: fetchUserGrowth,
  });
  const [selectedMonth, setSelectedMonth] = useState("All");

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Failed to load data.</p>;

  const months = ["All", ...data.map((d: { month: any; }) => d.month)];

  const filteredData =
    selectedMonth === "All"
      ? data
      : data.filter((d: { month: string; }) => d.month === selectedMonth);

  return (
    <div className="bg-white border rounded-xl p-6 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">User Growth</h2>

        <Select value={selectedMonth} onValueChange={setSelectedMonth}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Select month" />
          </SelectTrigger>
          <SelectContent className="max-h-40 overflow-y-auto">
            {months.map((month) => (
              <SelectItem key={month} value={month}>
                {month}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={filteredData}>
          <XAxis dataKey="month" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Line type="monotone" dataKey="users" stroke="#3b82f6" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default UserGrowthChart;
