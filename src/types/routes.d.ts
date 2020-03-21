import { RouteAnalysis } from '../components/RouteAnalyser/RouteAnalyser';
import L from 'leaflet';

export type Route = {
    // RoutesContext
    name: string,
    content: string, // todo: reconsider this name
    gpx: GPX | null,
    // RouteAnalysisContext? Should this be further split into Layers context and Analysis context?
    analysis: RouteAnalysis | null,
    layers: L.FeatureGroup,
    offtrackFragmentsLayer: L.LayerGroup,
    offtrackMarkersLayer: L.FeatureGroup,
}

// TODO: split this into multiple contexts as seen above, to avoid issues with rerendering after analysis
export interface RoutesContext {
    routes: Route[],
    addRoute: (name: string, content: string) => void,
    removeRoute: (name: string) => void,
    routeParsed: (name: string, gpx: GPX) => void,
    routeAnalysed: (name: string, analysis: RouteAnalysis) => void,
    changeRouteName: (oldName: string, name: string) => void,
}

export type RouteAnalysis = {
    ontrackFragments: TrackFragments,
    offtrackFragments: TrackFragments,
};
