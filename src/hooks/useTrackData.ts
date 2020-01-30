import { useState } from "react";
import { TrackContext } from "../state/trackContext";

export const useTrackData = (): TrackContext => {
    // TODO: track FeatureGroup should be created here!! 
    const [track, setTrack] = useState<L.FeatureGroup | null>(null);

    return {
        track,
        setTrack,
    };
};