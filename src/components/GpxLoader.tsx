import React, { useEffect } from 'react'
import { useLeaflet } from 'react-leaflet';

import L, { GPXOptions } from 'leaflet';
import 'leaflet-gpx';

import pinIconStart from 'leaflet-gpx/pin-icon-start.png';
import pinIconEnd from 'leaflet-gpx/pin-icon-end.png';
import pinShadow from 'leaflet-gpx/pin-shadow.png';
import { ROUTE_LINE_STYLE } from './leafletElementStyles';
import { useDispatch, useSelector } from 'react-redux';
import { addRoute, routeParsed } from '../state/routes/routesActions';
import { Route, RouteLayers, RoutesLayers } from '../types/routes';
import { getLayers, getLayersAsArray, getRoutes } from '../state/routes/routesReducer';

const route1content = require('../test-data/13_paź_2019_09_06_10_1570956876047.gpx');
const route2content = require('../test-data/29_gru_2019_13_17_57_rec.gpx');

/**
 * ts-ignore's because the modules released on npm are outdated
 */
const options: GPXOptions = {
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

// TODO: consider moving to utils if needed elsewhere
const composeBounds = (layers: RouteLayers[]) => layers.reduce((carry: L.LatLngBounds | null, current: RouteLayers) => {
    if (!current.gpx) {
        return carry;
    }

    if (carry) {
        return carry.extend(current.gpx.getBounds());
    }

    return current.gpx.getBounds();
}, null);

export const GpxLoader: React.FC = () => {
    const { map } = useLeaflet();

    const routes = useSelector(getRoutes);
    const layers = useSelector(getLayers);
    const layersArray = useSelector(getLayersAsArray);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(addRoute('13_paź_2019_09_06_10_1570956876047.gpx', route1content));
        dispatch(addRoute('29_gru_2019_13_17_57_rec.gpx', route2content));
    }, []);

    useEffect(() => {
        if (!map) {
            return;
        }

        if (!routes) {
            return;
        }

        routes.forEach((route: Route) => {
            const routeLayers = layers[route.id];

            if (routeLayers.gpx) {
                return;
            }

            const gpx = new L.GPX(route.content, options);
            dispatch(routeParsed(route.id, gpx));

            gpx.addTo(routeLayers.layers);
            routeLayers.layers.addTo(map);
        });
    }, [map, routes]);

    useEffect(() => {
        if (!map) {
            return;
        }

        // This is probably only temporary so I don't have to pan the map on each refresh
        const bounds = composeBounds(layersArray);

        if (bounds) {
            map.fitBounds(bounds);
        }
    }, [map, layersArray]);

    return null;
};
