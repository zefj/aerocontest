import { useState } from "react";
import { GpxRouteContext, GpxRouteData } from "../state/gpxRouteContext";
import { GPX } from "leaflet";

export const useGpxRouteData = (): GpxRouteContext => {
    const [routeRaw, setRouteRaw] = useState<GpxRouteData | null>(null);
    const [route, setRoute] = useState<GPX | null>(null);

    return {
        route,
        routeRaw,
        setRoute,
        setRouteRaw,
    };
};