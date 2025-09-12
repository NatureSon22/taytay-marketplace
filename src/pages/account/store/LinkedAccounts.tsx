import ComboBox from "@/components/ComboBox";
import { useEditableState } from "@/hooks/useEditableState";
import InfoCard from "@/layouts/InfoCard";

function LinkedAccounts() {
  const { isEditing, enableEditing, disableEditing, toggleEditing } =
    useEditableState();

  return (
    <InfoCard
      header="Linked Accounts"
      isEditing={isEditing}
      enableEditing={enableEditing}
      disableEditing={disableEditing}
    >
      div
      {/* <ComboBox items={[]} /> */}
    </InfoCard>
  );
}

export default LinkedAccounts;
