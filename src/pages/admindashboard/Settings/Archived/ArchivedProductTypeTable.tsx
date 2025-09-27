import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IoReturnUpBack } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useState } from "react";
import Pagination from "@/components/ui/PaginationButton";
import {
  useArchivedProductType,
  useRetrieveProductType,
} from "@/hooks/useProductTypes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { notifySuccess, notifyError } from "@/utils/toast";

const ITEMS_PER_PAGE = 8;

function ArchivedProductTypeTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: archivedProductTypes = [], isLoading } =
    useArchivedProductType();
  const retrieveProductType = useRetrieveProductType();

  const totalPages = Math.ceil(archivedProductTypes.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentData = archivedProductTypes.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handleRestore = async (id: string) => {
    try {
      await retrieveProductType.mutateAsync(id);
      notifySuccess(
        "Restored!",
        "Product type has been successfully restored."
      );
    } catch (err: any) {
      notifyError("Failed!", err?.message || "Unable to restore product type.");
    }
  };

  if (isLoading) {
    return <div className="text-center py-6">Loading...</div>;
  }

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
            {currentData.length > 0 ? (
              currentData.map((productType) => (
                <TableRow key={productType.id}>
                  <TableCell className="py-4 !pl-6">{productType.id}</TableCell>
                  <TableCell className="py-4">{productType.label}</TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-white !border-100 bg-100 hover:bg-100 border rounded-full h-[30px] w-[60px]"
                      disabled={retrieveProductType.isPending}
                      onClick={() => handleRestore(productType.id)}
                    >
                      <IoReturnUpBack className="text-white" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={3}
                  className="py-6 text-center text-gray-500"
                >
                  No archived product types found.
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

      {/* Toast Container */}
      <ToastContainer hideProgressBar />
    </div>
  );
}

export default ArchivedProductTypeTable;
