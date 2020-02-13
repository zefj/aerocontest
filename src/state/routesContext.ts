import { createContext, useCallback, useReducer } from 'react';
import L, { GPX } from "leaflet";

export type Route = {
    name: string,
    content: string, // todo: reconsider this name
    layers: L.FeatureGroup,
    gpx: GPX | null,
    offrouteFragmentsLayer: L.LayerGroup,
    offrouteMarkersLayer: L.FeatureGroup,
}

export interface RoutesContext {
    routes: Route[],
    addRoute: (name: string, content: string) => void,
    removeRoute: (name: string) => void,
    routeParsed: (name: string, gpx: GPX) => void,
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

type RoutesReducerActions = AddRouteAction | RemoveRouteAction | RouteParsedAction;

const createRoute = (name: string, content: string) => {
    const layers = new L.FeatureGroup();
    const offrouteFragmentsLayer = new L.LayerGroup();
    const offrouteMarkersLayer = new L.FeatureGroup();

    offrouteFragmentsLayer.addTo(layers);
    offrouteMarkersLayer.addTo(layers);

    return {
        name,
        content,
        gpx: null,
        layers,
        offrouteFragmentsLayer,
        offrouteMarkersLayer,
    };
};

const routesReducer = (state: Route[], action: RoutesReducerActions) => {
    switch (action.type) {
        case 'ADD_ROUTE':
            return [...state, createRoute(action.payload.name, action.payload.content)];
        case 'REMOVE_ROUTE':
            return state.filter((route) => route.name !== action.payload);
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

    return {
        routes,
        addRoute,
        removeRoute,
        routeParsed,
    };
};

export const routesContext = createContext<RoutesContext>({
    routes: [],
    addRoute: () => {},
    removeRoute: () => {},
    routeParsed: () => {},
});
