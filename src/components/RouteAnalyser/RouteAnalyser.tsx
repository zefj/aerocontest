import React, { useContext, useEffect } from 'react';
import { Route, RoutesContext } from '../../state/routesContext';
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
import { useRoutes } from '../../hooks/useRoutes';

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

export type RouteAnalysis = {
    ontrackFragments: TrackFragments,
    offtrackFragments: TrackFragments,
};

const performRouteAnalysis = (
    routePolyline: L.Polyline,
    track: L.FeatureGroup,
): RouteAnalysis => {
    const ontrackFragments: TrackFragments = [];
    const offtrackFragments: TrackFragments = [];
    
    let lastPoint: 'offtrack' | 'ontrack' | null = null;

    routePolyline.getLatLngs().forEach((routePoint: LatLng | LatLng[] | LatLng[][]) => {
        const p = routePoint as GPXLatLng;
        const pointFeature = point([p.lng, p.lat]);

        for (let polygon of track.getLayers()) {
            const geoJsonPolygon = polygonToGeoJSON(polygon);

            if (booleanPointInPolygon(pointFeature, geoJsonPolygon as any)) {
                let fragment: GPXLatLng[] = [];

                if (ontrackFragments.length) {
                    fragment = ontrackFragments[ontrackFragments.length - 1];
                } else {
                    ontrackFragments.push(fragment);
                }

                if (lastPoint === 'offtrack') {
                    // Start a new offtrack fragment
                    offtrackFragments.push([]);
                }

                lastPoint = 'ontrack';

                return fragment.push(p);
            }
        }

        let fragment: GPXLatLng[] = [];

        if (offtrackFragments.length) {
            fragment = offtrackFragments[offtrackFragments.length - 1];
        } else {
            offtrackFragments.push(fragment);
        }

        if (lastPoint === 'ontrack') {
            // Start a new offtrack fragment
            ontrackFragments.push([]);
        }

        lastPoint = 'offtrack';

        fragment.push(p);
    });

    return { offtrackFragments, ontrackFragments };
};

interface GPXLatLng extends LatLng {
    meta: {
        time: Date,
    }
}

type TrackFragments = GPXLatLng[][];

const analyseRoutes = (
    routes: Route[],
    track: L.FeatureGroup,
    onRouteAnalysed: RoutesContext['routeAnalysed'],
): void => {
    console.log('Running analysis...');

    const trackEmpty = track.getLayers().length === 0;

    routes.forEach((route) => {
        if (!route.gpx) {
            return;
        }

        const polylineLayer = getPolylineLayer(route.gpx);

        if (!polylineLayer) {
            throw new Error('Polyline layer not found in route.');
        }

        const routeAnalysis = performRouteAnalysis(polylineLayer, track);
        // onRouteAnalysed(route.name, routeAnalysis);

        const { offtrackFragments, ontrackFragments } = routeAnalysis;
        
        if (!trackEmpty) {
            polylineLayer.setStyle(ROUTE_LINE_STYLE_ONTRACK);
        } else {
            // There are no offtracks without tracks, reset the route line style to neutral
            polylineLayer.setStyle(ROUTE_LINE_STYLE);
        }

        // Do not draw offtrack fragments if the track is empty, this is purely visual
        drawOfftrackElements(route, !trackEmpty ? offtrackFragments : []);
    });
};

const drawOfftrackElements = (route: Route, offtrackFragments: TrackFragments) => {
    route.offtrackMarkersLayer.clearLayers();
    route.offtrackFragmentsLayer.clearLayers();

    offtrackFragments.forEach((fragment) => {
        if (fragment.length < 2) {
            return;
        }

        const exitPoint = fragment[0];
        const entryPoint = fragment[fragment.length - 1];

        L.marker([exitPoint.lat, exitPoint.lng])
            .addTo(route.offtrackMarkersLayer)
            .bindTooltip(exitPoint.meta.time.toString(), OFFTRACK_POINT_TOOLTIP_OPTIONS);

        L.marker([entryPoint.lat, entryPoint.lng])
            .addTo(route.offtrackMarkersLayer)
            .bindTooltip(entryPoint.meta.time.toString(), OFFTRACK_POINT_TOOLTIP_OPTIONS);

        L.polyline(offtrackFragments, ROUTE_LINE_STYLE_OFFTRACK).addTo(route.offtrackFragmentsLayer);
    });
};

export const RouteAnalyser: React.FC = () => {
    const { map } = useLeaflet();
    const { track } = useContext(trackContext);
    const { routes, routeAnalysed } = useRoutes();

    useEffect(() => {
        if (!map) {
            return;
        }

        if (!routes.length) {
            return;
        }

        if (!track) {
            return;
        }
console.log('effect');
        // Run initial analysis
        analyseRoutes(routes, track, routeAnalysed);

        track.on('layeradd layerremove', (e: LayerEvent) => analyseRoutes(routes, track, routeAnalysed));
        // TODO: figure out if this event can be fired on track
        map.on(L.Draw.Event.EDITED, (e: LayerEvent) => analyseRoutes(routes, track, routeAnalysed));
    }, [map, routes, track]);

    return null;
};
