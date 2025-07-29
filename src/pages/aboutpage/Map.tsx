import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import Routing from "./Routing";

export type CityCoordinates = {
  lat: number;
  lng: number;
};

const TAYTAY_COORDINATES: CityCoordinates = { lat: 14.5573, lng: 121.1364 };

function Map() {
  const [position, setPosition] = useState<CityCoordinates | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setPosition(TAYTAY_COORDINATES);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const {
          coords: { latitude, longitude },
        } = position;
        setPosition({ lat: latitude, lng: longitude });
      },
      () => {
        setPosition(TAYTAY_COORDINATES);
      }
    );
  }, []);

  return (
    <div className="pb-4 space-y-2">
      <MapContainer
        className="h-[530px] w-[100%] z-[10] outline-none"
        zoom={13}
        scrollWheelZoom={false}
        bounds={
          position
            ? [
                [position.lat, position.lng],
                [TAYTAY_COORDINATES.lat, TAYTAY_COORDINATES.lng],
              ]
            : [
                [TAYTAY_COORDINATES.lat, TAYTAY_COORDINATES.lng],
                [TAYTAY_COORDINATES.lat, TAYTAY_COORDINATES.lng],
              ]
        }
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Routing sourceCity={position} destinationCity={TAYTAY_COORDINATES} />
      </MapContainer>

      <p className="text-center text-[0.92rem] italic text-slate-600">
        Please note: This route is for suggestion purposes only and may not
        represent the exact path to Taytay.
      </p>
    </div>
  );
}

export default Map;
