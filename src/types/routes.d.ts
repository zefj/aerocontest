import { TrackFragments } from '../components/RouteAnalyser/RouteAnalyser';
import L from 'leaflet';

export type Route = {
    id: string,
    // RoutesContext
    name: string,
    content: string, // todo: reconsider this name
    // RouteAnalysisContext? Should this be further split into Layers context and Analysis context?
    analysis: RouteFragments | null,
}

export type RouteLayers = {
    gpx: GPX | null,
    markers: L.LayerGroup,
    layers: L.FeatureGroup,
    offtrackFragmentsLayer: L.LayerGroup,
    offtrackMarkersLayer: L.FeatureGroup,
}

export type RoutesLayers = {
    [id: string]: RouteLayers
}

export type RoutesAnalysis = {
    [id: string]: RouteFragments | undefined
}

// TODO: split this into multiple contexts as seen above, to avoid issues with rerendering after analysis
export interface RoutesContext {
    routes: Route[],
    addRoute: (name: string, content: string) => void,
    removeRoute: (name: string) => void,
    routeParsed: (name: string, gpx: GPX) => void,
    routeAnalysed: (name: string, analysis: RouteFragments) => void,
    changeRouteName: (oldName: string, name: string) => void,
}

export type RouteFragments = {
    ontrackFragments: TrackFragments,
    offtrackFragments: TrackFragments,
};
