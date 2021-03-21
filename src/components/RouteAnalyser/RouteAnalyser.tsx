import React, { useCallback, useContext, useEffect, useMemo } from 'react';
import { useLeaflet } from 'react-leaflet';
import L, { LayerEvent, LatLng } from 'leaflet';

import booleanPointInPolygon from '@turf/boolean-point-in-polygon';
import circle from '@turf/circle';
import { point } from '@turf/helpers';
import { getPolylineLayer } from '../../utils/getPolylineLayer';
import {
    OFFTRACK_POINT_TOOLTIP_OPTIONS,
    ROUTE_LINE_STYLE,
    ROUTE_LINE_STYLE_OFFTRACK,
    ROUTE_LINE_STYLE_ONTRACK
} from '../leafletElementStyles';
import { useDispatch, useSelector } from 'react-redux';
import { routeAnalysed } from '../../state/routes/routesActions';
import { RouteFragments, RouteLayers, RoutesLayers } from '../../types/routes';
import { getLayers } from '../../state/routes/routesReducer';
import { getTrack } from '../../state/track/trackReducer';

const polygonToGeoJSON = (polygon: L.Layer) => {
    if (polygon instanceof L.Circle) {
        return circle(
            polygon.toGeoJSON().geometry.coordinates,
            polygon.getRadius(),
            {steps: 10, units: 'meters'}
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
    track: L.FeatureGroup,
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
    track: L.FeatureGroup,
): RouteFragments => {
    const ontrackFragments: TrackFragments = [];
    const offtrackFragments: TrackFragments = [];

    let lastPoint: 'offtrack' | 'ontrack' | null = null;

    const routeLatLngs = routePolyline.getLatLngs();

    for (let i = 0; i < routeLatLngs.length; i++) {
        const p = routeLatLngs[i] as GPXLatLng;

        const pointOnTrack = analysePoint(p, track);

        if (!offtrackFragments.length) {
            offtrackFragments.push([]);
        }

        if (!ontrackFragments.length) {
            ontrackFragments.push([]);
        }

        const lastOntrackFragment = ontrackFragments[ontrackFragments.length - 1];
        const lastOfftrackFragment = offtrackFragments[offtrackFragments.length - 1];

        if (pointOnTrack) {
            if (lastPoint === 'offtrack') {
                // finish the offtrack fragment
                lastOfftrackFragment.push(p);
                // Start a new offtrack fragment
                offtrackFragments.push([]);
            }
            
            lastPoint = 'ontrack';
            lastOntrackFragment.push(p);
        } else {
            if (lastPoint === 'ontrack') {
                // finish the offtrack fragment
                lastOntrackFragment.push(p);
                // Start a new ontrack fragment
                ontrackFragments.push([]);
            }

            lastPoint = 'offtrack';
            lastOfftrackFragment.push(p);
        }
    }

    // routePolyline.getLatLngs().forEach((routePoint: LatLng | LatLng[] | LatLng[][]) => {
    //     const p = routePoint as GPXLatLng;
    //
    //     const pointOnTrack = analysePoint(p, track);
    //     let fragment: GPXLatLng[] = [];
    //
    //     if (pointOnTrack) {
    //         if (ontrackFragments.length) {
    //             fragment = ontrackFragments[ontrackFragments.length - 1];
    //         } else {
    //             ontrackFragments.push(fragment);
    //         }
    //
    //         if (lastPoint === 'offtrack') {
    //             // Start a new offtrack fragment
    //             offtrackFragments.push([]);
    //         }
    //
    //         lastPoint = 'ontrack';
    //
    //         fragment.push(p);
    //     } else {
    //         if (offtrackFragments.length) {
    //             fragment = offtrackFragments[offtrackFragments.length - 1];
    //         } else {
    //             offtrackFragments.push(fragment);
    //         }
    //
    //         if (lastPoint === 'ontrack') {
    //             // Start a new ontrack fragment
    //             ontrackFragments.push([]);
    //         }
    //
    //         lastPoint = 'offtrack';
    //
    //         fragment.push(p);
    //     }

        // const pointFeature = point([p.lng, p.lat]);
        //
        // for (let polygon of track.getLayers()) {
        //     const geoJsonPolygon = polygonToGeoJSON(polygon);
        //
        //     if (geoJsonPolygon === null) {
        //         continue;
        //     }
        //
        //     if (booleanPointInPolygon(pointFeature, geoJsonPolygon as any)) {
        //         let fragment: GPXLatLng[] = [];
        //
        //         if (ontrackFragments.length) {
        //             fragment = ontrackFragments[ontrackFragments.length - 1];
        //         } else {
        //             ontrackFragments.push(fragment);
        //         }
        //
        //         if (lastPoint === 'offtrack') {
        //             // Start a new offtrack fragment
        //             offtrackFragments.push([]);
        //         }
        //
        //         lastPoint = 'ontrack';
        //
        //         return fragment.push(p);
        //     }
        // }
        //
        // let fragment: GPXLatLng[] = [];
        //
        // if (offtrackFragments.length) {
        //     fragment = offtrackFragments[offtrackFragments.length - 1];
        // } else {
        //     offtrackFragments.push(fragment);
        // }
        //
        // if (lastPoint === 'ontrack') {
        //     // Start a new offtrack fragment
        //     ontrackFragments.push([]);
        // }
        //
        // lastPoint = 'offtrack';
        //
        // fragment.push(p);
    // });

    return {
        // Filter empty fragments, if any
        offtrackFragments: offtrackFragments.filter((e) => e.length > 0),
        ontrackFragments: ontrackFragments.filter((e) => e.length > 0),
    };
};

export interface GPXLatLng extends LatLng {
    meta: {
        time: Date,
    }
}

export type TrackFragments = GPXLatLng[][];

const analyseRoutes = (
    map: L.Map,
    routes: RoutesLayers,
    track: L.FeatureGroup,
    onRouteAnalysed: any,
): void => {
    console.log('Running analysis...');

    const trackEmpty = track.getLayers().length === 0;

    for (let [key, route] of Object.entries(routes)) {
        if (!route.gpx) {
            return;
        }

        const polylineLayer = getPolylineLayer(route.gpx);

        if (!polylineLayer) {
            throw new Error('Polyline layer not found in route.');
        }

        const routeAnalysis = performRouteAnalysis(polylineLayer, track);
        onRouteAnalysed(key, routeAnalysis);

        const {offtrackFragments, ontrackFragments} = routeAnalysis;

        if (!trackEmpty) {
            // Tracks replace the original polyline
            map.removeLayer(polylineLayer);
        }

        if (trackEmpty && !map.hasLayer(polylineLayer)) {
            map.addLayer(polylineLayer);
        }

        // Do not draw offtrack fragments if the track is empty, this is purely visual
        drawOfftrackElements(route, !trackEmpty ? offtrackFragments : []);
        drawOntrackElements(route, !trackEmpty ? ontrackFragments : []);
    }
};

const drawOfftrackElements = (route: RouteLayers, offtrackFragments: TrackFragments) => {
    route.offtrackMarkersLayer.clearLayers();
    route.offtrackFragmentsLayer.clearLayers();

    offtrackFragments.forEach((fragment) => {
        if (fragment.length < 2) {
            return;
        }

        // const exitPoint = fragment[0];
        // const entryPoint = fragment[fragment.length - 1];

        // L.marker([exitPoint.lat, exitPoint.lng])
        //     .addTo(route.offtrackMarkersLayer)
            // .bindTooltip(exitPoint.meta.time.toString(), OFFTRACK_POINT_TOOLTIP_OPTIONS);

        // L.marker([entryPoint.lat, entryPoint.lng])
        //     .addTo(route.offtrackMarkersLayer)
            // .bindTooltip(entryPoint.meta.time.toString(), OFFTRACK_POINT_TOOLTIP_OPTIONS);

        L.polyline(offtrackFragments, ROUTE_LINE_STYLE_OFFTRACK).addTo(route.offtrackFragmentsLayer);
    });
};

const drawOntrackElements = (route: RouteLayers, ontrackFragments: TrackFragments) => {
    route.ontrackMarkersLayer.clearLayers();
    route.ontrackFragmentsLayer.clearLayers();

    ontrackFragments.forEach((fragment) => {
        if (fragment.length < 2) {
            return;
        }

        // const exitPoint = fragment[0];
        // const entryPoint = fragment[fragment.length - 1];

        // L.marker([exitPoint.lat, exitPoint.lng])
        //     .addTo(route.ontrackMarkersLayer)
            // .bindTooltip(exitPoint.meta.time.toString(), OFFTRACK_POINT_TOOLTIP_OPTIONS);

        // L.marker([entryPoint.lat, entryPoint.lng])
        //     .addTo(route.ontrackMarkersLayer)
            // .bindTooltip(entryPoint.meta.time.toString(), OFFTRACK_POINT_TOOLTIP_OPTIONS);

        L.polyline(ontrackFragments, ROUTE_LINE_STYLE_ONTRACK).addTo(route.ontrackFragmentsLayer);
    });
};

const registerLeafletEventListeners = (
    map: L.Map | undefined,
    track: L.FeatureGroup<any> | null,
    callback: () => void
) => {
    if (!map) {
        return;
    }

    if (!track) {
        return;
    }

    console.log('Registering leaflet event listeners...');

    const eventHandler = (e: LayerEvent) => callback();

    // track.on('layeradd layerremove', (e: LayerEvent) => callback());
    map.on(L.Draw.Event.CREATED, eventHandler);
    map.on(L.Draw.Event.EDITED, eventHandler);
    map.on(L.Draw.Event.DELETED, eventHandler);
    map.on('TRACK_LOADED', eventHandler);

    return () => {
        // track.off('layeradd layerremove', eventHandler);
        map.off(L.Draw.Event.CREATED, eventHandler);
        map.off(L.Draw.Event.EDITED, eventHandler);
        map.off(L.Draw.Event.DELETED, eventHandler);
        map.off('TRACK_LOADED', eventHandler);
    };
};

// TODO: would it make sense if this worked on a single route passed via a prop?
// Upsides: nicer code, probably easier to manage
// Downsides: more event listeners
export const RouteAnalyser: React.FC = () => {
    const { map } = useLeaflet();
    const { layer: trackLayer } = useSelector(getTrack);
    const layers = useSelector(getLayers);

    const dispatch = useDispatch();

    const onRouteAnalysed = useCallback((id, analysis) => dispatch(routeAnalysed(id, analysis)), []);
    const runAnalysis = useCallback(
        () => {
            if (!map) {
                return;
            }

            if (!trackLayer) {
                return;
            }

            analyseRoutes(map, layers, trackLayer, onRouteAnalysed);
        },
        [layers, trackLayer]
    );

    useEffect(
        () => registerLeafletEventListeners(map, trackLayer, runAnalysis),
        [map, trackLayer, runAnalysis]
    );

    return null;
};
