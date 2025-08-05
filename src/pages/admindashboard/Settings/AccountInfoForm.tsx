import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";

function AccountInfoForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const togglePassword = (field: "current" | "new" | "confirm") => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCancel = () => {
    setFormData({
      firstName: "",
      middleName: "",
      lastName: "",
      email: "",
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    });
  };

  const handleSave = () => {
    console.log("Saving account info:", formData);
  };

  const renderPasswordInput = (
    id: string,
    name: keyof typeof formData,
    label: string,
    show: boolean,
    toggle: () => void
  ) => (
    <div className="relative">
      <Label htmlFor={id} className="text-md pb-2">
        {label}
      </Label>
      <Input
        id={id}
        name={name}
        value={formData[name]}
        onChange={handleChange}
        type={show ? "text" : "password"}
        className="pr-10"
      />
      <button
        type="button"
        onClick={toggle}
        className="absolute top-10 right-3 flex items-center text-gray-500 hover:text-gray-800"
      >
        {show ? <Eye size={18} /> : <EyeOff size={18} />}
      </button>
    </div>
  );

  return (
    <form className="flex flex-col gap-8">
      <div>
        <h2 className="text-lg text-100 font-semibold mb-4">Personal Information</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName" className="text-md pb-2">
              First Name
            </Label>
            <Input
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Kenneth"
            />
          </div>
          <div>
            <Label htmlFor="middleName" className="text-md pb-2">
              Middle Name
            </Label>
            <Input
              id="middleName"
              name="middleName"
              value={formData.middleName}
              onChange={handleChange}
              placeholder="Jaucian"
            />
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="lastName" className="text-md pb-2">
              Last Name
            </Label>
            <Input
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="San Pedro"
            />
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-lg text-100 font-semibold mb-4">Account Information</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="email" className="text-md pb-2">
              Email Address
            </Label>
            <Input
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@example.com"
              type="email"
            />
          </div>

          {renderPasswordInput(
            "newPassword",
            "newPassword",
            "New Password",
            showPassword.new,
            () => togglePassword("new")
          )}

          {renderPasswordInput(
            "currentPassword",
            "currentPassword",
            "Current Password",
            showPassword.current,
            () => togglePassword("current")
          )}

          {renderPasswordInput(
            "confirmNewPassword",
            "confirmNewPassword",
            "Confirm New Password",
            showPassword.confirm,
            () => togglePassword("confirm")
          )}
        </div>
      </div>

      <div className="flex justify-end gap-3 mt-4">
        <Button
          className="text-100 bg-white hover:bg-white shadow-none hover:text-100 cursor-pointer text-md border-none"
          onClick={handleCancel}
          type="button"
        >
          Cancel
        </Button>
        <Button
          className="bg-100 cursor-pointer text-md hover:bg-100 text-white"
          onClick={handleSave}
          type="button"
        >
          Save Changes
        </Button>
      </div>
    </form>
  );
}

export default AccountInfoForm;
