import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useState } from "react";
import { archivedCategoryData } from "@/data/archivedData";
import Pagination from "@/components/ui/Pagination";
import { IoReturnUpBack } from "react-icons/io5";

const ITEMS_PER_PAGE = 8;

function ArchivedCategoriesTable() {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(archivedCategoryData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentData = archivedCategoryData.slice(startIndex, endIndex);

  return (
    <div className="space-y-6">
      <ScrollArea className="w-full rounded-[20px] border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="py-4 !pl-6 font-bold">ID</TableHead>
              <TableHead className="py-4 font-bold">Label</TableHead>
              <TableHead className="py-4 font-bold">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentData.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={3}
                  className="py-6 text-center text-gray-500"
                >
                  No categories found.
                </TableCell>
              </TableRow>
            ) : (
              currentData.map((cat) => (
                <TableRow key={cat.id}>
                  <TableCell className="py-4 !pl-6">{cat.id}</TableCell>
                  <TableCell className="py-4">{cat.label}</TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      variant="outline"
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
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}

export default ArchivedCategoriesTable;
