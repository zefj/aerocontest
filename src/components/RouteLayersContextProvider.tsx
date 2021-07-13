import React, { ReactNode, useEffect, useState } from "react";
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
  };
};

export const RouteLayersContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [context, setContext] = useState<RouteLayersContextType>({});
  const routes = useSelector(getRoutes);

  useEffect(() => {
    let shouldUpdate = false;
    const newContext = {
      ...context,
    };

    Object.entries(routes).forEach(([_key, route]) => {
      if (context[route.id]) {
        return;
      }

      shouldUpdate = true;
      newContext[route.id] = createLayers();
    });

    if (!shouldUpdate) {
      return;
    }

    setContext(newContext);
  }, [routes]);

  return (
    <RouteLayersContext.Provider value={context}>
      {children}
    </RouteLayersContext.Provider>
  );
};
