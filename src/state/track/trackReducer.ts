import { LoadTrackAction } from './trackActions';
import { ApplicationState } from '../store';
import L from 'leaflet';

export interface TrackState {
    content: string,
    layer: L.FeatureGroup
}

const initialState: TrackState = {
    content: '',
    layer: new L.FeatureGroup(),
};

type TrackReducerActions = LoadTrackAction;

export const trackReducer = (state = initialState, action: TrackReducerActions): TrackState => {
    switch (action.type) {
        case 'LOAD_TRACK':
            return {
                ...state,
                content: action.payload.content,
            };
        default:
            return state;
    }
};

export const getTrack = (state: ApplicationState) => state.track;
