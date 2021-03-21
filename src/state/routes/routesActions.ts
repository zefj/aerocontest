import { GPX } from "leaflet";
import { RoutesAnalysis, RouteFragments } from '../../types/routes';

export interface AddRouteAction {
    type: 'ADD_ROUTE',
    payload: {
        name: string,
        content: string,
    },
}

export interface RemoveRouteAction {
    type: 'REMOVE_ROUTE',
    payload: { id: string },
}

export interface RouteParsedAction {
    type: 'ROUTE_PARSED',
    payload: {
        id: string,
        gpx: GPX,
    }
}

export interface RouteAnalysedAction {
    type: 'ROUTE_ANALYSED',
    payload: {
        id: string,
        analysis: RouteFragments,
    }
}

export interface RoutesAnalysedAction {
    type: 'ROUTES_ANALYSED',
    payload: {
        analyses: RoutesAnalysis,
    }
}

export interface ChangeRouteNameAction {
    type: 'CHANGE_ROUTE_NAME',
    payload: {
        id: string,
        name: string,
    }
}

export const addRoute = (name: string, content: string): AddRouteAction => ({
    type: 'ADD_ROUTE',
    payload: { name, content }
});

export const removeRoute = (id: string): RemoveRouteAction => ({
    type: 'REMOVE_ROUTE',
    payload: { id }
});

export const routeParsed = (id: string, gpx: GPX): RouteParsedAction => ({
    type: 'ROUTE_PARSED',
    payload: { id, gpx }
});

export const routeAnalysed = (id: string, analysis: RouteFragments): RouteAnalysedAction => ({
    type: 'ROUTE_ANALYSED',
    payload: { id, analysis }
});

export const routesAnalysed = (analyses: RoutesAnalysis): RoutesAnalysedAction => ({
    type: 'ROUTES_ANALYSED',
    payload: { analyses }
});

export const changeRouteName = (id: string, name: string): ChangeRouteNameAction => ({
    type: 'CHANGE_ROUTE_NAME',
    payload: { id, name }
});
