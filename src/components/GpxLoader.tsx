import React, { useContext, useEffect } from 'react'
import { useLeaflet } from 'react-leaflet';

import L, { LeafletEvent, GPXOptions } from 'leaflet';
import 'leaflet-gpx';

import pinIconStart from 'leaflet-gpx/pin-icon-start.png';
import pinIconEnd from 'leaflet-gpx/pin-icon-end.png';
import pinShadow from 'leaflet-gpx/pin-shadow.png';
import { gpxRouteContext } from '../state/gpxRouteContext';
import { getPolylineLayer } from '../utils/getPolylineLayer';
import { ROUTE_LINE_STYLE } from './leafletElementStyles';

// const testGpxContent = require('../test-data/13_paź_2019_09_06_10_1570956876047.gpx');
const testGpxContent = require('../test-data/route-1.gpx');

/**
 * ts-ignore's because the modules released on npm are outdated
 */
const options: GPXOptions = {
    async: true,
    gpx_options: {
        // @ts-ignore
        joinTrackSegments: true
    },
    marker_options: {
        // @ts-ignore
        startIconUrl: pinIconStart,
        endIconUrl: pinIconEnd,
        shadowUrl: pinShadow
    },
    polyline_options: ROUTE_LINE_STYLE
};

export const GpxLoader: React.FC = () => {
    const { map } = useLeaflet();
    const { routeRaw, setRouteRaw, setRoute } = useContext(gpxRouteContext);

    useEffect(() => {
        setRouteRaw(testGpxContent);
    }, []);

    useEffect(() => {
        if (!map) {
            return;
        }

        if (!routeRaw) {
            return;
        }

        new L.GPX(routeRaw, options).on('loaded', (e: LeafletEvent) => {
            if (!map) {
                return;
            }

            setRoute(e.target);

            // Get all layers created from the GPX data. One of those is instanceof L.Polyline
            const polylineLayer = getPolylineLayer(e.target);

            if (!polylineLayer) {
                return;
            }

            map.fitBounds(e.target.getBounds());
        }).addTo(map);
    }, [map, routeRaw]);

    return null;
};
