import { createContext, useCallback, useReducer } from 'react';
import L, { GPX } from "leaflet";
import { RouteAnalysis } from '../components/RouteAnalyser/RouteAnalyser';

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

export interface ChangeRouteName {
    type: 'CHANGE_ROUTE_NAME',
    payload: {
        oldName: string,
        name: string,
    }
}

type RoutesReducerActions = AddRouteAction | RemoveRouteAction | RouteParsedAction | RouteAnalysedAction | ChangeRouteName;

const createRoute = (name: string, content: string) => {
    const layers = new L.FeatureGroup();
    const offtrackFragmentsLayer = new L.LayerGroup();
    const offtrackMarkersLayer = new L.FeatureGroup();

    offtrackFragmentsLayer.addTo(layers);
    offtrackMarkersLayer.addTo(layers);

    return {
        name,
        content,
        analysis: null,
        gpx: null,
        layers,
        offtrackFragmentsLayer,
        offtrackMarkersLayer,
    };
};

const routesReducer = (state: Route[], action: RoutesReducerActions) => {
    switch (action.type) {
        case 'ADD_ROUTE':
            // prepend
            // TODO: handle duplicates?
            return [createRoute(action.payload.name, action.payload.content), ...state];
        case 'REMOVE_ROUTE':
            return state.filter((route) => {
                if (route.name !== action.payload) {
                    return true;
                }

                route.layers.remove();

                return false;
            });
        case 'ROUTE_PARSED':
            return state.map((route) => {
                if (route.name !== action.payload.name) {
                    return route;
                }

                return {
                    ...route,
                    ...action.payload,
                };
            });
        case 'ROUTE_ANALYSED':
            return state.map((route) => {
                if (route.name !== action.payload.name) {
                    return route;
                }

                return {
                    ...route,
                    ...action.payload,
                };
            });    
        case 'CHANGE_ROUTE_NAME':
            return state.map((route) => {
                if (route.name !== action.payload.oldName) {
                    return route;
                }

                return {
                    ...route,
                    name: action.payload.name,
                };
            });
        default:
            return state;
    }
};

export const useRoutesDataProvider = (): RoutesContext => {
    const [routes, dispatch] = useReducer(routesReducer, []);

    const addRoute = useCallback((name: string, content: string) => {
        dispatch({ type: 'ADD_ROUTE', payload: { name, content } });
    }, []);

    const removeRoute = useCallback((name: string) => {
        dispatch({ type: 'REMOVE_ROUTE', payload: name });
    }, []);

    const routeParsed = useCallback((name: string, gpx: GPX) => {
        dispatch({ type: 'ROUTE_PARSED', payload: { name, gpx } });
    }, []);

    const routeAnalysed = useCallback((name: string, analysis: RouteAnalysis) => {
        dispatch({ type: 'ROUTE_ANALYSED', payload: { name, analysis } });
    }, []);

    const changeRouteName = useCallback((oldName: string, name: string) => {
        dispatch({ type: 'CHANGE_ROUTE_NAME', payload: { oldName, name } });
    }, []);

    return {
        routes,
        addRoute,
        removeRoute,
        routeParsed,
        routeAnalysed,
        changeRouteName,
    };
};

export const routesContext = createContext<RoutesContext>({
    routes: [],
    addRoute: () => {},
    removeRoute: () => {},
    routeParsed: () => {},
    routeAnalysed: () => {},
    changeRouteName: () => {},
});
