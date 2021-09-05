import { useCallback, useContext, useEffect } from "react";
import L from "leaflet";

import { useLeaflet } from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";
import {
  getRoutes,
  getRoutesAnalysis,
  getSelectedPolyline,
} from "../../state/routes/routesReducer";
import {
  RouteLayers,
  RouteFragments,
  Selected,
  RouteFragment,
} from "../../types/routes";
import { getPolylineLayer } from "../../utils/getPolylineLayer";
import {
  ROUTE_LINE_HOVER,
  ROUTE_LINE_STYLE_BASE,
  ROUTE_LINE_STYLE_OFFTRACK,
  ROUTE_LINE_STYLE_ONTRACK,
  ROUTE_LINE_STYLE_UNKNOWN,
} from "../leafletElementStyles";
import { selectPolyline as selectPolylineAction } from "../../state/routes/routesActions";
import { RouteLayersContext } from "../../state/store";

const getRouteLineStyle = (type: RouteFragment["type"]) => {
  switch (type) {
    case "ontrack":
      return ROUTE_LINE_STYLE_ONTRACK;
    case "offtrack":
      return ROUTE_LINE_STYLE_OFFTRACK;
    default:
      return ROUTE_LINE_STYLE_UNKNOWN;
  }
};

const drawFragments = (
  analysisId: string,
  routeLayers: RouteLayers,
  fragments: RouteFragments,
  selectedPolyline: Selected | null,
  selectPolyline: (id: string, analysisId: string) => void
) => {
  routeLayers.offtrackMarkersLayer.clearLayers();
  routeLayers.offtrackFragmentsLayer.clearLayers();
  routeLayers.ontrackMarkersLayer.clearLayers();
  routeLayers.ontrackFragmentsLayer.clearLayers();

  fragments.forEach((fragment) => {
    const style = {
      ...ROUTE_LINE_STYLE_BASE,
      ...getRouteLineStyle(fragment.type),
      ...(selectedPolyline?.id === fragment.id ? ROUTE_LINE_HOVER : {}),
    };

    const polyline = L.polyline(fragment.latLngs, style);

    polyline
      .on("click", function (e) {
        selectPolyline(fragment.id, analysisId);

        // const exitPoint = fragment[0];
        // const entryPoint = fragment[fragment.length - 1];

        // L.marker([exitPoint.lat, exitPoint.lng])
        //     .addTo(routeLayers.offtrackMarkersLayer)
        //     .bindTooltip(exitPoint.meta.time.toString(), OFFTRACK_POINT_TOOLTIP_OPTIONS);

        // L.marker([entryPoint.lat, entryPoint.lng])
        //     .addTo(routeLayers.offtrackMarkersLayer)
        //     .bindTooltip(entryPoint.meta.time.toString(), OFFTRACK_POINT_TOOLTIP_OPTIONS);
      })
      .on("mouseover", function (e) {
        polyline.setStyle({ ...style, ...ROUTE_LINE_HOVER });
      })
      .on("mouseout", function (e) {
        polyline.setStyle(style);
      })
      .addTo(routeLayers.offtrackFragmentsLayer);
  });
};

export const AnalysisDrawer = () => {
  const { map } = useLeaflet();
  const analyses = useSelector(getRoutesAnalysis);
  const { layers } = useContext(RouteLayersContext);
  const routes = useSelector(getRoutes);
  const trackEmpty = !Object.keys(analyses).length;

  const dispatch = useDispatch();
  const selectPolylineFn = useCallback(
    (id, analysisId) => dispatch(selectPolylineAction(id, analysisId)),
    [dispatch]
  );
  const selectedPolyline = useSelector(getSelectedPolyline);

  useEffect(() => {
    if (!map) {
      return;
    }

    for (let [key, route] of Object.entries(routes)) {
      const routeLayers = layers[route.id];

      if (!routeLayers?.gpx) {
        continue;
      }

      const polylineLayer = getPolylineLayer(routeLayers.gpx);

      if (!polylineLayer) {
        throw new Error("Polyline layer not found in route.");
      }

      if (!trackEmpty) {
        // Tracks replace the original polyline
        map.removeLayer(polylineLayer);
      }

      if (trackEmpty && !map.hasLayer(polylineLayer)) {
        map.addLayer(polylineLayer);
      }

      const analysis = analyses[key] || [];

      // Do not draw offtrack fragments if the track is empty, this is purely visual
      drawFragments(
        key,
        routeLayers,
        analysis,
        selectedPolyline,
        selectPolylineFn
      );
    }
  }, [
    map,
    analyses,
    selectedPolyline,
    routes,
    layers,
    trackEmpty,
    selectPolylineFn,
  ]);

  return null;
};
