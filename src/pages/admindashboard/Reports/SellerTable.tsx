import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import Pagination from "@/components/ui/PaginationButton";
import { useUsers } from "@/hooks/useUsers";

function SellerTable({ searchQuery }: { searchQuery: string }) {
  const { paginatedUsers, isLoading, currentPage, totalPages, setCurrentPage } =
    useUsers("Seller", searchQuery);

  return (
    <div className="space-y-4">
      {isLoading ? (
        <p className="text-center text-gray-500">Loading sellers...</p>
      ) : (
        <>
          <ScrollArea className="w-full rounded-[20px] border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="py-2 font-bold">FULL NAME</TableHead>
                  <TableHead className="py-2 font-bold">STORE</TableHead>
                  <TableHead className="py-2 font-bold">STATUS</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedUsers.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="py-6 text-center text-gray-500"
                    >
                      No sellers found.
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedUsers.map((seller) => (
                    <TableRow key={seller.id}>
                      <TableCell className="py-2">
                        {seller.firstName} {seller.lastName}
                      </TableCell>
                      <TableCell className="py-2">{seller.username}</TableCell>
                      <TableCell className="py-2">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium
                            ${
                              seller.status === "Verified"
                                ? "bg-green-100 text-green-800"
                                : ""
                            }
                            ${
                              seller.status === "Pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : ""
                            }
                            ${
                              seller.status === "Blocked"
                                ? "bg-red-100 text-red-800"
                                : ""
                            }`}
                        >
                          {seller.status}
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
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </div>
  );
}

export default SellerTable;
