import { GPX } from "leaflet";
import { RouteAnalysis } from '../../types/routes';

export interface AddRouteAction {
    type: 'ADD_ROUTE',
    payload: {
        name: string,
        content: string,
    },
}

export interface RemoveRouteAction {
    type: 'REMOVE_ROUTE',
    payload: string,
}

export interface RouteParsedAction {
    type: 'ROUTE_PARSED',
    payload: {
        name: string,
        gpx: GPX,
    }
}

export interface RouteAnalysedAction {
    type: 'ROUTE_ANALYSED',
    payload: {
        name: string,
        analysis: RouteAnalysis,
    }
}

export interface ChangeRouteNameAction {
    type: 'CHANGE_ROUTE_NAME',
    payload: {
        oldName: string,
        name: string,
    }
}

export const addRoute = (name: string, content: string): AddRouteAction => ({
    type: 'ADD_ROUTE',
    payload: { name, content }
});

export const removeRoute = (name: string): RemoveRouteAction => ({
    type: 'REMOVE_ROUTE',
    payload: name
});

export const routeParsed = (name: string, gpx: GPX): RouteParsedAction => ({
    type: 'ROUTE_PARSED',
    payload: { name, gpx }
});

export const routeAnalysed = (name: string, analysis: RouteAnalysis): RouteAnalysedAction => ({
    type: 'ROUTE_ANALYSED',
    payload: { name, analysis }
});

export const changeRouteName = (oldName: string, name: string): ChangeRouteNameAction => ({
    type: 'CHANGE_ROUTE_NAME',
    payload: { oldName, name }
});
