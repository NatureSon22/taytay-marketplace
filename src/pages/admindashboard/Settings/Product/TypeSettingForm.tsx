import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useCreateProductType } from "@/hooks/useProductTypes";
import { toast, Toaster } from "sonner";

function ProductTypeSettingForm() {
  const [formData, setFormData] = useState({ id: "PRD-", label: "" });
  const { mutate: createProductType, status } = useCreateProductType();

  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numericValue = e.target.value.replace(/\D/g, ""); // allow only numbers
    setFormData((prev) => ({ ...prev, id: `PRD-${numericValue}` }));
  };

  const handleLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, label: e.target.value }));
  };

  const handleCancel = () => {
    setFormData({ id: "PRD-", label: "" });
  };

  const handleSubmit = () => {
    if (!formData.id || !formData.label || formData.id === "PRD-") {
      toast.error("Both Type ID and Label are required.");
      return;
    }

    createProductType(formData, {
      onSuccess: () => {
        toast.success("The product type was successfully added.");
        setFormData({ id: "PRD-", label: "" });
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
        <h3 className="text-lg font-medium text-100">Product Type</h3>
        <div className="flex gap-4">
          {/* TYPE ID INPUT */}
          <div className="flex flex-col gap-1 w-full">
            <Label htmlFor="id" className="text-md">Type ID</Label>
            <div className="flex items-center border rounded-md pl-2">
              <span className="text-gray-500 select-none text-sm">PRD-</span>
              <input
                id="id"
                name="id"
                inputMode="numeric"
                pattern="[0-9]*"
                value={formData.id.replace(/^PRD-/, "")}
                onChange={handleIdChange}
                className="w-full outline-none border-none focus:ring-0  py-2 text-sm bg-transparent"
                placeholder="001"
              />
            </div>
          </div>

          {/* PRODUCT LABEL INPUT */}
          <div className="flex flex-col gap-1 w-full">
            <Label htmlFor="label" className="text-md">Product Type Label</Label>
            <input
              id="label"
              name="label"
              value={formData.label}
              onChange={handleLabelChange}
              className="w-full border rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-100"
              placeholder="Enter product type"
            />
          </div>
        </div>
      </div>

      {/* ACTION BUTTONS */}
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
          {status === "pending" ? "Adding..." : "Add Type"}
        </Button>
      </div>
    </div>
  );
}

export default ProductTypeSettingForm;
