import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IoMdAdd } from "react-icons/io";

function LinkTypeSettingForm() {
  const [link, setLink] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleCancel = () => {
    setLink("");
    setImage(null);
    setPreviewUrl(null);
  };

  const handleInputClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  return (
    <div className="max-w-full space-y-8">
      <div className="w-full flex flex-col gap-4 mb-6">
        <h3 className="text-lg font-medium text-100">Link Type</h3>
        <div className="flex flex-col gap-1 w-[50%]">
            <Label htmlFor="link" className="text-md">Link Label</Label>
            <Input
              id="link"
              name="link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
        </div>
        <div className="flex gap-4">
          <div className="flex flex-col gap-2">
            <Label className="text-md">Upload Image</Label>
            <input
              type="file"
              accept="image/*"
              ref={inputRef}
              onChange={handleFileChange}
              className="hidden"
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
                className="rounded-md object-cover"
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
        >
          Add Link
        </Button>
      </div>
    </div>
  );
}

export default LinkTypeSettingForm;
