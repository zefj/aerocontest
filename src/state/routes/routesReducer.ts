import L from "leaflet";
import { v4 as uuidv4 } from 'uuid';
import { createSelector } from 'reselect';

import {
    AddRouteAction,
    ChangeRouteNameAction,
    RemoveRouteAction,
    RouteAnalysedAction,
    RouteParsedAction
} from './routesActions';
import { Route, RouteLayers, RoutesLayers } from '../../types/routes';
import { ApplicationState } from '../store';

const createRoute = (name: string, content: string): Route => {
    const layers = new L.FeatureGroup();
    const offtrackFragmentsLayer = new L.LayerGroup();
    const offtrackMarkersLayer = new L.FeatureGroup();

    offtrackFragmentsLayer.addTo(layers);
    offtrackMarkersLayer.addTo(layers);

    return {
        id: uuidv4(),
        name,
        content,
        analysis: null,
    };
};

const createLayers = (): RouteLayers => {
    const layers = new L.FeatureGroup();
    const offtrackFragmentsLayer = new L.LayerGroup();
    const offtrackMarkersLayer = new L.FeatureGroup();

    offtrackFragmentsLayer.addTo(layers);
    offtrackMarkersLayer.addTo(layers);

    return {
        gpx: null,
        layers,
        offtrackFragmentsLayer,
        offtrackMarkersLayer,
    };
};

type RoutesReducerActions = AddRouteAction | RemoveRouteAction | RouteParsedAction | RouteAnalysedAction | ChangeRouteNameAction;

const initialState: RoutesState = {
    entries: [],
    layers: {},
};

export interface RoutesState {
    entries: Route[],
    layers: RoutesLayers,
}

export const routesReducer = (
    state = initialState,
    action: RoutesReducerActions
): RoutesState => {
    switch (action.type) {
        case 'ADD_ROUTE':
            // TODO: handle duplicates?
            const route = createRoute(action.payload.name, action.payload.content);

            return {
                ...state,
                layers: {
                    ...state.layers,
                    [route.id]: createLayers(),
                },
                entries: [route, ...state.entries]
            };
        case 'REMOVE_ROUTE':
            const layers = {...state.layers};

            const routeLayers = layers[action.payload.id];
            routeLayers.layers.remove();
            delete layers[action.payload.id];

            return {
                ...state,
                layers,
                entries: state.entries.filter((route) => {
                    return route.id !== action.payload.id;


                })
            };
        case 'ROUTE_PARSED':
            return {
                ...state,
                layers: {
                    ...state.layers,
                    [action.payload.id]: {
                        ...state.layers[action.payload.id],
                        gpx: action.payload.gpx,
                    }
                },
            };
        case 'ROUTE_ANALYSED':
            return {
                ...state,
                entries: state.entries.map((route) => {
                    if (route.id !== action.payload.id) {
                        return route;
                    }

                    return {
                        ...route,
                        ...action.payload,
                    };
                })
            };
        case 'CHANGE_ROUTE_NAME':
            return {
                ...state,
                entries: state.entries.map((route) => {
                    if (route.id !== action.payload.id) {
                        return route;
                    }

                    return {
                        ...route,
                        name: action.payload.name,
                    };
                })
            };
        default:
            return state;
    }
};

export const getRoutes = (state: ApplicationState) => state.routes.entries;
export const getLayers = (state: ApplicationState) => state.routes.layers;
export const getLayersAsArray = createSelector(
    [getLayers],
    (layers: RoutesLayers) => {
        return Object.entries(layers).map(([key, value]) => {
            return { id: key, ...value };
        });
    }
);
