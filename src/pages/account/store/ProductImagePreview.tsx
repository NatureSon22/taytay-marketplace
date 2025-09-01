import { cn } from "@/lib/utils";
import { X } from "lucide-react";

type ProductImagePreviewProps = {
  prevImageURL: string;
  isPreviewOpen: boolean;
  setIsPreviewOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ProductImagePreview({
  prevImageURL,
  isPreviewOpen,
  setIsPreviewOpen,
}: ProductImagePreviewProps) {
  const imageUrl =
    prevImageURL ||
    "https://placehold.co/1080x1080/4F46E5/FFFFFF?text=Preview+Image";

  return (
    <div
      className={cn(
        "fixed inset-0 z-20 overflow-hidden grid place-items-center px-4 md:px-10 bg-black/80 transition-opacity duration-300",
        isPreviewOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
    >
      <div className="absolute top-4 right-4 z-30 md:right-5 md:top-5 lg:right-7">
        <button
          type="button"
          className="text-white hover:text-gray-300 transition-colors cursor-pointer"
          onClick={() => setIsPreviewOpen(false)}
        >
          <X className="size-10 md:size-16" />
        </button>
      </div>

      <div className="relative flex flex-col items-center justify-center max-w-full max-h-[80vh] p-4 rounded-xl">
        <img
          className="w-auto h-auto max-w-full max-h-[70vh] object-contain rounded-md"
          src={imageUrl}
          alt="Product Preview"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://placehold.co/1080x1080/4F46E5/FFFFFF?text=Image+Not+Found";
          }}
        />
      </div>
    </div>
  );
}
