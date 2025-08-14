import CategorySettingForm from "./CategorySettingForm";
import CategoryTable from "./CategoryTable";

function CategorySetting() {


  return (
    <div className="flex flex-col gap-6 pr-6">
      <CategorySettingForm />
      <CategoryTable />
    </div>
  );
}

export default CategorySetting;
