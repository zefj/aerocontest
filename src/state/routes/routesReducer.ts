import L from "leaflet";

import {
    AddRouteAction,
    ChangeRouteNameAction,
    RemoveRouteAction,
    RouteAnalysedAction,
    RouteParsedAction
} from './routesActions';
import { Route } from '../../types/routes';
import { ApplicationState } from '../store';

const createRoute = (name: string, content: string): Route => {
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

type RoutesReducerActions = AddRouteAction | RemoveRouteAction | RouteParsedAction | RouteAnalysedAction | ChangeRouteNameAction;

const initialState: RoutesState = [];

export type RoutesState = Route[];

export const routesReducer = (
    state = initialState,
    action: RoutesReducerActions
): RoutesState => {
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

export const getRoutes = (state: ApplicationState) => state.routes;
