import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function TypeSettingForm() {
  const [type, setType] = useState("");

  const handleCancel = () => {
    setType("");
  };

  return (
    <div className="max-w-full space-y-8">
      <div className="w-full flex flex-col gap-4 mb-6">
        <h3 className="text-lg font-medium text-100">Product Type</h3>
        <div className="flex gap-4">
          <div className="flex flex-col gap-1 w-[100%]">
            <Label htmlFor="category" className="text-md">Product Type Label</Label>
            <Input
              id="type"
              name="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
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
        >
          Add Product Type
        </Button>
      </div>
    </div>
  );
}

export default TypeSettingForm;