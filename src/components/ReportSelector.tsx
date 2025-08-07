import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

type ReportSelectorProps = {
  selectedReport: string;
  onChange: (value: string) => void;
};

const REPORT_OPTIONS = ["Seller", "Admin", "Activity Log"];

function ReportSelector({
  selectedReport,
  onChange,
}: ReportSelectorProps) {
  return (
    <div className="flex gap-2 items-center w-[500px] justify-end">
      <p className="text-gray-600">Select Report</p>
      <Select value={selectedReport} onValueChange={onChange}>
        <SelectTrigger className="w-[200px] cursor-pointer">
          <SelectValue placeholder="Select Report" />
        </SelectTrigger>
        <SelectContent>
          {REPORT_OPTIONS.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export default ReportSelector;
