import StoreDetails from "../info/StoreDetails";
import AboutStore from "./AboutStore";
import LinkedAccounts from "./LinkedAccounts";
import StoreIcon from "./StoreIcon";

function ManageStoreInfo() {
  return (
    <div className="flex-1 space-y-5">
      <StoreIcon />
      <AboutStore />
      <StoreDetails />
      <LinkedAccounts />
    </div>
  );
}

export default ManageStoreInfo;
