import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { formatDate } from "@/utils/formatDate";
import { useState, useMemo } from "react";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import Pagination from "@/components/ui/Pagination";
import { useActLogs } from "@/hooks/useActLogs"; 

function ActivityLogTable({ searchQuery }: { searchQuery: string }) {
  const { data: logs = [], isLoading, isError, error } = useActLogs();
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 8;

  if (isLoading) {
    return <p className="text-center py-4">Loading activity logs...</p>;
  }

  if (isError) {
    return (
      <p className="text-center py-4 text-red-500">
        Failed to load activity logs: {(error as Error).message}
      </p>
    );
  }

    const filteredLogs = useMemo(() => {
      const lowerSearch = searchQuery.toLowerCase();
      return logs.filter((log) =>
        `${log.username ?? ""} ${log.action}`
          .toLowerCase()
          .includes(lowerSearch)
      );
    }, [logs, searchQuery]);
  
    const totalPages = Math.ceil(filteredLogs.length / rowsPerPage);
    const paginatedLog = filteredLogs.slice(
      (currentPage - 1) * rowsPerPage,
      currentPage * rowsPerPage
    );

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
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedLog.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="py-6 text-center text-gray-500">
                  No activity found.
                </TableCell>
              </TableRow>
            ) : (
              paginatedLog.map((log) => (
                <TableRow key={log._id}>
                  <TableCell className="py-4 !pl-6">{log._id}</TableCell>
                  <TableCell className="py-4">{log.username}</TableCell>
                  <TableCell className="py-4">{log.action}</TableCell>
                  <TableCell className="py-4">{formatDate(log.createdAt)}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </ScrollArea>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}

export default ActivityLogTable;
