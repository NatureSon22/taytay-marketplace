import transportations from "@/data/transportation";
import { useState } from "react";

function Transportation() {
  const [transport, setTransport] = useState(0);

  const handleTransport = (mode: number) => () => {
    setTransport(mode);
  };

  return (
    <div className="grid place-items-center gap-16">
      <div className="flex flex-col items-center gap-8 md:flex-row lg:gap-16">
        {transportations.map((transportation, i) => {
          return (
            <div
              key={transportation.label}
              className={`flex flex-col items-center justify-center size-36 rounded-full cursor-pointer hover:shadow-2xl ${
                i == transport
                  ? "shadow-2xl border border-slate-300/50"
                  : "shadow-xl border border-slate-200/50"
              }`}
              onClick={handleTransport(i)}
            >
              <div className="size-12 grid place-items-center">
                <img
                  src={transportation.img}
                  alt={transportation.label}
                  className={`${
                    i == transportations.length - 1 ? "h-8 w-14" : ""
                  }`}
                />
              </div>

              <p className="text-[0.9rem] font-medium">
                {transportation.label}
              </p>
            </div>
          );
        })}
      </div>

      <div className="border border-slate-300 rounded-2xl py-8 px-8 md:w-[55%] space-y-6">
        {transport === 0 && (
          <div>
            <p className="font-bold text-xl mb-5">Via UV Express</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <span className="font-semibold">Where to Ride: </span>
                Look for UV Express terminals that have routes to Taytay or
                Angono. Common terminals are at Robinsons Galleria (Ortigas) and
                SM Megamall.
              </li>
              <li>
                <span className="font-semibold">Route: </span>
                Take a UV Express specifically bound for Taytay or Angono.
              </li>
              <li>
                <span className="font-semibold">Drop-Off Point: </span>
                Ask the driver to drop you off at Taytay New Market or Bagpi
                Garment Center.
              </li>
              <li>
                <span className="font-semibold">Estimated Fare: </span>
                ₱30–₱50 (can vary).
              </li>
              <li>
                <span className="font-semibold">Travel Time: </span>
                Approximately 30–45 minutes, but heavily dependent on traffic.
              </li>
            </ul>
          </div>
        )}

        {transport === 1 && (
          <div>
            <p className="font-bold text-xl mb-5">Via Jeepney</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <span className="font-semibold">Where to Ride: </span>
                Find jeepneys with signboards indicating routes to Taytay,
                Angono, or Binangonan. Common starting points include near{" "}
                <strong>SM Megamall/EDSA Crossing</strong> or from
                <strong> Cubao</strong>.
              </li>
              <li>
                <span className="font-semibold">Route: </span>
                The jeepney will typically follow Ortigas Avenue Extension
                toward Taytay.
              </li>
              <li>
                <span className="font-semibold">Drop-Off Point: </span>
                Inform the driver you want to get off near Taytay Tiangge.
              </li>
              <li>
                <span className="font-semibold">Estimated Fare: </span>
                ₱15–₱30 (can vary).
              </li>
              <li>
                <span className="font-semibold">Travel Time: </span>
                Expect 1 hour or more, depending on traffic.
              </li>
            </ul>
          </div>
        )}

        {transport === 2 && (
          <div>
            <p className="font-bold text-xl mb-5">Via MRT + Bus/Jeepney</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <span className="font-semibold">Step 1 (MRT): </span>
                Take MRT-3 to <strong>Shaw Blvd</strong> or{" "}
                <strong>Ortigas Station</strong>.
              </li>
              <li>
                <span className="font-semibold">Step 2 (Bus/Jeepney): </span>
                From Ortigas Ave., take G-Liner or RRCG buses to Taytay/Angono.
              </li>
              <li>
                <span className="font-semibold">Drop-Off Point: </span>
                Taytay New Market or Bagpi Garment Center.
              </li>
              <li>
                <span className="font-semibold">Estimated Fare: </span>
                ₱50–₱100 total (MRT + Bus).
              </li>
              <li>
                <span className="font-semibold">Travel Time: </span>
                Around 2–2.5 hours depending on connections.
              </li>
            </ul>
          </div>
        )}

        {transport === 3 && (
          <div>
            <p className="font-bold text-xl mb-5">Via UV Express + Bus</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <span className="font-semibold">Note: </span>
                This option combines UV Express to a hub, then bus to Taytay.
              </li>
              <li>
                <span className="font-semibold">Step 1 (UV Express): </span>
                Head to EDSA Central, Ortigas, or Cubao by UV.
              </li>
              <li>
                <span className="font-semibold">Step 2 (Bus): </span>
                Board G-Liner or RRCG to Taytay or Angono.
              </li>
              <li>
                <span className="font-semibold">Drop-Off Point: </span>
                Taytay New Market or Bagpi Garment Center.
              </li>
              <li>
                <span className="font-semibold">Estimated Fare: </span>
                Varies widely depending on origin.
              </li>
              <li>
                <span className="font-semibold">Travel Time: </span>
                Highly variable.
              </li>
            </ul>
          </div>
        )}

        {transport === 4 && (
          <div>
            <p className="font-bold text-xl mb-5">
              Via Ride-Hailing Apps (e.g., Grab)
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <span className="font-semibold">Where to Book: </span>
                Use Grab or other ride-hailing apps.
              </li>
              <li>
                <span className="font-semibold">Route: </span>
                App chooses fastest real-time route.
              </li>
              <li>
                <span className="font-semibold">Drop-Off Point: </span>
                Input “Taytay Tiangge” as destination.
              </li>
              <li>
                <span className="font-semibold">Estimated Fare: </span>
                ₱300–₱500+ depending on traffic and surge.
              </li>
              <li>
                <span className="font-semibold">Travel Time: </span>
                Around 52 minutes to 1.5 hours.
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Transportation;
