import CenterLayout from "@/layouts/CenterLayout";
import PadLayout from "@/layouts/PadLayout";
import Map from "./Map";
import Transportation from "./Transportation";

function Location() {
  return (
    <PadLayout>
      <CenterLayout>
        <div className="w-[80%] space-y-7 pb-5">
          <p className="text-center uppercase font-kenzoestic text-100 text-[2rem]">
            how to go taytay tiangge
          </p>
          <Map />
          <Transportation />
        </div>
      </CenterLayout>
    </PadLayout>
  );
}

export default Location;
