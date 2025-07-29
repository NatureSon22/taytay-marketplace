import { useEffect } from "react";
import L from "leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import { useMap } from "react-leaflet";
import type { CityCoordinates } from "./Map";

L.Marker.prototype.options.icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
});

interface RoutingProps {
  sourceCity: CityCoordinates | null;
  destinationCity: CityCoordinates | null;
}

const Routing: React.FC<RoutingProps> = ({ sourceCity, destinationCity }) => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    if (sourceCity?.lat !== undefined && destinationCity?.lat !== undefined) {
      const routingControl = L.Routing.control({
        waypoints: [
          L.latLng(
            parseFloat(String(sourceCity.lat)),
            parseFloat(String(sourceCity.lng))
          ),
          L.latLng(
            parseFloat(String(destinationCity.lat)),
            parseFloat(String(destinationCity.lng))
          ),
        ],
        routeWhileDragging: true,
        lineOptions: {
          styles: [{ color: "#FF4C4C", weight: 4 }],
          extendToWaypoints: false,
          missingRouteTolerance: 0,
        },
        show: true,
        showAlternatives: true,
        addWaypoints: true,
        fitSelectedRoutes: true,
      }).addTo(map);

      return () => {
        map.removeControl(routingControl);
      };
    }
  }, [map, sourceCity, destinationCity]);

  return null;
};

export default Routing;
