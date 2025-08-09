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
import Pagination from "@/components/ui/Pagination";
import { IoReturnUpBack } from "react-icons/io5";
import { archivedLinkTypeData } from "@/data/archivedData";
import { ScrollArea } from "@radix-ui/react-scroll-area";

const ITEMS_PER_PAGE = 4;

function ArchivedLinkTypeTable() {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(archivedLinkTypeData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentData = archivedLinkTypeData.slice(startIndex, endIndex);

  return (
    <div className="flex flex-col gap-4">
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
                      src={link.img}
                      alt={link.label}
                      className="w-25 h-7 object-cover"
                    />
                  </TableCell>
                  <TableCell>{link.label}</TableCell>
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

export default ArchivedLinkTypeTable;
