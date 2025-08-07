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

type LinkType = {
  id: string;
  img: string;
  label: string;
};

type LinkTypeTableProps = {
  links: LinkType[];
  onArchive: (id: string) => void;
};

const ITEMS_PER_PAGE = 4;

function LinkTypeTable({ links, onArchive }: LinkTypeTableProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentData = links.slice(startIndex, endIndex);

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
                {currentData.map((link) => (
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
                        className="text-100 !border-100 border rounded-full w-10 h-10"
                        onClick={() => onArchive(link.id)}
                    >
                        <FaArchive className="text-100" />
                    </Button>
                    </TableCell>
                </TableRow>
                ))}
                {links.length === 0 && (
                <TableRow>
                    <TableCell colSpan={4} className="text-center italic py-6">
                    No link types found.
                    </TableCell>
                </TableRow>
                )}
            </TableBody>
        </Table>
      </ScrollArea>

      <Pagination
        currentPage={currentPage}
        totalItems={links.length}
        itemsPerPage={ITEMS_PER_PAGE}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}

export default LinkTypeTable;
