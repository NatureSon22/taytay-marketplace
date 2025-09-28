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
import Pagination from "@/components/ui/PaginationButton";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useProductTypes } from "@/hooks/useProductTypes";
import { toast } from "sonner";

const ITEMS_PER_PAGE = 6;

function TypeTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const {
    data = [],
    isLoading,
    isError,
    error,
    archiveProductTypes,
    isArchiving,
  } = useProductTypes();

  const handleArchiveType = (typeId: string) => {
    archiveProductTypes(typeId, {
      onSuccess: () => toast.success("Product type archived successfully!"),
      onError: (err: any) => toast.error(err?.message || "Failed to archive product type"),
    });
  };

  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentData = data.slice(startIndex, startIndex + ITEMS_PER_PAGE);

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
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-6">
                  Loading categories...
                </TableCell>
              </TableRow>
            ) : isError ? (
              <TableRow>
                <TableCell
                  colSpan={3}
                  className="text-center text-red-500 py-6"
                >
                  Error: {error.message}
                </TableCell>
              </TableRow>
            ) : currentData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} className="text-center italic py-6">
                  No categories found.
                </TableCell>
              </TableRow>
            ) : (
              currentData.map((productType) => (
                <TableRow key={productType.id}>
                  <TableCell className="!pl-6">{productType.id}</TableCell>
                  <TableCell>{productType.label}</TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-100 !border-100 border rounded-full w-10 h-10"
                      onClick={() => handleArchiveType(productType.id)}
                      disabled={isArchiving}
                    >
                      <FaArchive className="text-100" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </ScrollArea>

      {data.length > ITEMS_PER_PAGE && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}

export default TypeTable;
