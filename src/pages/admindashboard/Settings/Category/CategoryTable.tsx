import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { FaArchive } from "react-icons/fa";
import Pagination from "@/components/ui/Pagination";

type Category = {
  id: string;
  label: string;
};

type CategoryTableProps = {
  categories: Category[];
  onArchive: (id: string) => void;
};

const ITEMS_PER_PAGE = 6;

function CategoryTable({ categories, onArchive }: CategoryTableProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentData = categories.slice(startIndex, endIndex);

  return (
    <div className="flex flex-col gap-4">
      <ScrollArea className="w-full rounded-[20px] border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="!pl-6 font-bold">ID</TableHead>
              <TableHead className="font-bold">Category Label</TableHead>
              <TableHead className="font-bold">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentData.length > 0 ? (
              currentData.map((category) => (
                <TableRow key={category.id}>
                  <TableCell>{category.id}</TableCell>
                  <TableCell>{category.label}</TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-100 !border-100 border rounded-full w-10 h-10"
                      onClick={() => onArchive(category.id)}
                    >
                      <FaArchive className="text-100" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} className="text-center italic py-6">
                  No categories found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </ScrollArea>

      <Pagination
        currentPage={currentPage}
        totalItems={categories.length}
        itemsPerPage={ITEMS_PER_PAGE}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}

export default CategoryTable;
