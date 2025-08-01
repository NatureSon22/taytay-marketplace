import PageHeader from "@/components/PageHeader";
import UsersTable from "./UsersTable";

function UsersPage() {
  return (
    <div>
      <PageHeader 
        title="Users"
        subtitle="Manage registered users here."
      />
      <div className="pt-6">
        <UsersTable />
      </div>
    </div>
  );
}

export default UsersPage;
