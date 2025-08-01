import { useState } from "react";
import { sellerData } from "@/data/userData";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import Pagination from "@/components/ui/Pagination";

const ITEMS_PER_PAGE = 10;

function SellerTable({ searchQuery }: { searchQuery: string }) {
  const [currentPage, setCurrentPage] = useState(1);
  const filteredData = sellerData.filter((seller) =>
    seller.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    seller.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentData = filteredData.slice(startIndex, endIndex);

  return (
    <div className="space-y-4">

      <ScrollArea className="w-full rounded-md border max-h-[600px]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="py-3 font-bold">ID</TableHead>
              <TableHead className="py-3 font-bold">FULL NAME</TableHead>
              <TableHead className="py-3 font-bold">STORE</TableHead>
              <TableHead className="py-3 font-bold">STATUS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="py-6 text-center text-gray-500">
                  No sellers found.
                </TableCell>
              </TableRow>
            ) : (
              currentData.map((seller) => (
              <TableRow key={seller.id}>
                <TableCell className="py-3">{seller.id}</TableCell>
                <TableCell className="py-3">{seller.fullName}</TableCell>
                <TableCell className="py-3">{seller.storeName}</TableCell>
                <TableCell className="py-3">
                  <div
                    className={`flex rounded-full items-center justify-center w-[100px]
                      ${seller.status === "Pending" ? "bg-yellow-100 text-yellow-800" : ""}
                      ${seller.status === "Verified" ? "bg-green-100 text-green-800" : ""}`}
                  >
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium
                        ${seller.status === "Pending" ? "bg-yellow-100 text-yellow-800" : ""}
                        ${seller.status === "Verified" ? "bg-green-100 text-green-800" : ""}`}
                    >
                      {seller.status}
                    </span>
                  </div>
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

export default SellerTable;
