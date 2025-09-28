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
import Pagination from "@/components/ui/PaginationButton";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { IoReturnUpBack } from "react-icons/io5";
import { useArchivedLinks, useRestoreArchivedLink } from "@/hooks/useArchivedLinks";
import { toast, Toaster } from "sonner";

const ITEMS_PER_PAGE = 4;

function ArchivedLinkTypeTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: archivedLinks = [], isLoading } = useArchivedLinks();
  const restoreLink = useRestoreArchivedLink();

  const totalPages = Math.ceil(archivedLinks.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentData = archivedLinks.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handleRestore = async (id: string) => {
    try {
      await restoreLink.mutateAsync(id);
      toast.success("Link type has been successfully restored.");
    } catch (err: any) {
      toast.error(err?.message || "Unable to restore link type.");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-6">
        <p>Loading archived links...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <Toaster position="top-right" />
      <ScrollArea className="w-full rounded-[20px] border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="!pl-6 font-bold">ID</TableHead>
              <TableHead className="!pl-[40px] font-bold">Image</TableHead>
              <TableHead className="font-bold">Link Label</TableHead>
              <TableHead className="font-bold">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center italic py-6">
                  No link types found.
                </TableCell>
              </TableRow>
            ) : (
              currentData.map((link) => (
                <TableRow key={link.id}>
                  <TableCell>{link.id}</TableCell>
                  <TableCell>
                    <img
                      src={link.link}
                      alt={link.label}
                      className="w-25 h-7 object-cover"
                    />
                  </TableCell>
                  <TableCell>{link.label}</TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={restoreLink.isPending}
                      onClick={() => handleRestore(link.id)}
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

export default ArchivedLinkTypeTable;
