import React from "react";
import { applyMiddleware, createStore, combineReducers } from "redux";
import { routesReducer, RoutesState } from "./routes/routesReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import { trackReducer, TrackState } from "./track/trackReducer";
import { RouteLayersContextType } from "../types/context";

export interface ApplicationState {
  routes: RoutesState;
  track: TrackState;
}

const rootReducer = combineReducers<ApplicationState>({
  routes: routesReducer,
  track: trackReducer,
});

export const configureStore = () => {
  const middlewares: never[] = [];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [middlewareEnhancer];
  const composedEnhancers = composeWithDevTools(...enhancers);

  return createStore(rootReducer, {}, composedEnhancers);
};

export const RouteLayersContext = React.createContext<RouteLayersContextType>({
  layers: {},
  setGpx: () => {},
});
