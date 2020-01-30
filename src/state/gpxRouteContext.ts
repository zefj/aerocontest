import { createContext } from "react";
import { GPX } from "leaflet";

export type GpxRouteData = string;

export interface GpxRouteContext {
    route: GPX | null,
    routeRaw: GpxRouteData | null,
    setRoute: (route: GPX) => void,
    setRouteRaw: (route: GpxRouteData) => void,
}

export const gpxRouteContext = createContext<GpxRouteContext>({
    route: null,
    routeRaw: null,
    setRoute: () => {},
    setRouteRaw: () => {},
});