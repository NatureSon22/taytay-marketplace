import CenterLayout from "@/layouts/CenterLayout";
import PadLayout from "@/layouts/PadLayout";

function ContactUs() {
  return (
    <PadLayout>
      <CenterLayout>
        <div className="space-y-10 w-[80%] max-w-[550px] py-14 md:py-20 lg:pt-14 lg:pb-32 xl:pb-40">
          <h1 className="text-center uppercase font-kenzoestic text-[2rem] text-100">
            Contact Us
          </h1>

          <section className="border border-slate-300 rounded-2xl py-8 px-6 sm:px-12 space-y-6">
            <p>For any inquiries or assistance, please reach out to us:</p>

            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong className="pr-2">Email:</strong>
                <span className="text-100">support@e-tiangge.ph</span>
              </li>
              <li>
                <strong className="pr-2">Phone:</strong>
                <span className="text-100">+63 912 345 6789</span>
              </li>
            </ul>

            <p>Our team is here to help during business hours.</p>
          </section>
        </div>
      </CenterLayout>
    </PadLayout>
  );
}

export default ContactUs;
