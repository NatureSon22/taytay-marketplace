import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateCategory } from "@/hooks/useCategories";
import { toast, Toaster } from "sonner";

function CategorySettingForm() {
  const [formData, setFormData] = useState({ id: "", label: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCancel = () => {
    setFormData({ id: "", label: "" });
  };

  const { mutate: createCategory, status } = useCreateCategory();

  const handleSubmit = () => {
    if (!formData.id || !formData.label) {
      toast.error("Both ID and Label are required.");
      return;
    }

    createCategory(formData, {
      onSuccess: () => {
        toast.success("The product category was successfully added.");
        setFormData({ id: "", label: "" });
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
        <h3 className="text-lg font-medium text-100">Product Category</h3>
        <div className="flex gap-4">
          <div className="flex flex-col gap-1 w-full">
            <Label htmlFor="id" className="text-md">Category ID</Label>
            <Input
              id="id"
              name="id"
              value={formData.id}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-1 w-full">
            <Label htmlFor="label" className="text-md">Category Label</Label>
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
          {status === "pending" ? "Adding..." : "Add Category"}
        </Button>
      </div>
    </div>
  );
}

export default CategorySettingForm;
