import React, { useContext, useEffect } from 'react';
import { gpxRouteContext } from '../../state/gpxRouteContext';
import { useLeaflet } from 'react-leaflet';
import L, { LayerEvent, LatLng } from 'leaflet';

import booleanPointInPolygon from '@turf/boolean-point-in-polygon';
import circle from '@turf/circle';
import { point } from '@turf/helpers';
import { trackContext } from '../../state/trackContext';
import { getPolylineLayer } from '../../utils/getPolylineLayer';
import {
    OFFTRACK_POINT_TOOLTIP_OPTIONS,
    ROUTE_LINE_STYLE,
    ROUTE_LINE_STYLE_OFFTRACK,
    ROUTE_LINE_STYLE_ONTRACK
} from '../leafletElementStyles';

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

type PointAnalysis = {
    state: 'offtrack' | 'ontrack',
    point: GPXLatLng
};

type RouteAnalysis = PointAnalysis[];

const performRouteAnalysis = (
    routePolyline: L.Polyline,
    track: L.FeatureGroup,
): RouteAnalysis => {
    const analysis: RouteAnalysis = [];

    routePolyline.getLatLngs().forEach((routePoint: LatLng | LatLng[] | LatLng[][]) => {
        const p = routePoint as GPXLatLng;
        const pointFeature = point([p.lng, p.lat]);

        for (let polygon of track.getLayers()) {
            const geoJsonPolygon = polygonToGeoJSON(polygon);

            if (booleanPointInPolygon(pointFeature, geoJsonPolygon as any)) {
                analysis.push({
                    state: 'ontrack',
                    point: p,
                });

                return;
            }
        }

        analysis.push({
            state: 'offtrack',
            point: p,
        });
    });

    return analysis;
};

interface GPXLatLng extends LatLng {
    meta: {
        time: Date,
    }
}

type OfftrackFragments = GPXLatLng[][];

const getOfftrackFragments = (analysis: RouteAnalysis): OfftrackFragments => {
    const fragments: OfftrackFragments = [];

    analysis.forEach((pointAnalysis, i) => {
        let fragment = fragments.length ? fragments[fragments.length - 1] : [];

        if (pointAnalysis.state === 'offtrack') {
            // Start a new fragment when crossing a polygon boundary
            // This is to ensure correct behaviour when there are polygons that do not overlap
            if (!analysis[i - 1] || analysis[i - 1].state === 'ontrack') {
                fragment = [];
                fragments.push(fragment);
            }

            return fragment.push(pointAnalysis.point);
        }
    });

    return fragments;
};

const analyze = (
    route: L.GPX,
    track: L.FeatureGroup,
): void => {
    const polylineLayer = getPolylineLayer(route);

    if (!polylineLayer) {
        throw new Error('Polyline layer not found in route.');
    }

    const analysis = performRouteAnalysis(polylineLayer, track);

    let offrouteFragments: OfftrackFragments = [];

    if (track.getLayers().length !== 0) {
        polylineLayer.setStyle(ROUTE_LINE_STYLE_ONTRACK);
        offrouteFragments = getOfftrackFragments(analysis);
    } else {
        // There are no offtracks without tracks, reset the route line style to neutral
        polylineLayer.setStyle(ROUTE_LINE_STYLE);
    }

    drawOfftrackFragments(offrouteFragments);
};

const offrouteStartEndMarkers = new L.LayerGroup();

const drawOfftrackFragments = (offrouteFragments: OfftrackFragments) => {
    offrouteStartEndMarkers.clearLayers();

    offrouteFragments.forEach((fragment) => {
        if (fragment.length < 2) {
            return;
        }

        const exitPoint = fragment[0];
        const entryPoint = fragment[fragment.length - 1];

        L.marker([exitPoint.lat, exitPoint.lng])
            .addTo(offrouteStartEndMarkers)
            .bindTooltip(exitPoint.meta.time.toString(), OFFTRACK_POINT_TOOLTIP_OPTIONS);

        L.marker([entryPoint.lat, entryPoint.lng])
            .addTo(offrouteStartEndMarkers)
            .bindTooltip(entryPoint.meta.time.toString(), OFFTRACK_POINT_TOOLTIP_OPTIONS);

        L.polyline(offrouteFragments, ROUTE_LINE_STYLE_OFFTRACK).addTo(offrouteStartEndMarkers);
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
        map.addLayer(offrouteStartEndMarkers);
        // Run initial analysis
        analyze(route, track);

        track.on('layeradd layerremove', (e: LayerEvent) => analyze(route, track));
        // TODO: figure out if this event can be fired on track
        map.on(L.Draw.Event.EDITED, (e: LayerEvent) => analyze(route, track));
    }, [map, route, track]);

    return null;
};
