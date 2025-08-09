import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import Pagination from "@/components/ui/Pagination";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { IoReturnUpBack } from "react-icons/io5";
import { fetchArchivedAdmins } from "@/services/adminArchivedService";
import { useArchivedAdmins } from "@/hooks/useArchivedAdmins";

const ITEMS_PER_PAGE = 6;

function AdminArchiveTable() {
  const { archivedAdmins, isLoading, restoreAdmin } = useArchivedAdmins();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredData = archivedAdmins.filter((admin) => {
    const fullName = `${admin.firstName} ${admin.lastName}`.toLowerCase();
    return (
      admin.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fullName.includes(searchTerm.toLowerCase())
    );
  });

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentData = filteredData.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="flex flex-col gap-4">
      <div className="relative w-full">
        <span className="absolute inset-y-0 left-3 flex items-center text-gray-500">
          <Search size={18} />
        </span>
        <Input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          placeholder="Search..."
          className="pl-10 w-full !focus:outline-none"
        />
      </div>

      <ScrollArea className="w-full rounded-[20px] border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="py-4 !pl-6 font-bold">ID</TableHead>
              <TableHead className="py-4 font-bold">Email</TableHead>
              <TableHead className="py-4 font-bold">Username</TableHead>
              <TableHead className="py-4 font-bold">Role</TableHead>
              <TableHead className="py-4 font-bold">Status</TableHead>
              <TableHead className="py-4 font-bold">Action</TableHead>
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
                <TableRow key={admin._id}>
                  <TableCell className="py-4 !pl-6">{admin.id}</TableCell>
                  <TableCell className="py-4">{admin.email}</TableCell>
                  <TableCell className="py-4">
                    {admin.firstName} {admin.lastName}
                  </TableCell>
                  <TableCell className="py-4">{admin.role}</TableCell>
                  <TableCell className="py-4">
                    <div
                      className={`flex rounded-full items-center justify-center w-[100px]
                        ${admin.status === "Active" ? "bg-green-100 text-green-800" : ""}
                        ${admin.status === "Inactive" ? "bg-red-100 text-red-800" : ""}`}
                    >
                      <span className="px-3 py-1 rounded-full text-sm font-medium">
                        {admin.status}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button
                        size="sm"
                        variant="outline"
                        onClick={() => restoreAdmin(admin.id)}
                        className="text-white !border-100 bg-100 hover:bg-100 border rounded-full h-[30px] w-[60px]"
                      >
                        <IoReturnUpBack className="text-white" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </ScrollArea>

      <div className="flex justify-end">
        <Pagination
          currentPage={currentPage}
          totalItems={filteredData.length}
          itemsPerPage={ITEMS_PER_PAGE}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}

export default AdminArchiveTable;
