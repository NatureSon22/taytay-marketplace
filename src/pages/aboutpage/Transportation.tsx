import { useState } from "react";
import transportations from "@/data/transportation";
import { useGeneralInformation } from "@/hooks/useGeneralInformation";
import "@/text.css";

function Transportation() {
  const [transport, setTransport] = useState(0);
  const { data, isLoading, isError } = useGeneralInformation();

  const handleTransport = (mode: number) => () => {
    setTransport(mode);
  };

  if (isLoading) {
    return <p className="text-center">Loading transportation info...</p>;
  }

  if (isError || !data) {
    return (
      <p className="text-center text-red-500">
        Error loading transportation info.
      </p>
    );
  }

  const contents = [
    data.uvexpress,
    data.jeepney,
    data.mrt,
    data.uvandbus,
    data.ridehailingapps,
  ];

  return (
    <div className="grid place-items-center gap-16">
      <div className="flex flex-col items-center gap-8 md:flex-row lg:gap-16">
        {transportations.map((item, i) => (
          <div
            key={item.label}
            className={`flex flex-col items-center justify-center size-36 rounded-full cursor-pointer hover:shadow-2xl ${
              i === transport
                ? "shadow-2xl border border-slate-300/50"
                : "shadow-xl border border-slate-200/50"
            }`}
            onClick={handleTransport(i)}
          >
            <div className="size-12 grid place-items-center">
              <img
                src={item.img}
                alt={item.label}
                className={`${
                  i === transportations.length - 1 ? "h-8 w-14" : ""
                }`}
              />
            </div>
            <p className="text-[0.9rem] font-medium">{item.label}</p>
          </div>
        ))}
      </div>

      <div className="border border-slate-300 rounded-2xl py-8 px-8 md:w-[55%] space-y-6">
        <div
          className="prose max-w-none contact"
          dangerouslySetInnerHTML={{ __html: contents[transport] }}
        />
      </div>
    </div>
  );
}

export default Transportation;
