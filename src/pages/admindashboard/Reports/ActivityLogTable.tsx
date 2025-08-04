import { dummyLogs } from "@/data/userData";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { formatDate } from "@/utils/formatDate";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useState } from "react";
import Pagination from "@/components/ui/Pagination";

const ITEMS_PER_PAGE = 9;

function ActivityLogTable({ searchQuery }: { searchQuery: string }) {
  const [currentPage, setCurrentPage] = useState(1);
  const filteredData = dummyLogs.filter((log) =>
    log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
    log.action.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentData = filteredData.slice(startIndex, endIndex);

  return (
    <div>
      <ScrollArea className="w-full rounded-[20px] border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="py-4 !pl-6 font-bold">ID</TableHead>
            <TableHead className="py-4 font-bold">USER</TableHead>
            <TableHead className="py-4 font-bold">ACTION</TableHead>
            <TableHead className="py-4 font-bold">DATE</TableHead>
            <TableHead className="py-4 font-bold">DAY</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
            {currentData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="py-6 text-center text-gray-500">
                  No activity found.
                </TableCell>
              </TableRow>
            ) : (
              currentData.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="py-4 !pl-6">{log.id}</TableCell>
                  <TableCell className="py-4">{log.user}</TableCell>
                  <TableCell className="py-4">{log.action}</TableCell>
                  <TableCell className="py-4">{formatDate(log.date)}</TableCell>
              <TableCell className="py-4">{log.day}</TableCell>
            </TableRow>
              ))
            )}
        </TableBody>
      </Table>
    </ScrollArea>
        <Pagination
          currentPage={currentPage}
          totalItems={dummyLogs.length}
          itemsPerPage={ITEMS_PER_PAGE}
          onPageChange={setCurrentPage}
        />
      </div>
  );
}

export default ActivityLogTable;
