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
import { Route, RouteLayers, RoutesAnalysis, RoutesLayers } from '../../types/routes';
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
    const markers = new L.LayerGroup();
    const offtrackFragmentsLayer = new L.LayerGroup();
    const offtrackMarkersLayer = new L.FeatureGroup();

    markers.addTo(layers);
    offtrackFragmentsLayer.addTo(layers);
    offtrackMarkersLayer.addTo(layers);

    return {
        gpx: null,
        markers,
        layers,
        offtrackFragmentsLayer,
        offtrackMarkersLayer,
    };
};

type RoutesReducerActions = AddRouteAction | RemoveRouteAction | RouteParsedAction | RouteAnalysedAction | ChangeRouteNameAction;

const initialState: RoutesState = {
    entries: [],
    layers: {},
    analysis: {},
};

export interface RoutesState {
    entries: Route[],
    layers: RoutesLayers,
    analysis: RoutesAnalysis
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
                // analysis: {
                //     ...state.analysis,
                //     [route.id]: {},
                // },
                entries: [route, ...state.entries],
            };
        case 'REMOVE_ROUTE':
            const layers = {...state.layers};
            const analysis = {...state.analysis};

            const routeLayers = layers[action.payload.id];
            routeLayers.layers.remove();
            delete layers[action.payload.id];
            delete analysis[action.payload.id];

            return {
                ...state,
                layers,
                entries: state.entries.filter((route) => {
                    return route.id !== action.payload.id;
                }),
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
            // @ts-ignore
            // this is a workaround for redux-dev-tools crashing because of the size of this payload.
            // TODO: figure out a better way or at least implement a debug flag
            action.payload.analysis.toJSON = () => ({ hidden: 'to help redux devtools :)' });

            return {
                ...state,
                analysis: {
                    ...state.analysis,
                    [action.payload.id]: action.payload.analysis,
                }
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
export const getRoutesAnalysis = (state: ApplicationState) => state.routes.analysis;
export const getLayers = (state: ApplicationState) => state.routes.layers;
export const getLayersAsArray = createSelector(
    [getLayers],
    (layers: RoutesLayers) => {
        return Object.entries(layers).map(([key, value]) => {
            return { id: key, ...value };
        });
    }
);
