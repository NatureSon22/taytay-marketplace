import { useState } from "react";
import { dummyData } from "@/data/userData"; // Assuming you have a data file for dummy data
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
} from "@/components/ui/select"

function UserGrowthChart() {
  const [selectedMonth, setSelectedMonth] = useState("All");

  const months = ["All", ...dummyData.map((d) => d.month)];

  const filteredData =
    selectedMonth === "All"
      ? dummyData
      : dummyData.filter((d) => d.month === selectedMonth);

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
          <Line
            type="monotone"
            dataKey="users"
            stroke="#3b82f6"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default UserGrowthChart;
