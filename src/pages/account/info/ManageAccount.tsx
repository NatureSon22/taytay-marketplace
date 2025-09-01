import PersonalInfo from "./PersonalInfo";
import AccountInfo from "./AccountInfo";

function ManageAccount() {
  return (
    <div className="flex-1 space-y-5">
      <AccountInfo />
      <PersonalInfo />
    </div>
  );
}

export default ManageAccount;
