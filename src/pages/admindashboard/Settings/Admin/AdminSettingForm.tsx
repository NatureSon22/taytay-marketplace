import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useCreateAdmin } from "@/hooks/useCreateAdmin";
import AdminTable from "../../Reports/AdminTable";

function AdminSettingForm() {
  const [formData, setFormData] = useState({
    adminId: "",
    email: "",
    firstName: "",
    middleName: "",
    lastName: "",
    role: "", 
  });

  const resetForm = () => {
    setFormData({
      adminId: "",
      email: "",
      firstName: "",
      middleName: "",
      lastName: "",
      role: "", 
    });
  };

  const { mutate: createAdmin, isLoading, error } = useCreateAdmin(resetForm);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRoleChange = (value: string) => {
    setFormData((prev) => ({ ...prev, role: value }));
  };

  const handleCancel = resetForm;

  const handleSubmit = () => {
    createAdmin({
      id: formData.adminId,
      email: formData.email,
      firstName: formData.firstName,
      middleName: formData.middleName,
      lastName: formData.lastName,
      role: formData.role,
    },
    {
      onSuccess: resetForm, 
    }
);
  };

  return (
    <div className="max-w-full space-y-8">
      {/* Account Information */}
      <div className="w-full flex flex-col gap-4 mb-6">
        <h3 className="text-lg font-medium text-100">Account Information</h3>
        <div className="flex gap-4">
          {/* Admin ID */}
          <div className="flex flex-col gap-1 w-[50%]">
            <Label htmlFor="adminId" className="text-md">
              Admin ID
            </Label>
            <Input
              id="adminId"
              name="adminId"
              value={formData.adminId}
              onChange={handleChange}
            />
          </div>
          {/* Email */}
          <div className="flex flex-col gap-1 w-[50%]">
            <Label htmlFor="email" className="text-md">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          {/* Role */}
          <div className="flex flex-col gap-1 w-[50%]">
            <Label htmlFor="role" className="text-md">
              Role
            </Label>
            <Select value={formData.role} onValueChange={handleRoleChange}>
              <SelectTrigger id="role" className="w-full">
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Admin">Admin</SelectItem>
                <SelectItem value="Super Admin">Super Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <div className="w-full flex flex-col gap-4 mb-6">
        <h3 className="text-lg font-medium text-100">Personal Information</h3>
        <div className="flex gap-4">
          <div className="flex flex-col gap-1 w-[50%]">
            <Label htmlFor="firstName" className="text-md">
              First Name
            </Label>
            <Input
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-1 w-[50%]">
            <Label htmlFor="middleName" className="text-md">
              Middle Name
            </Label>
            <Input
              id="middleName"
              name="middleName"
              value={formData.middleName}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-1 w-[50%]">
            <Label htmlFor="lastName" className="text-md">
              Last Name
            </Label>
            <Input
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-4 justify-end mt-6">
        <Button
          type="button"
          className="text-100 bg-white hover:bg-white shadow-none hover:text-100 cursor-pointer text-md border-none"
          onClick={handleCancel}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button
          type="button"
          className="bg-100 cursor-pointer text-md hover:bg-100 text-white"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? "Adding..." : "Add Admin"}
        </Button>
      </div>

      {/* Admin Table */}
      <div>
        <AdminTable searchQuery={""} />
      </div>

      {error && <p className="text-red-600 mt-2">{(error as Error).message}</p>}
    </div>
  );
}

export default AdminSettingForm;
