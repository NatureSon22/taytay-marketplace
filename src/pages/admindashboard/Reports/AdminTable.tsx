import { useState, useMemo } from "react";
import { useReports } from "@/hooks/useReports";
import Pagination from "@/components/ui/PaginationButton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@radix-ui/react-scroll-area";

export default function AdminTable({
  searchQuery = "",
}: {
  searchQuery?: string;
}) {
  const { data: admins = [], isLoading, isError } = useReports();
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 8;

  const filteredAdmins = useMemo(() => {
    const lowerSearch = searchQuery.toLowerCase();
    return admins.filter((admin) =>
      `${admin.firstName ?? ""} ${admin.middleName ?? ""} ${
        admin.lastName ?? ""
      } ${admin.email ?? ""} ${admin.id ?? ""}`
        .toLowerCase()
        .includes(lowerSearch)
    );
  }, [admins, searchQuery]);

  const totalPages = Math.ceil(filteredAdmins.length / rowsPerPage);
  const paginatedAdmins = filteredAdmins.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div className="space-y-4">
      <ScrollArea className="w-full rounded-[20px] border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="py-4 font-bold">ID</TableHead>
              <TableHead className="py-4 font-bold">EMAIL</TableHead>
              <TableHead className="py-4 font-bold">USERNAME</TableHead>
              <TableHead className="py-4 font-bold">ROLE</TableHead>
              <TableHead className="py-4 font-bold">STATUS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  Loading...
                </TableCell>
              </TableRow>
            )}

            {isError && (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-red-500">
                  Error fetching admins
                </TableCell>
              </TableRow>
            )}

            {!isLoading && !isError && paginatedAdmins.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-gray-500">
                  No admins found.
                </TableCell>
              </TableRow>
            )}

            {paginatedAdmins.map((admin) => (
              <TableRow key={admin.id}>
                <TableCell>{admin.email}</TableCell>
                <TableCell>
                  {admin.firstName} {admin.middleName ?? ""} {admin.lastName}
                </TableCell>
                <TableCell>{admin.role}</TableCell>
                <TableCell>
                  <div
                    className={`flex rounded-full items-center justify-center w-[100px]
                        ${
                          admin.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : ""
                        }
                        ${
                          admin.status === "Inactive"
                            ? "bg-red-100 text-red-800"
                            : ""
                        }`}
                  >
                    <span className="px-3 py-1 rounded-full text-sm font-medium">
                      {admin.status}
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
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
