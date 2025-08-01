export function getStatusColorClass(status: string): string {
  switch (status) {
    case "Pending":
      return "bg-yellow-100 text-yellow-600";
    case "Verified":
      return "bg-green-100 text-green-600";
    case "Active":
      return "bg-green-100 text-green-600";
    case "Inactive":
      return "bg-red-100 text-red-600";
    default:
      return "";
  }
}
