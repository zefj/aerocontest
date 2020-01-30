import { createContext } from "react";

export interface TrackContext {
    track: L.FeatureGroup | null,
    setTrack: (route: L.FeatureGroup) => void,
}

export const trackContext = createContext<TrackContext>({
    track: null,
    setTrack: () => {},
});