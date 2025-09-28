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
    <div className="grid place-items-center gap-10 px-4 sm:px-6 lg:px-10">
      {/* Transportation icons */}
      <div className="flex flex-row flex-wrap justify-center gap-4 sm:gap-6 lg:gap-12">
        {transportations.map((item, i) => (
          <div
            key={item.label}
            className={`flex flex-col items-center justify-center 
              size-24 sm:size-28 md:size-32 lg:size-36 
              rounded-full cursor-pointer transition hover:shadow-2xl
              ${i === transport
                ? "shadow-2xl border border-slate-300/50"
                : "shadow-xl border border-slate-200/50"
              }`}
            onClick={handleTransport(i)}
          >
            <div className="grid place-items-center h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12">
              <img
                src={item.img}
                alt={item.label}
                className={`object-contain ${
                  i === transportations.length - 1
                    ? "h-5 w-8 sm:h-6 sm:w-10 md:h-8 md:w-14"
                    : "h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10"
                }`}
              />
            </div>
            <p className="text-[0.7rem] sm:text-sm md:text-base font-medium text-center">
              {item.label}
            </p>
          </div>
        ))}
      </div>

      {/* Content box */}
      <div className="border border-slate-300 rounded-2xl py-6 px-4 sm:px-6 md:px-8 w-full md:w-[70%] lg:w-[55%] space-y-6">
        <div
          className="prose max-w-none contact text-sm sm:text-base"
          dangerouslySetInnerHTML={{ __html: contents[transport] }}
        />
      </div>
    </div>
  );
}

export default Transportation;
