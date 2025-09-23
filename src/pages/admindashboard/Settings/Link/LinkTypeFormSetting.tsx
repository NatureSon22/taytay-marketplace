import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IoMdAdd } from "react-icons/io";
import { useCreateLink } from "@/hooks/useLinks";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { notifySuccess, notifyError } from "@/utils/toast";

function LinkTypeSettingForm() {
  const [id, setId] = useState("");
  const [label, setLabel] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const { mutate: createLink, isPending } = useCreateLink();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      setPreviewUrl(URL.createObjectURL(selected));
    }
  };

  const handleInputClick = () => {
    inputRef.current?.click();
  };

  const handleCancel = () => {
    setId("");
    setLabel("");
    setFile(null);
    setPreviewUrl(null);
  };

  const handleSubmit = () => {
    if (!id || !label) {
      notifyError("Validation Error", "Both ID and Label are required.");
      return;
    }

    const formData = new FormData();
    formData.append("id", id);
    formData.append("label", label);
    if (file) {
      formData.append("image", file);
    }

    createLink(formData, {
      onSuccess: () => {
        notifySuccess("Link Added", "The link type was successfully added.");
        handleCancel();
      },
      onError: (err: any) => {
        notifyError("Failed to Add", err?.message || "Something went wrong.");
      },
    });
  };

  return (
    <div className="max-w-full space-y-8">
      <div className="w-full flex flex-col gap-4 mb-6">
        <h3 className="text-lg font-medium text-100">Link Type</h3>
        <div className="flex gap-6">
          <div className="flex flex-col gap-1 w-[50%]">
            <Label htmlFor="link-id" className="text-md">Link ID</Label>
            <Input
              id="link-id"
              name="id"
              value={id}
              onChange={(e) => setId(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-1 w-[50%]">
            <Label htmlFor="link-label" className="text-md">Link Label</Label>
            <Input
              id="link-label"
              name="label"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex flex-col gap-2">
            <Label className="text-md">Upload Image</Label>
            <input
              type="file"
              accept="image/*"
              ref={inputRef}
              className="hidden"
              onChange={handleFileChange}
              required
            />
            <div
              className="grid w-[250px] h-[100px] cursor-pointer place-items-center rounded-md border border-dashed"
              onClick={handleInputClick}
              aria-label="Upload image"
            >
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Selected preview"
                  className="rounded-md object-cover w-full h-full"
                />
              ) : (
                <IoMdAdd className="text-[2rem] text-secondary-100/40" />
              )}
            </div>
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
          disabled={isPending}
        >
          {isPending ? "Adding..." : "Add Link"}
        </Button>
      </div>

      {/* Toast Container */}
      <ToastContainer hideProgressBar/>
    </div>
  );
}

export default LinkTypeSettingForm;
