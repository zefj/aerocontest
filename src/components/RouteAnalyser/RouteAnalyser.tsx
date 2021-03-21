import React, { useCallback, useEffect } from 'react';
import { useLeaflet } from 'react-leaflet';
import L, { LayerEvent } from 'leaflet';

import booleanPointInPolygon from '@turf/boolean-point-in-polygon';
import circle from '@turf/circle';
import { point } from '@turf/helpers';
import { getPolylineLayer } from '../../utils/getPolylineLayer';
import { useDispatch, useSelector } from 'react-redux';
import { routesAnalysed } from '../../state/routes/routesActions';
import { RoutesAnalysis, RoutesLayers, GPXLatLng, RouteFragments } from '../../types/routes';
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
    const routeLatLngs = routePolyline.getLatLngs();
    const fragments: RouteFragments = [];

    for (let i = 0; i < routeLatLngs.length; i++) {
        const p = routeLatLngs[i] as GPXLatLng;

        const pointOnTrack = analysePoint(p, track);

        let lastFragment = fragments[fragments.length - 1];

        if (!lastFragment) {
            lastFragment = {
                type: pointOnTrack ? 'ontrack' : 'offtrack',
                latLngs: []
            };

            fragments.push(lastFragment);
        }

        if (pointOnTrack) {
            let fragment = lastFragment;

            if (lastFragment.type === 'offtrack') {
                lastFragment.latLngs.push(p);
                fragment = {
                    type: 'ontrack',
                    latLngs: []
                };
                fragments.push(fragment);
            }

            fragment.latLngs.push(p);
        } else {
            let fragment = lastFragment;

            if (lastFragment.type === 'ontrack') {
                lastFragment.latLngs.push(p);
                fragment = {
                    type: 'offtrack',
                    latLngs: []
                };
                fragments.push(fragment);
            }

            fragment.latLngs.push(p);
        }
    }

    return fragments.filter((e) => e.latLngs.length > 0);
};

const analyseRoutes = (
    routes: RoutesLayers,
    track: L.FeatureGroup,
): RoutesAnalysis => {
    console.log('Running analysis...');

    const trackEmpty = track.getLayers().length === 0;
    let analyses = {};

    if (trackEmpty) {
        return analyses;
    }

    for (let [key, route] of Object.entries(routes)) {
        if (!route.gpx) {
            continue;
        }

        const polylineLayer = getPolylineLayer(route.gpx);

        if (!polylineLayer) {
            throw new Error('Polyline layer not found in route.');
        }

        const routeAnalysis = performRouteAnalysis(polylineLayer, track);
        
        analyses = {
            ...analyses,
            [key]: routeAnalysis
        };
    }

    return analyses;
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
    const dispatch = useDispatch();

    const { map } = useLeaflet();
    const { layer: trackLayer } = useSelector(getTrack);
    const layers = useSelector(getLayers);

    const runAnalysis = useCallback(
        () => {
            if (!map) {
                return;
            }

            if (!trackLayer) {
                return;
            }

            const analyses = analyseRoutes(layers, trackLayer);

            dispatch(routesAnalysed(analyses));
        },
        [layers, trackLayer]
    );

    useEffect(
        () => registerLeafletEventListeners(map, trackLayer, runAnalysis),
        [map, trackLayer, runAnalysis]
    );

    return null;
};
