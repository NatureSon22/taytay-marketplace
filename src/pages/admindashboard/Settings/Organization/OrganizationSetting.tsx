import OrganizationSettingForm from "./OrganizationSettingForm";
import OrganizationTable from "./OrganizationTable";

function OrganizationSetting() {


  return (
    <div className="flex flex-col gap-6 pr-6">
      <OrganizationSettingForm />
      <OrganizationTable />
    </div>
  );
}

export default OrganizationSetting;
