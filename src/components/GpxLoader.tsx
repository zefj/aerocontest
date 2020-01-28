import React, { useLayoutEffect } from 'react'
import { useLeaflet } from 'react-leaflet';

import L, { LeafletEvent, GPXOptions } from 'leaflet';

import pinIconStart from 'leaflet-gpx/pin-icon-start.png';
import pinIconEnd from 'leaflet-gpx/pin-icon-end.png';
import pinShadow from 'leaflet-gpx/pin-shadow.png';

const testGpxContent = require('../test-data/13_paź_2019_09_06_10_1570956876047.gpx');

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
    }
};

export const GpxLoader: React.FC = () => {
    const context = useLeaflet();

    useLayoutEffect(() => {
        if (!context.map) {
            return;
        }

        new L.GPX(testGpxContent, options).on('loaded', (e: LeafletEvent) => {
            if (!context.map) {
                return;
            }
    
            context.map.fitBounds(e.target.getBounds());
        }).addTo(context.map);
    }, [context.map]);

    return null;
};