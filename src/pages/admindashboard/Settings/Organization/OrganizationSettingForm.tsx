import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useCreateOrganization } from "@/hooks/useOrganizations";
import { toast, Toaster } from "sonner";

function OrganizationSettingForm() {
  const [formData, setFormData] = useState({ id: "ORG-", organizationName: "" });
  const { mutate: createOrganization, status } = useCreateOrganization();

  // Handle ID input (numbers only)
  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numericValue = e.target.value.replace(/\D/g, "");
    setFormData((prev) => ({ ...prev, id: `ORG-${numericValue}` }));
  };

  // Handle Organization Name input (auto-capitalize)
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const capitalized = value.charAt(0).toUpperCase() + value.slice(1);
    setFormData((prev) => ({ ...prev, organizationName: capitalized }));
  };

  const handleCancel = () => {
    setFormData({ id: "ORG-", organizationName: "" });
  };

  const handleSubmit = () => {
    if (!formData.id || !formData.organizationName || formData.id === "ORG-") {
      toast.error("Both fields are required.");
      return;
    }

    createOrganization(formData, {
      onSuccess: () => {
        toast.success("The organization was successfully added.");
        setFormData({ id: "ORG-", organizationName: "" });
      },
      onError: (err: any) => {
        toast.error(err?.message || "Something went wrong.");
      },
    });
  };

  return (
    <div className="max-w-full space-y-8">
      <Toaster position="top-right" />
      <div className="w-full flex flex-col gap-4 mb-6">
        <h3 className="text-lg font-medium text-100">Store Organization</h3>

        <div className="flex gap-4">
          {/* Organization ID */}
          <div className="flex flex-col gap-1 w-full">
            <Label htmlFor="id" className="text-md">
              Organization ID
            </Label>
            <div className="flex items-center border rounded-md pl-2">
              <span className="text-gray-500 select-none text-sm">ORG-</span>
              <input
                id="id"
                name="id"
                inputMode="numeric"
                pattern="[0-9]*"
                value={formData.id.replace(/^ORG-/, "")}
                onChange={handleIdChange}
                className="w-full outline-none border-none focus:ring-0 py-2 text-sm bg-transparent"
                placeholder="001"
              />
            </div>
          </div>

          {/* Organization Name */}
          <div className="flex flex-col gap-1 w-full">
            <Label htmlFor="organizationName" className="text-md">
              Organization Name
            </Label>
            <input
              id="organizationName"
              name="organizationName"
              value={formData.organizationName}
              onChange={handleNameChange}
              className="w-full border rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-100"
              placeholder="Enter organization name"
            />
          </div>
        </div>
      </div>

      <div className="flex gap-4 justify-end mt-6">
        <Button
          type="button"
          className="text-100 bg-white hover:bg-white shadow-none hover:text-100 cursor-pointer text-md border-none"
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button
          type="button"
          className="bg-100 cursor-pointer text-md hover:bg-100 text-white"
          onClick={handleSubmit}
          disabled={status === "pending"}
        >
          {status === "pending" ? "Adding..." : "Add Organization"}
        </Button>
      </div>
    </div>
  );
}

export default OrganizationSettingForm;
