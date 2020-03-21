import { applyMiddleware, createStore, combineReducers } from 'redux';
import { routesReducer, RoutesState } from './routes/routesReducer';
import { composeWithDevTools } from 'redux-devtools-extension'

export interface ApplicationState {
    routes: RoutesState,
}

const rootReducer = combineReducers<ApplicationState>({
    routes: routesReducer
});

export const configureStore = () => {
    const middlewares: never[] = [];
    const middlewareEnhancer = applyMiddleware(...middlewares);

    const enhancers = [middlewareEnhancer];
    const composedEnhancers = composeWithDevTools(...enhancers);

    return createStore(rootReducer, {}, composedEnhancers);
};
