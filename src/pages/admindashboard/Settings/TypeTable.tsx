import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FaArchive } from "react-icons/fa";
import Pagination from "@/components/ui/Pagination";
import { ScrollArea } from "@radix-ui/react-scroll-area";

type Type = {
  id: string;
  label: string;
};

type TypeTableProps = {
  types: Type[];
  onArchive: (id: string) => void;
};

const ITEMS_PER_PAGE = 6;

function TypeTable({ types, onArchive }: TypeTableProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentData = types.slice(startIndex, endIndex);

  return (
    <div className="flex flex-col gap-4">
      <ScrollArea className="w-full rounded-[20px] border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="!pl-6 font-bold">ID</TableHead>
              <TableHead className="font-bold">Product Type Label</TableHead>
              <TableHead className="font-bold">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentData.map((type) => (
              <TableRow key={type.id}>
                <TableCell>{type.id}</TableCell>
                <TableCell>{type.label}</TableCell>
                <TableCell>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-100 !border-100 border rounded-full w-10 h-10"
                    onClick={() => onArchive(type.id)}
                  >
                    <FaArchive className="text-100" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {types.length === 0 && (
              <TableRow>
                <TableCell colSpan={3} className="text-center italic py-6">
                  No types found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </ScrollArea>

      <Pagination
        currentPage={currentPage}
        totalItems={types.length}
        itemsPerPage={ITEMS_PER_PAGE}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}

export default TypeTable;
