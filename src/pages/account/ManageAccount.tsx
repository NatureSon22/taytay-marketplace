import InfoField from "@/components/InfoField";
import InfoCard from "@/layouts/InfoCard";
import account from "@/data/account";

function ManageAccount() {
  return (
    <div className="flex-1 space-y-5">
      <InfoCard header="Account Information" path="">
        <div className="flex">
          <div className="max-w-[220px] space-y-3 flex-1">
            <InfoField label="Username" value={account.username} />
            <InfoField label="Password" value={account.password} />
          </div>

          <div className="max-w-[220px] space-y-3 flex-1">
            <InfoField label="Email" value={account.email} />
          </div>
        </div>
      </InfoCard>

      <InfoCard header="Personal Information" path="">
        <div className="flex">
          <div className="max-w-[220px] space-y-3 flex-1">
            <InfoField label="First Name" value={account.firstName} />
            {account?.middleName && (
              <InfoField label="Middle Name" value={account.middleName} />
            )}
            <InfoField label="Birthday" value={account.birthday} />
            <InfoField label="Address" value={account.address} />
          </div>

          <div className="max-w-[220px] space-y-3 flex-1">
            <InfoField label="Last Name" value={account.lastName} />
            <InfoField label="Contact Number" value={account.contactNumber} />
            <InfoField label="Age" value={account.age} />
          </div>
        </div>
      </InfoCard>
    </div>
  );
}

export default ManageAccount;
