import Jeepney from "@/assets/Jeepney.png";
import Train from "@/assets/Train.png";
import Van from "@/assets/Van.png";
import Grab from "@/assets/Grab-Logo 1.png";

type Transportation = {
  img: string;
  label: string;
};

const transportations: Transportation[] = [
  {
    img: Van,
    label: "UV Express",
  },
  {
    img: Jeepney,
    label: "Jeepney",
  },
  {
    img: Train,
    label: "MRT",
  },
  {
    img: Grab,
    label: "Booking Apps",
  },
];

export default transportations;
