import React, { useContext, useEffect } from "react";
import { useLeaflet } from "react-leaflet";

import L, { GPXOptions } from "leaflet";
import "leaflet-gpx";

import pinIconStart from "leaflet-gpx/pin-icon-start.png";
import pinIconEnd from "leaflet-gpx/pin-icon-end.png";
import pinShadow from "leaflet-gpx/pin-shadow.png";
import { ROUTE_LINE_STYLE_BASE } from "./leafletElementStyles";
import { useDispatch, useSelector } from "react-redux";
import { addRoute, routeParsed } from "../state/routes/routesActions";
import { Route, Routes, RoutesLayers } from "../types/routes";
import { getRoutes } from "../state/routes/routesReducer";
import { RouteLayersContext } from "../state/store";

const route1content = require("../test-data/9_maj_2020_19_06_55_1589052909021.gpx");

/**
 * ts-ignore's because the modules released on npm are outdated
 */
const options: GPXOptions = {
  gpx_options: {
    // @ts-ignore
    joinTrackSegments: true,
  },
  marker_options: {
    // @ts-ignore
    startIconUrl: pinIconStart,
    endIconUrl: pinIconEnd,
    shadowUrl: pinShadow,
  },
  polyline_options: ROUTE_LINE_STYLE_BASE,
};

// TODO: consider moving to utils if needed elsewhere
const composeBounds = (routes: Routes, layers: RoutesLayers) => {
  const routesArray = Object.values(routes);

  return routesArray.reduce((carry: L.LatLngBounds | null, route: Route) => {
    const routeLayers = layers[route.id];

    if (!routeLayers || !routeLayers.gpx) {
      return carry;
    }

    if (carry) {
      return carry.extend(routeLayers.gpx.getBounds());
    }

    return routeLayers.gpx.getBounds();
  }, null);
};

export const GpxLoader: React.FC = () => {
  const { map } = useLeaflet();

  const routes = useSelector(getRoutes);
  const { layers, setGpx } = useContext(RouteLayersContext);
  const dispatch = useDispatch();

  useEffect(() => {
    if (process.env.REACT_APP_EXAMPLE_DATA === "true") {
      dispatch(
        addRoute("9_maj_2020_19_06_55_1589052909021.gpx", route1content)
      );
    }
  }, [dispatch]);

  useEffect(() => {
    if (!map) {
      return;
    }

    if (!routes) {
      return;
    }

    Object.entries(routes).forEach(([_key, route]) => {
      const routeLayers = layers[route.id];

      if (!routeLayers || routeLayers.gpx) {
        return;
      }

      const gpx = new L.GPX(route.content, options);
      setGpx(route.id, gpx);
      dispatch(routeParsed(route.id));

      // TODO: only temporarily, move this out of here
      // const polylineLayer = getPolylineLayer(gpx);

      // if (polylineLayer) {
      //     polylineLayer.getLatLngs().forEach((latLng: LatLng | LatLng[] | LatLng[][]) => {
      //         // @ts-ignore
      //         L.circleMarker(latLng, { weight: 1, renderer: markerCanvasRenderer }).addTo(map);
      //     });
      // }

      gpx.addTo(routeLayers.layers);
      routeLayers.layers.addTo(map);
    });

    Object.entries(layers).forEach(([id, layer]) => {
      if (routes[id]) {
        return;
      }

      // Remove routes no longer present in state from the map
      layer.layers.remove();
    });
  }, [map, routes, layers, setGpx, dispatch]);

  useEffect(() => {
    if (!map) {
      return;
    }

    // This is probably only temporary so I don't have to pan the map on each refresh
    const bounds = composeBounds(routes, layers);

    if (bounds) {
      map.fitBounds(bounds);
    }
  }, [layers, map, routes]);

  return null;
};
