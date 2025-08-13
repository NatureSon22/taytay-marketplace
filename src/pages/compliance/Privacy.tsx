import CenterLayout from "@/layouts/CenterLayout";
import PadLayout from "@/layouts/PadLayout";
import { useGeneralInformation } from "@/hooks/useGeneralInformation";
import "@/text.css";

function Privacy() {
  const { data, isLoading, isError } = useGeneralInformation();

  if (isLoading) {
    return (
      <PadLayout>
        <CenterLayout>
          <p className="text-center">Loading Privacy Policy...</p>
        </CenterLayout>
      </PadLayout>
    );
  }

  if (isError || !data) {
    return (
      <PadLayout>
        <CenterLayout>
          <p className="text-center text-red-500">
            Error loading Privacy Policy
          </p>
        </CenterLayout>
      </PadLayout>
    );
  }

  return (
    <PadLayout>
      <CenterLayout>
        <div className="w-[80%] md:w-[75%] space-y-7 pb-7">
          <div
            className="space-y-5 prose max-w-none about-section"
            dangerouslySetInnerHTML={{ __html: data.privacypolicy }}
          />
        </div>
      </CenterLayout>
    </PadLayout>
  );
}

export default Privacy;
