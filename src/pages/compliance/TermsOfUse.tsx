import CenterLayout from "@/layouts/CenterLayout";
import PadLayout from "@/layouts/PadLayout";
import { useGeneralInformation } from "@/hooks/useGeneralInformation";
import "@/text.css";

function TermsOfUse() {
  const { data, isLoading, isError } = useGeneralInformation();

  if (isLoading) {
    return (
      <PadLayout>
        <CenterLayout>
          <p className="text-center">Loading Terms & Conditions...</p>
        </CenterLayout>
      </PadLayout>
    );
  }

  if (isError || !data) {
    return (
      <PadLayout>
        <CenterLayout>
          <p className="text-center text-red-500">
            Error loading Terms & Conditions
          </p>
        </CenterLayout>
      </PadLayout>
    );
  }

  return (
    <PadLayout>
      <CenterLayout>
        <div className="w-[75%] space-y-7">
          <div
            className="space-y-5 prose max-w-none about-section"
            dangerouslySetInnerHTML={{ __html: data.termsandcondition }}
          />
        </div>
      </CenterLayout>
    </PadLayout>
  );
}

export default TermsOfUse;
