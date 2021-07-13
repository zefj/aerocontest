import L from "leaflet";
import { RoutesLayers } from "./routes";

export type RouteLayersContextType = {
  layers: RoutesLayers;
  trackLayer: L.FeatureGroup;
  setGpx: (id, gpx) => void;
};
