import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AdminTable from "../../Reports/AdminTable";

function AdminSettingForm() {
  const [formData, setFormData] = useState({
    adminId: "",
    email: "",
    firstName: "",
    middleName: "",
    lastName: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCancel = () => {
    setFormData({
      adminId: "",
      email: "",
      firstName: "",
      middleName: "",
      lastName: "",
    });
  };

  return (
    <div className="max-w-full space-y-8">
      <div className="w-full flex flex-col gap-4 mb-6">
        <h3 className="text-lg font-medium text-100">Account Information</h3>
        <div className="flex gap-4">
            <div className="flex flex-col gap-1 w-[50%]">
            <Label htmlFor="adminId" className="text-md">Admin ID</Label>
            <Input
                id="adminId"
                name="adminId"
                value={formData.adminId}
                onChange={handleChange}
            />
            </div>
            <div className="flex flex-col gap-1 w-[50%]">
            <Label htmlFor="email" className="text-md">Email</Label>
            <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
            />
            </div>
        </div>
      </div>

      <div className="w-full flex flex-col gap-4 mb-6">
        <h3 className="text-lg font-medium text-100">Personal Information</h3>
        <div className="flex gap-4">
            <div className="flex flex-col gap-1 w-[50%]">
            <Label htmlFor="firstName" className="text-md">First Name</Label>
            <Input
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
            />
            </div>
            <div className="flex flex-col gap-1 w-[50%]">
            <Label htmlFor="middleName" className="text-md">Middle Name</Label>
            <Input
                id="middleName"
                name="middleName"
                value={formData.middleName}
                onChange={handleChange}
            />
            </div>
            <div className="flex flex-col gap-1 w-[50%]">
            <Label htmlFor="lastName" className="text-md">Last Name</Label>
            <Input
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
            />
            </div>
        </div>
        
      </div>

      <div className="flex gap-4 flex-end justify-end mt-6">
        <Button type="button" className="text-100 bg-white hover:bg-white shadow-none hover:text-100 cursor-pointer text-md border-none" onClick={handleCancel}>
          Cancel
        </Button>
        <Button type="button" className="bg-100 cursor-pointer text-md hover:bg-100 text-white">Add Admin</Button>
      </div>

      <div>
        <AdminTable searchQuery={""} />
      </div>
    </div>
  );
}

export default AdminSettingForm;
