import TypeSettingForm from "./TypeSettingForm";
import TypeTable from "./TypeTable";

function TypeSetting() {

  return (
    <div className="flex flex-col gap-6 pr-6">
      <TypeSettingForm />
      <TypeTable />
    </div>
  );
}

export default TypeSetting;