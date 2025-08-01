import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { formatDate } from "@/utils/formatDate";
import { dummyLogs } from "@/data/userData";

const daysOfWeek = ["All", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const itemsPerPage = 5;

function UserActivityLog() {
  const [selectedDay, setSelectedDay] = useState("All");
  const [page, setPage] = useState(1);

  const filteredLogs =
    selectedDay === "All"
      ? dummyLogs
      : dummyLogs.filter((log) => log.day === selectedDay);

  const pageCount = Math.ceil(filteredLogs.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const paginatedLogs = filteredLogs.slice(startIndex, startIndex + itemsPerPage);

  const handleDayChange = (day: string) => {
    setSelectedDay(day);
    setPage(1); 
  };

  return (
    <div className="bg-white border rounded-xl p-6 mb-6 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Activity Log</h2>
        <Select value={selectedDay} onValueChange={handleDayChange}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Filter by Day" />
          </SelectTrigger>
          <SelectContent>
            {daysOfWeek.map((day) => (
              <SelectItem key={day} value={day}>
                {day}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <ScrollArea className="w-full max-h-[320px] rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="py-4">
              <TableHead className="py-4 w-[30%] font-bold text-[16px]">USER</TableHead>
              <TableHead className="w-[40%] font-bold text-[16px]">ACTION</TableHead>
              <TableHead className="w-[30%] font-bold text-[16px]">DATE MODIFIED</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedLogs.map((log, index) => (
              <TableRow className="py-4" key={index}>
                <TableCell className="py-4 font-medium">{log.user}</TableCell>
                <TableCell>{log.action}</TableCell>
                <TableCell>
                  {formatDate(log.date)}
                </TableCell>
              </TableRow>
            ))}
            {paginatedLogs.length === 0 && (
              <TableRow>
                <TableCell colSpan={3} className="text-center text-sm py-4 text-muted-foreground">
                  No activity logs for {selectedDay}.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </ScrollArea>

      {pageCount > 1 && (
        <div className="flex justify-end gap-2 mt-4">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
          >
            Previous
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setPage((prev) => Math.min(prev + 1, pageCount))}
            disabled={page === pageCount}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}

export default UserActivityLog;
