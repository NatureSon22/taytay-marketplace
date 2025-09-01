import Profile from "./Profile";
import Products from "./Products";

function ManageStore() {
  return (
    <div className="flex-1">
      <Profile />
      <div className="w-full border border-gray-200 my-10"></div>
      <Products />
    </div>
  );
}

export default ManageStore;
