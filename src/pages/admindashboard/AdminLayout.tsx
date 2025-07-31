import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import AdminNavbar from "./AdminNavbar";

export default function AdminLayout() {
  return (
    <div className="flex h-screen overflow-hidden">
      <AdminSidebar />

      <div className="flex flex-col flex-1">
        <AdminNavbar />

        <main className="flex-1 overflow-y-auto bg-gray-50 px-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
