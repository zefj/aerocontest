import React from "react";
import L from "leaflet";
import { applyMiddleware, createStore, combineReducers } from "redux";
import thunk from "redux-thunk";
import {
  routesReducer,
  RoutesReducerActions,
  RoutesState,
} from "./routes/routesReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  trackReducer,
  TrackReducerActions,
  TrackState,
} from "./track/trackReducer";
import { RouteLayersContextType } from "../types/context";

export interface ApplicationState {
  routes: RoutesState;
  track: TrackState;
}

export type Actions = TrackReducerActions | RoutesReducerActions;

const rootReducer = combineReducers<ApplicationState>({
  routes: routesReducer,
  track: trackReducer,
});

export const configureStore = () => {
  const middlewares = [thunk];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [middlewareEnhancer];
  const composedEnhancers = composeWithDevTools(...enhancers);

  return createStore(rootReducer, {}, composedEnhancers);
};

export const RouteLayersContext = React.createContext<RouteLayersContextType>({
  layers: {},
  trackLayer: new L.FeatureGroup(),
  setGpx: () => {},
});
