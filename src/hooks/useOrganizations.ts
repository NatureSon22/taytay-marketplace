import { getOrganizations } from "@/api/organizations";
import formatComboBoxItem from "@/utils/formatComboBoxItem";
import { useQuery } from "@tanstack/react-query";

const useOrganizations = () => {
  const { data = [] } = useQuery({
    queryKey: ["organizations"],
    queryFn: getOrganizations,
    select: (data) =>
      formatComboBoxItem(data as Record<string, unknown>[], "_id", "organizationName"),
  });

  return data;
};

export default useOrganizations;
