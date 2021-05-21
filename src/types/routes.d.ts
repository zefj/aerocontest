import L, { LatLng, Polyline } from 'leaflet';

export type Route = {
    id: string,
    name: string,
    content: string // todo: reconsider this name
}

export type RouteLayers = {
    gpx: GPX | null,
    markers: L.LayerGroup,
    layers: L.FeatureGroup,
    // TODO: probably no longer need separate layers for off- and ontrack fragments
    offtrackFragmentsLayer: L.LayerGroup,
    offtrackMarkersLayer: L.FeatureGroup,
    ontrackFragmentsLayer: L.LayerGroup,
    ontrackMarkersLayer: L.FeatureGroup,
}

export type RoutesLayers = {
    [id: string]: RouteLayers
}

export interface GPXLatLng extends LatLng {
    meta: {
        time: Date,
    }
}

export type RouteFragment = {
    id: string,
    type: 'ontrack' | 'offtrack',
    latLngs: GPXLatLng[]
};

export type RouteFragments = RouteFragment[];

export type RoutesAnalysis = {
    [id: string]:? RouteFragments
}

export type Selected = {
    id: string,
    analysis_id: string,
    ref: Polyline,
}