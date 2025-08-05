import { format } from "date-fns";

export function formatDate(raw: string) {
  const parsed = new Date(raw);
  return isNaN(parsed.getTime()) ? raw : format(parsed, "MMMM d, yyyy · h:mm a");
}