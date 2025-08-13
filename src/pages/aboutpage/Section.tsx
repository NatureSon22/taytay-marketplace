import CenterLayout from "@/layouts/CenterLayout";
import PadLayout from "@/layouts/PadLayout";
import { useGeneralInformation } from "@/hooks/useGeneralInformation";
import "@/text.css";

function Section() {
  const { data, isLoading, isError } = useGeneralInformation();

  if (isLoading) {
    return (
      <PadLayout>
        <CenterLayout>
          <p className="text-center">Loading About Us...</p>
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
