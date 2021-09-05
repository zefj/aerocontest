import L from "leaflet";
import { v4 as uuidv4 } from "uuid";

import booleanPointInPolygon from "@turf/boolean-point-in-polygon";
import circle from "@turf/circle";
import { point } from "@turf/helpers";
import { getPolylineLayer } from "./getPolylineLayer";
import {
  RoutesAnalysis,
  RoutesLayers,
  GPXLatLng,
  RouteFragments,
  Routes,
  RouteFragment,
} from "../types/routes";

const polygonToGeoJSON = (polygon: L.Layer) => {
  if (polygon instanceof L.Circle) {
    return circle(
      polygon.toGeoJSON().geometry.coordinates,
      polygon.getRadius(),
      { steps: 10, units: "meters" }
    );
  } else if (polygon instanceof L.Polygon) {
    return polygon.toGeoJSON();
  } else if (polygon instanceof L.Polyline) {
    const convertedPolygon = new L.Polygon(polygon.getLatLngs());
    return convertedPolygon.toGeoJSON();
  }

  return null;
};

const analysePoint = (
  routePoint: GPXLatLng,
  track: L.FeatureGroup
): boolean => {
  const layers = track.getLayers();

  for (let i = 0; i < layers.length; i++) {
    const layer = layers[i];

    let inTrack = false;

    if (layer instanceof L.FeatureGroup) {
      // recurse for FeatureGroups
      inTrack = analysePoint(routePoint, layer);
    }

    if (layer instanceof L.Path) {
      const pointFeature = point([routePoint.lng, routePoint.lat]);
      const geoJsonPolygon = polygonToGeoJSON(layer);

      if (geoJsonPolygon === null) {
        continue;
      }

      inTrack = booleanPointInPolygon(pointFeature, geoJsonPolygon as any);
    }

    if (!inTrack) {
      continue;
    }

    return inTrack;
  }

  return false;
};

const performRouteAnalysis = (
  routePolyline: L.Polyline,
  track: L.FeatureGroup
): RouteFragments => {
  const routeLatLngs = routePolyline.getLatLngs();
  const fragments: RouteFragments = [];

  for (let i = 0; i < routeLatLngs.length; i++) {
    const currentPoint = routeLatLngs[i] as GPXLatLng;
    const nextPoint = routeLatLngs[i + 1] as GPXLatLng;
    const timeDelta = nextPoint
      ? nextPoint?.meta.time.valueOf() - currentPoint.meta.time.valueOf()
      : 0;

    const pointOnTrack = analysePoint(currentPoint, track);

    let lastFragment = fragments[fragments.length - 1];

    if (!lastFragment) {
      lastFragment = {
        id: uuidv4(),
        type: pointOnTrack ? "ontrack" : "offtrack",
        latLngs: [],
      };

      fragments.push(lastFragment);
    }

    if (timeDelta > 10000) {
      lastFragment.latLngs.push(currentPoint);
      const fragment: RouteFragment = {
        id: uuidv4(),
        type: "unknown",
        latLngs: [],
      };
      fragments.push(fragment);

      fragment.latLngs.push(currentPoint);
    } else if (pointOnTrack) {
      let fragment = lastFragment;

      if (lastFragment.type === "offtrack" || lastFragment.type === "unknown") {
        lastFragment.latLngs.push(currentPoint);
        fragment = {
          id: uuidv4(),
          type: "ontrack",
          latLngs: [],
        };
        fragments.push(fragment);
      }

      fragment.latLngs.push(currentPoint);
    } else {
      let fragment = lastFragment;

      if (lastFragment.type === "ontrack" || lastFragment.type === "unknown") {
        lastFragment.latLngs.push(currentPoint);
        fragment = {
          id: uuidv4(),
          type: "offtrack",
          latLngs: [],
        };
        fragments.push(fragment);
      }

      fragment.latLngs.push(currentPoint);
    }
  }

  return fragments.filter((e) => e.latLngs.length > 0);
};

export const analyseRoutes = (
  entries: Routes,
  layers: RoutesLayers,
  track: L.FeatureGroup
): RoutesAnalysis => {
  console.log("Running analysis...");

  const trackEmpty = track.getLayers().length === 0;
  let analyses = {};

  if (trackEmpty) {
    return analyses;
  }

  // TODO: switch to entries and drop layers argument
  for (let [, route] of Object.entries(entries)) {
    const routeLayers = layers[route.id];

    if (!routeLayers?.gpx) {
      continue;
    }

    const polylineLayer = getPolylineLayer(routeLayers.gpx);

    if (!polylineLayer) {
      throw new Error("Polyline layer not found in route.");
    }

    const routeAnalysis = performRouteAnalysis(polylineLayer, track);

    analyses = {
      ...analyses,
      [route.id]: routeAnalysis,
    };
  }

  return analyses;
};
