import features from "@/data/features";
import PadLayout from "@/layouts/PadLayout";

function Features() {
  return (
    <PadLayout>
      <div className="bg-100 flex justify-center">
        <div className="text-white grid gap-10 py-12 w-[80%] sm:grid-cols-2 lg:grid-cols-4 md:w-[85%] lg:gap-16">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.label}
                className="flex flex-col gap-3 md:flex-row md:items-start md:gap-5"
              >
                <Icon className="size-11 md:size-16 md:self-center" />
                <div className="space-y-1 md:flex-1">
                  <p className="font-medium">{feature.label}</p>
                  <p className="font-light">{feature.info}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </PadLayout>
  );
}

export default Features;
