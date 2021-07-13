import { LoadTrackAction } from "./trackActions";
import { ApplicationState } from "../store";

export interface TrackState {
  content: string;
}

const initialState: TrackState = {
  content: "",
};

type TrackReducerActions = LoadTrackAction;

export const trackReducer = (
  state = initialState,
  action: TrackReducerActions
): TrackState => {
  switch (action.type) {
    case "LOAD_TRACK":
      return {
        ...state,
        content: action.payload.content,
      };
    default:
      return state;
  }
};

export const getTrack = (state: ApplicationState) => state.track;
