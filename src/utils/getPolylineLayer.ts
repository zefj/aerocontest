import L, { GPX } from 'leaflet';

export const getPolylineLayer = (route: GPX): L.Polyline | null => {
    // Types seem to be incorrect, route.getLayers()[0] is instanceof L.FeatureGroup
    const layers = (route.getLayers()[0] as L.FeatureGroup).getLayers();

    for (let layer of layers) {
        if (!(layer instanceof L.Polyline)) {
            continue;
        }

        return layer;
    }

    return null;
};
