import CenterLayout from "@/layouts/CenterLayout";
import PadLayout from "@/layouts/PadLayout";

type SectionProps = {
  title: string;
  info: string[];
};

function Section({ title, info }: SectionProps) {
  return (
    <PadLayout>
      <CenterLayout>
        <div className="w-[80%] space-y-7 pb-5">
          <p className="text-center uppercase font-kenzoestic text-100 text-[2rem]">{title}</p>

          <div className="space-y-5">
            {info.map((el, i) => {
              return (
                <p key={i} className="text-justify text-[0.95rem]">
                  {el}
                </p>
              );
            })}
          </div>
        </div>
      </CenterLayout>
    </PadLayout>
  );
}

export default Section;
