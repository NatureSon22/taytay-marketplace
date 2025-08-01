import { Button } from "@/components/ui/button";

type PaginationProps = {
  currentPage: number;
  totalItems: number;
  itemsPerPage?: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({
  currentPage,
  totalItems,
  itemsPerPage = 12,
  onPageChange,
}: PaginationProps) {
  const pageCount = Math.ceil(totalItems / itemsPerPage);

  if (pageCount <= 1) return null;

  return (
    <div className="flex justify-end gap-2 mt-4">
      <Button
        size="sm"
        variant="outline"
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
      >
        Previous
      </Button>
      <Button
        size="sm"
        variant="outline"
        onClick={() => onPageChange(Math.min(currentPage + 1, pageCount))}
        disabled={currentPage === pageCount}
      >
        Next
      </Button>
    </div>
  );
}
