import type { ComboBoxItem } from "@/components/ComboBox";

export default function formatComboBoxItem(
  data: Array<Record<string, unknown>> = [],
  fieldValue: string,
  fieldLabel: string
) {
  if (!Array.isArray(data)) return [];

  const items = data.map((el) => ({
    value: el[fieldValue] ?? "",
    label: el[fieldLabel] ?? "",
  })) as ComboBoxItem[];

  return items;
}
