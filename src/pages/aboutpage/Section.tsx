import CenterLayout from "@/layouts/CenterLayout";
import PadLayout from "@/layouts/PadLayout";
import { useGeneralInformation } from "@/hooks/useGeneralInformation";
import { Skeleton } from "@/components/ui/skeleton";
import "@/text.css";

function Section() {
  const { data, isLoading, isError } = useGeneralInformation();

  if (isLoading) {
    return (
      <PadLayout>
        <CenterLayout>
          <div className="w-[80%] space-y-4 pb-5">
            <Skeleton className="h-6 w-1/3 mx-auto" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/6" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/5" />
          </div>
        </CenterLayout>
      </PadLayout>
    );
  }

  if (isError || !data) {
    return (
      <PadLayout>
        <CenterLayout>
          <p className="text-center text-red-500">Error loading About Us</p>
        </CenterLayout>
      </PadLayout>
    );
  }

  return (
    <PadLayout>
      <CenterLayout>
        <div className="w-[80%] space-y-7 pb-5">
          <div
            className="space-y-5 prose max-w-none about-section"
            dangerouslySetInnerHTML={{ __html: data.about }}
          />
        </div>
      </CenterLayout>
    </PadLayout>
  );
}

export default Section;
