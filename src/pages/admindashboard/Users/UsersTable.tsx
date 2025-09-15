import { useState, type Key } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FaArchive } from "react-icons/fa";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useUsers } from "@/hooks/useUsers";
import { UserStatusSelect } from "@/components/UserStatusSelect";
import type { Seller } from "@/data/userData";
import PermitModal from "@/components/PermitModal";
import type { Administrator } from "@/services/admin";
import { useAdmins } from "@/hooks/useAdmins";

function UsersTable() {
  const [userType, setUserType] = useState<"Seller" | "Administrator">("Seller");
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSeller, setSelectedSeller] = useState<Seller | null>(null);

  const {
    paginatedUsers,
    currentPage,
    totalPages,
    setCurrentPage,
  } = useUsers("Seller", searchTerm);

  const {
    admins,
    isLoading: isAdminsLoading,
    archiveAdmin,
    updateAdminStatus, 
    isArchiving,
    currentPage: adminPage,
    totalPages: adminTotalPages,
    setCurrentPage: setAdminPage,
  } = useAdmins(userType === "Administrator", searchTerm);

  const handleViewClick = (seller: Seller) => {
    setSelectedSeller(seller);
    setIsModalOpen(true);
  };

  const displayedUsers =
    userType === "Administrator" ? admins : paginatedUsers;

  return (
    <div className="bg-white border rounded-xl p-6 shadow-sm">
      <div className="flex justify-between items-center mb-4 gap-2">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              if (userType === "Seller") setCurrentPage(1);
            }}
            className="pl-9"
          />
        </div>
        <div className="flex items-center gap-2 w-[400px] justify-end">
          <p className="text-gray-600">Filter by</p>
          <Select
            value={userType}
            onValueChange={(val) =>
              setUserType(val as "Seller" | "Administrator")
            }
          >
            <SelectTrigger className="cursor-pointer w-[150px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Seller">Seller</SelectItem>
              <SelectItem value="Administrator">Administrator</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      <ScrollArea className="w-full rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-bold">ID</TableHead>
              <TableHead className="font-bold">EMAIL</TableHead>
              {userType === "Seller" ? (
                <>
                  <TableHead className="font-bold">FULL NAME</TableHead>
                  <TableHead className="font-bold">STORE NAME</TableHead>
                  <TableHead className="font-bold">STATUS PERMIT</TableHead>
                  <TableHead className="font-bold">PERMIT</TableHead>
                </>
              ) : (
                <>
                  <TableHead className="font-bold">FULL NAME</TableHead>
                  <TableHead className="font-bold">ROLE</TableHead>
                  <TableHead className="font-bold">STATUS</TableHead>
                  <TableHead className="font-bold">ACTION</TableHead>
                </>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {isAdminsLoading && userType === "Administrator" ? (
              <TableRow>
                <TableCell colSpan={4}>Loading admins...</TableCell>
              </TableRow>
            ) : displayedUsers.length > 0 ? (
              displayedUsers.map((user: any, index: Key | null | undefined) => (
                <TableRow key={index}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.email}</TableCell>

                  {userType === "Seller" ? (
                    <>
                      <TableCell>{(user as Seller).fullName}</TableCell>
                      <TableCell>{(user as Seller).storeName}</TableCell>
                      <TableCell>
                        <UserStatusSelect
                          value={(user as Seller).status}
                          options={["Pending", "Verified"]}
                        />
                      </TableCell>
                      <TableCell>
                        <Button
                          className="cursor-pointer"
                          size="sm"
                          variant="outline"
                          onClick={() => handleViewClick(user as Seller)}
                        >
                          View
                        </Button>
                      </TableCell>
                    </>
                  ) : (
                    <>
                      <TableCell>
                        {(user as Administrator).firstName}{" "}
                        {(user as Administrator).lastName}
                      </TableCell>
                      <TableCell>{(user as Administrator).role}</TableCell>
                      <TableCell>
                        <UserStatusSelect
                          value={user.status}
                          options={["Active", "Inactive"]}
                          onChange={(newStatus) =>
                            updateAdminStatus({ id: user.id, status: newStatus as "Active" | "Inactive" })
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-100 !border-100 border rounded-full w-10 h-10"
                          onClick={() => archiveAdmin((user as Administrator).id)}
                          disabled={isArchiving}
                        >
                          <FaArchive />
                        </Button>
                      </TableCell>
                    </>
                  )}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={userType === "Seller" ? 6 : 4}
                  className="text-center italic text-muted-foreground"
                >
                  No {userType.toLowerCase()}s found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </ScrollArea>

      {totalPages > 1 && (
        <div className="flex justify-end mt-4 gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() =>
              userType === "Seller"
                ? setCurrentPage(currentPage - 1)
                : setAdminPage(adminPage - 1)
            }
            disabled={userType === "Seller" ? currentPage === 1 : adminPage === 1}
          >
            Previous
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() =>
              userType === "Seller"
                ? setCurrentPage(currentPage + 1)
                : setAdminPage(adminPage + 1)
            }
            disabled={
              userType === "Seller"
                ? currentPage === totalPages
                : adminPage === adminTotalPages
            }
          >
            Next
          </Button>
        </div>
      )}

      <PermitModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        seller={selectedSeller}
      />
    </div>
  );
}

export default UsersTable;
