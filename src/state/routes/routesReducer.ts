import { v4 as uuidv4 } from "uuid";
import { createSelector } from "reselect";

import {
  AddRouteAction,
  ChangeRouteNameAction,
  OverrideAnalysis,
  RemoveRouteAction,
  RouteAnalysedAction,
  RouteParsedAction,
  RoutesAnalysedAction,
  SelectPolylineAction,
} from "./routesActions";
import {
  Route,
  RouteFragments,
  Routes,
  RoutesAnalysis,
  Selected,
} from "../../types/routes";
import { ApplicationState } from "../store";

const createRoute = (name: string, content: string): Route => {
  return {
    id: uuidv4(),
    name,
    content,
  };
};

export type RoutesReducerActions =
  | AddRouteAction
  | RemoveRouteAction
  | RouteParsedAction
  | RouteAnalysedAction
  | RoutesAnalysedAction
  | ChangeRouteNameAction
  | SelectPolylineAction
  | OverrideAnalysis;

const initialState: RoutesState = {
  entries: {},
  analysis: {},
  selected: null,
};

export interface RoutesState {
  entries: Routes;
  analysis: RoutesAnalysis;
  selected: null | Selected;
}

export const routesReducer = (
  state = initialState,
  action: RoutesReducerActions
): RoutesState => {
  switch (action.type) {
    case "ADD_ROUTE":
      // TODO: handle duplicates?
      const route = createRoute(action.payload.name, action.payload.content);

      return {
        ...state,
        entries: {
          ...state.entries,
          [route.id]: route,
        },
      };
    case "REMOVE_ROUTE":
      // Drop key from entries and analysis
      const { [action.payload.id]: _drop1, ...entries } = state.entries;
      const { [action.payload.id]: _drop2, ...analysis } = state.analysis;

      return {
        ...state,
        entries,
        analysis,
      };
    case "ROUTE_PARSED":
      return {
        ...state,
        entries: {
          ...state.entries,
          [action.payload.id]: {
            ...state.entries[action.payload.id],
          },
        },
      };
    // TODO: this is unused apparently
    case "ROUTE_ANALYSED":
      // @ts-ignore
      // this is a workaround for redux-dev-tools crashing because of the size of this payload.
      // TODO: figure out a better way or at least implement a debug flag
      // action.payload.analysis.toJSON = () => ({ hidden: 'to help redux devtools :)' });

      return {
        ...state,
        analysis: {
          ...state.analysis,
          [action.payload.id]: action.payload.analysis,
        },
      };
    case "ROUTES_ANALYSED":
      // this is a workaround for redux-dev-tools crashing because of the size of this payload.
      // TODO: figure out a better way or at least implement a debug flag
      // Object.entries(action.payload.analyses).forEach(([_, analysis]) => {
      //     if (!analysis) {
      //         return;
      //     }

      //     Object.entries(analysis).forEach(([_, fragment]) => {
      //         // @ts-ignore
      //         fragment.latLngs.toJSON = () => ({ hidden: 'to help redux devtools :)' });
      //     });
      // });

      return {
        ...state,
        analysis: action.payload.analyses,
        selected: null,
      };
    case "CHANGE_ROUTE_NAME":
      return {
        ...state,
        entries: {
          ...state.entries,
          [action.payload.id]: {
            ...state.entries[action.payload.id],
            name: action.payload.name,
          },
        },
      };
    case "SELECT_POLYLINE":
      if (!action.payload.id) {
        return {
          ...state,
          selected: null,
        };
      }

      return {
        ...state,
        selected: {
          id: action.payload.id,
          analysis_id: action.payload.analysisId,
        },
      };
    case "OVERRIDE_ANALYSIS":
      return {
        ...state,
        analysis: {
          ...state.analysis,
          [action.payload.analysisId]: state.analysis[
            action.payload.analysisId
          ]?.map((fragment) => {
            if (fragment.id === action.payload.id) {
              return {
                ...fragment,
                type: action.payload.type,
              };
            }

            return fragment;
          }) as RouteFragments,
        },
      };
    default:
      return state;
  }
};

export const getRoutes = (state: ApplicationState) => state.routes.entries;
export const getRoutesAnalysis = (state: ApplicationState) =>
  state.routes.analysis;
export const getSelectedPolyline = (state: ApplicationState) =>
  state.routes.selected;
export const findSelectedPolyline = createSelector(
  getRoutesAnalysis,
  (state) => state.routes.selected,
  (analyses, selected) => {
    if (!selected) {
      return undefined;
    }

    const values = Object.values(analyses);

    for (const analysis of values) {
      if (!analysis) {
        continue;
      }

      const selectedPolyline = analysis.find(
        (polyline) => polyline.id === selected.id
      );

      if (selectedPolyline) {
        return selectedPolyline;
      }
    }

    return undefined;
  }
);
