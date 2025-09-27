import { format } from "date-fns";

export function formatDate(raw: string | undefined, showTime: boolean = false) {
  if (!raw) return;
  const parsed = new Date(raw);
  return isNaN(parsed.getTime())
    ? raw
    : format(parsed, `MMMM d, yyyy ${showTime ? " - h:mm a" : ""}`);
}
