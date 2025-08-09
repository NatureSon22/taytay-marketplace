import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import Pagination from "@/components/ui/Pagination";
import { useState } from "react";
import { useAdmins } from "@/hooks/useAdmins"; 

const ITEMS_PER_PAGE = 8;

function AdminTable({ searchQuery }: { searchQuery: string }) {
  const { admins = [], isLoading } = useAdmins(true);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredData = admins.filter((admin) =>
    `${admin.firstName} ${admin.lastName} ${admin.email}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentData = filteredData.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="space-y-4">
      <ScrollArea className="w-full rounded-[20px] border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="py-4 !pl-6 font-bold">ID</TableHead>
              <TableHead className="py-4 font-bold">EMAIL</TableHead>
              <TableHead className="py-4 font-bold">USERNAME</TableHead>
              <TableHead className="py-4 font-bold">Role</TableHead>
              <TableHead className="py-4 font-bold">STATUS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="py-6 text-center text-gray-500">
                  Loading...
                </TableCell>
              </TableRow>
            ) : currentData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="py-6 text-center text-gray-500">
                  No admins found.
                </TableCell>
              </TableRow>
            ) : (
              currentData.map((admin) => (
                <TableRow key={admin.id}>
                  <TableCell className="py-4">{admin.id}</TableCell>
                  <TableCell className="py-4">{admin.email}</TableCell>
                  <TableCell className="py-4">
                    {admin.firstName} {admin.lastName}
                  </TableCell>
                  <TableCell className="py-4">{admin.role}</TableCell>
                  <TableCell className="py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium
                        ${admin.status === "Active" ? "bg-green-100 text-green-800" : ""}
                        ${admin.status === "Inactive" ? "bg-red-100 text-red-800" : ""}
                      `}
                    >
                      {admin.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </ScrollArea>

      <Pagination
        currentPage={currentPage}
        totalItems={filteredData.length}
        itemsPerPage={ITEMS_PER_PAGE}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}

export default AdminTable;
