import StoreDetails from "../info/StoreDetails";
import AboutStore from "./AboutStore";
import Categories from "./Categories";
import LinkedAccounts from "./LinkedAccounts";
import StoreIcon from "./StoreIcon";
import Types from "./Types";

function ManageStoreInfo() {
  return (
    <div className="flex-1 space-y-5">
      <StoreIcon />
      <AboutStore />
      <StoreDetails />
      {/* <Categories />
      <Types /> */}
      <LinkedAccounts />
    </div>
  );
}

export default ManageStoreInfo;
