import React, { ReactNode, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import L from "leaflet";
import { RouteLayers } from "../types/routes";
import { getRoutes } from "../state/routes/routesReducer";
import { RouteLayersContextType } from "../types/context";
import { RouteLayersContext } from "../state/store";

const createLayers = (): RouteLayers => {
  const layers = new L.FeatureGroup();
  const markers = new L.LayerGroup();
  const offtrackFragmentsLayer = new L.LayerGroup();
  const offtrackMarkersLayer = new L.FeatureGroup();
  const ontrackFragmentsLayer = new L.LayerGroup();
  const ontrackMarkersLayer = new L.FeatureGroup();

  markers.addTo(layers);
  offtrackFragmentsLayer.addTo(layers);
  offtrackMarkersLayer.addTo(layers);
  ontrackFragmentsLayer.addTo(layers);
  ontrackMarkersLayer.addTo(layers);

  return {
    markers,
    layers,
    offtrackFragmentsLayer,
    offtrackMarkersLayer,
    ontrackFragmentsLayer,
    ontrackMarkersLayer,
    gpx: null,
  };
};

const emptyTrackLayer = new L.FeatureGroup();

export const RouteLayersContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [{ layers, trackLayer }, setContext] = useState<RouteLayersContextType>(
    {
      layers: {},
      trackLayer: emptyTrackLayer,
      setGpx: () => {},
    }
  );

  const setGpx = useCallback(
    (id, gpx) => {
      const newLayers = {
        ...layers,
      };

      if (!layers[id]) {
        return;
      }

      newLayers[id].gpx = gpx;

      setContext({ layers: newLayers, trackLayer, setGpx });
    },
    [layers]
  );

  const routes = useSelector(getRoutes);

  useEffect(() => {
    let shouldUpdate = false;
    const newLayers = {
      ...layers,
    };

    Object.entries(routes).forEach(([_key, route]) => {
      if (layers[route.id]) {
        return;
      }

      shouldUpdate = true;
      newLayers[route.id] = createLayers();
    });

    if (!shouldUpdate) {
      return;
    }

    setContext({ layers: newLayers, trackLayer, setGpx });
  }, [routes]);

  return (
    <RouteLayersContext.Provider value={{ layers, trackLayer, setGpx }}>
      {children}
    </RouteLayersContext.Provider>
  );
};
