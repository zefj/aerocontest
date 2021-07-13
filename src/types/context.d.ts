import { RoutesLayers } from "./routes";

export type RouteLayersContextType = {
  layers: RoutesLayers;
  setGpx: (id, gpx) => void;
};
