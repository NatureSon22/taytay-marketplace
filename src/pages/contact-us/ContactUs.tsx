import CenterLayout from "@/layouts/CenterLayout";
import PadLayout from "@/layouts/PadLayout";
import { useGeneralInformation } from "@/hooks/useGeneralInformation";
import "./contact.css";

function ContactUs() {
  const { data, isLoading, isError } = useGeneralInformation();

  if (isLoading) {
    return (
      <PadLayout>
        <CenterLayout>
          <p className="text-center">Loading Contact Us...</p>
        </CenterLayout>
      </PadLayout>
    );
  }

  if (isError || !data) {
    return (
      <PadLayout>
        <CenterLayout>
          <p className="text-center text-red-500">
            Error loading Contact Us
          </p>
        </CenterLayout>
      </PadLayout>
    );
  }

  return (
    <PadLayout>
      <CenterLayout>
        <div className="space-y-10 w-[80%] max-w-[550px] py-14 md:py-20 lg:pt-14 lg:pb-32 xl:pb-40">
        <h1 className="text-center uppercase font-kenzoestic text-[2rem] text-100">
          Contact Us
        </h1>
          <div
            className="border border-slate-300 rounded-2xl py-8 px-6 sm:px-12 space-y-6 contact" 
            dangerouslySetInnerHTML={{ __html: data.contactinfo }}
          />
        </div>
      </CenterLayout>
    </PadLayout>
  );
}

export default ContactUs;
