import { dummyData } from "@/data/userData";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { ScrollArea } from "@radix-ui/react-scroll-area";

function UserGrowthTable({ searchQuery }: { searchQuery: string }) {
  const filteredData = dummyData.filter((data) =>
    data.month.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
      <ScrollArea className="w-full rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="py-3 font-bold">MONTH</TableHead>
            <TableHead className="py-3 font-bold">USERS</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredData.map((entry, index) => (
            <TableRow key={index}>
              <TableCell className="py-3">{entry.month}</TableCell>
              <TableCell className="py-3">{entry.users}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  );
}

export default UserGrowthTable;
