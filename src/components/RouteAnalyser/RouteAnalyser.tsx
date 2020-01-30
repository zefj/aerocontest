import React, { useContext, useEffect } from 'react';
import { gpxRouteContext } from '../../state/gpxRouteContext';
import { useLeaflet } from 'react-leaflet';
import L, { GPX, LayerEvent, Layer } from 'leaflet';

import lineSplit, { Splitter } from '@turf/line-split';
import booleanPointInPolygon from '@turf/boolean-point-in-polygon';
import circle from '@turf/circle';
import { lineString, point, GeometryCollection, FeatureCollection, Geometry, Feature, MultiPoint, LineString, MultiLineString, Polygon } from '@turf/helpers';
import { trackContext } from '../../state/trackContext';


const getPolylineLayer = (route: GPX): L.Polyline | null => {
    // Types seem to be incorrect, route.getLayers()[0] is instanceof L.FeatureGroup
    const layers = (route.getLayers()[0] as L.FeatureGroup).getLayers();

    for (let layer of layers) {
        if (!(layer instanceof L.Polyline)) {
            continue;
        }

        return layer;
    }

    return null;
};

var lineStyle = {
    color: "#06CB13",
    weight: 4,
};

const splitGroup = new L.LayerGroup();

const polygonToGeoJSON = (polygon: L.Layer) => {
    if (polygon instanceof L.Circle) {
        return circle(
            polygon.toGeoJSON().geometry.coordinates,
            polygon.getRadius(),
            {steps: 10, units: 'meters'}
        );
    } else if (polygon instanceof L.Polygon) {
        return polygon.toGeoJSON();
    }

    throw new Error('Could not transform polygon to geojson data, unknown Layer type.');
};

/**
 * Credit: https://bl.ocks.org/rveciana/e0565ca3bfcebedb12bbc2d4edb9b6b3
 * TODO: figure out a more descriptive name
 */
const handleUpdate = (
    polyline: Feature<LineString | MultiLineString, any>,
    track: L.FeatureGroup,
    map: L.Map,
) => {
    splitGroup.clearLayers();

    // const polygons = track.toGeoJSON() as FeatureCollection;

    track.getLayers().forEach((polygon: L.Layer) => {
        const geoJsonPolygon = polygonToGeoJSON(polygon);

        let split = lineSplit(polyline as any, geoJsonPolygon as any);

        let oddPair: number;
        // TODO: Leaflet types are very inaccurate, fix the any casts
        if (booleanPointInPolygon(point(polyline.geometry.coordinates[0] as any), geoJsonPolygon as any)) {
            oddPair = 0;
        } else {
            oddPair = 1;
        }

        // Note: this will add overlaying lines in case there are overlapping polygons. If this happens to be an issue, 
        // find a way to merge polygons, or lines.
        split.features.forEach((splittedPart, i) => {
            if ((i + oddPair) % 2 === 0) {
                L.geoJSON(splittedPart.geometry, { style: lineStyle }).addTo(splitGroup);
            }
        });
    });
};

export const RouteAnalyser: React.FC = () => {
    const { map } = useLeaflet();
    const { route } = useContext(gpxRouteContext);
    const { track } = useContext(trackContext);

    useEffect(() => {
        if (!map) {
            return;
        }

        if (!route) {
            return;
        }

        if (!track) {
            return;
        }

        map.addLayer(splitGroup);

        const polylineLayer = getPolylineLayer(route);

        if (!polylineLayer) {
            throw new Error('Polyline layer not found.');
        }

        const polyline = polylineLayer.toGeoJSON();

        track.on('layeradd layerremove', (e: LayerEvent) => handleUpdate(polyline, track, map));
        // TODO: figure out if this event can be fired on track 
        map.on(L.Draw.Event.EDITED, (e: LayerEvent) => handleUpdate(polyline, track, map));
    }, [map, route, track]);

    return null;
};