import React, { useCallback, useContext, useEffect } from "react";
import { useLeaflet } from "react-leaflet";
import L, { LayerEvent } from "leaflet";

import { useDispatch } from "react-redux";
import { analyseRoutes } from "../../state/routes/routesActions";
import { RouteLayersContext } from "../../state/store";

const registerLeafletEventListeners = (
  map: L.Map | undefined,
  callback: () => void
) => {
  if (!map) {
    return;
  }

  console.log("Registering leaflet event listeners...");

  const eventHandler = (e: LayerEvent) => callback();

  // track.on('layeradd layerremove', (e: LayerEvent) => callback());
  map.on(L.Draw.Event.CREATED, eventHandler);
  map.on(L.Draw.Event.EDITED, eventHandler);
  map.on(L.Draw.Event.DELETED, eventHandler);
  map.on("TRACK_LOADED", eventHandler);

  return () => {
    // track.off('layeradd layerremove', eventHandler);
    map.off(L.Draw.Event.CREATED, eventHandler);
    map.off(L.Draw.Event.EDITED, eventHandler);
    map.off(L.Draw.Event.DELETED, eventHandler);
    map.off("TRACK_LOADED", eventHandler);
  };
};

// TODO: would it make sense if this worked on a single route passed via a prop?
// Upsides: nicer code, probably easier to manage
// Downsides: more event listeners
export const RouteAnalyser: React.FC = () => {
  const dispatch = useDispatch();

  const { map } = useLeaflet();
  const { layers, trackLayer } = useContext(RouteLayersContext);

  const runAnalysis = useCallback(() => {
    dispatch(analyseRoutes(layers, trackLayer));
  }, [layers, trackLayer]);

  useEffect(
    () => registerLeafletEventListeners(map, runAnalysis),
    [runAnalysis]
  );

  useEffect(() => {
    dispatch(analyseRoutes(layers, trackLayer));
  }, [runAnalysis]);

  return null;
};
