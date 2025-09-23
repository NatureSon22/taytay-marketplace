import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateProductType } from "@/hooks/useProductTypes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { notifySuccess, notifyError } from "@/utils/toast";

function ProductTypeSettingForm() {
  const [formData, setFormData] = useState({ id: "", label: "" });
  const { mutate: createProductType, status } = useCreateProductType();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCancel = () => {
    setFormData({ id: "", label: "" });
  };

  const handleSubmit = () => {
    if (!formData.id || !formData.label) {
      notifyError("Validation Error", "Both Type ID and Label are required.");
      return;
    }

    createProductType(formData, {
      onSuccess: () => {
        notifySuccess("Product Type Added", "The product type was successfully added.");
        setFormData({ id: "", label: "" });
      },
      onError: (err: any) => {
        notifyError("Failed to Add", err?.message || "Something went wrong.");
      },
    });
  };

  return (
    <div className="max-w-full space-y-8">
      <div className="w-full flex flex-col gap-4 mb-6">
        <h3 className="text-lg font-medium text-100">Product Type</h3>
        <div className="flex gap-4">
          <div className="flex flex-col gap-1 w-full">
            <Label htmlFor="id" className="text-md">Type ID</Label>
            <Input
              id="id"
              name="id"
              value={formData.id}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-1 w-full">
            <Label htmlFor="label" className="text-md">Product Type Label</Label>
            <Input
              id="label"
              name="label"
              value={formData.label}
              onChange={handleChange}
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
          {status === "pending" ? "Adding..." : "Add Type"}
        </Button>
      </div>

      {/* Toast Container */}
      <ToastContainer hideProgressBar/>
    </div>
  );
}

export default ProductTypeSettingForm;
