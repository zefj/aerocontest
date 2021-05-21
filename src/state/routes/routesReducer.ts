import L from "leaflet";
import { v4 as uuidv4 } from 'uuid';
import { createSelector } from 'reselect';

import {
    AddRouteAction,
    ChangeRouteNameAction,
    OverrideAnalysis,
    RemoveRouteAction,
    RouteAnalysedAction,
    RouteParsedAction,
    RoutesAnalysedAction,
    SelectPolylineAction
} from './routesActions';
import { Route, RouteFragments, RouteLayers, RoutesAnalysis, RoutesLayers, Selected } from '../../types/routes';
import { ApplicationState } from '../store';

const createRoute = (name: string, content: string): Route => {
    return {
        id: uuidv4(),
        name,
        content,
    };
};

const createLayers = (): RouteLayers => {
    const layers = new L.FeatureGroup();
    const markers = new L.LayerGroup();
    const offtrackFragmentsLayer = new L.LayerGroup();
    const offtrackMarkersLayer = new L.FeatureGroup();
    const ontrackFragmentsLayer = new L.LayerGroup();
    const ontrackMarkersLayer = new L.FeatureGroup();

    markers.addTo(layers);
    offtrackFragmentsLayer.addTo(layers);
    offtrackMarkersLayer.addTo(layers);
    ontrackFragmentsLayer.addTo(layers);
    ontrackMarkersLayer.addTo(layers);

    return {
        gpx: null,
        markers,
        layers,
        offtrackFragmentsLayer,
        offtrackMarkersLayer,
        ontrackFragmentsLayer,
        ontrackMarkersLayer,
    };
};

type RoutesReducerActions = AddRouteAction | RemoveRouteAction | RouteParsedAction | RouteAnalysedAction | RoutesAnalysedAction | ChangeRouteNameAction | SelectPolylineAction | OverrideAnalysis;

const initialState: RoutesState = {
    entries: [],
    layers: {},
    analysis: {},
    selected: undefined,
};

export interface RoutesState {
    entries: Route[],
    layers: RoutesLayers,
    analysis: RoutesAnalysis,
    selected: undefined | Selected,
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
        case 'ROUTES_ANALYSED':
            // this is a workaround for redux-dev-tools crashing because of the size of this payload.
            // TODO: figure out a better way or at least implement a debug flag
            Object.entries(action.payload.analyses).forEach(([_, analysis]) => {
                if (!analysis) {
                    return;
                }
    
                Object.entries(analysis).forEach(([_, fragment]) => {
                    // @ts-ignore
                    fragment.latLngs.toJSON = () => ({ hidden: 'to help redux devtools :)' });
                });
            });

            return {
                ...state,
                analysis: action.payload.analyses
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
        case 'SELECT_POLYLINE':
            if (!action.payload.id) {
                return {
                    ...state,
                    selected: undefined,
                }
            }

            return {
                ...state,
                selected: {
                    id: action.payload.id,
                    analysis_id: action.payload.analysisId,
                    ref: action.payload.ref,
                }
            };
        case 'OVERRIDE_ANALYSIS':
            return {
                ...state,
                analysis: {
                    ...state.analysis,
                    [action.payload.analysisId]: state.analysis[action.payload.analysisId]?.map((fragment) => {
                        if (fragment.id === action.payload.id) {
                            return {
                                ...fragment,
                                type: action.payload.type,
                            };
                        }

                        return fragment;
                    }) as RouteFragments
                }
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
export const getSelectedPolyline = (state: ApplicationState) => state.routes.selected;
export const findSelectedPolyline = createSelector(
    getRoutesAnalysis,
    state => state.routes.selected,
    (analyses, selected) => {
        if (!selected) {
            return undefined;
        }

        const values = Object.values(analyses);

        for (const analysis of values) {
            if (!analysis) {
                continue;
            }

            const selectedPolyline = analysis.find(polyline => polyline.id === selected.id);

            if (selectedPolyline) {
                return selectedPolyline;
            }
        }

        return undefined;
    }
);
