import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { IoReturnUpBack } from "react-icons/io5";
import { useState } from "react";
import Pagination from "@/components/ui/Pagination";
import { useArchivedCategories, useRetrieveCategory } from "@/hooks/useCategories";
import { toast, Toaster } from "sonner";

const ITEMS_PER_PAGE = 8;

function ArchivedCategoriesTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: archivedCategories = [], isLoading } = useArchivedCategories();
  const retrieveCategory = useRetrieveCategory();

  const totalPages = Math.ceil(archivedCategories.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentData = archivedCategories.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleRetrieve = async (id: string) => {
    try {
      await retrieveCategory.mutateAsync(id);
      toast.success("Category has been successfully restored.");
    } catch (err: any) {
      toast.error(err?.message || "Unable to restore category.");
    }
  };

  if (isLoading) {
    return <div className="text-center py-6">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <Toaster position="top-right" />
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
            {currentData.length > 0 ? (
              currentData.map((category) => (
                <TableRow key={category.id}>
                  <TableCell className="py-4 !pl-6">{category.id}</TableCell>
                  <TableCell className="py-4">{category.label}</TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-white !border-100 bg-100 hover:bg-100 border rounded-full h-[30px] w-[60px]"
                      onClick={() => handleRetrieve(category.id)}
                      disabled={retrieveCategory.isPending}
                    >
                      <IoReturnUpBack className="text-white" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} className="py-6 text-center text-gray-500">
                  No archived categories found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </ScrollArea>

      {totalPages > 1 && (
        <div className="flex justify-end">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}

    </div>
  );
}

export default ArchivedCategoriesTable;
