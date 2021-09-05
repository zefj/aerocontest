import React, { useEffect, useContext, useMemo } from 'react';
import { useLeaflet } from 'react-leaflet';

import L, { Control, DrawEvents } from 'leaflet';

import 'leaflet-draw';
import { useSelector } from 'react-redux';
import { getTrack } from '../../state/track/trackReducer';

// const track = new L.FeatureGroup();
//
// const options: Control.DrawConstructorOptions = {
//     position: 'topleft',
//     draw: {
//         polyline: false,
//         marker: false,
//         circlemarker: false,
//     },
//     edit: {
//         featureGroup: track,
//     }
// };
//
// const drawControl = new L.Control.Draw(options);

let drawControl: L.Control.Draw | null;

export const TrackDrawer = () => {
    const { map } = useLeaflet();
    const { layer: trackLayer } = useSelector(getTrack);

    useEffect(() => {
        const options: Control.DrawConstructorOptions = {
            position: 'topleft',
            draw: {
                polyline: false,
                marker: false,
                circlemarker: false,
            },
            edit: {
                featureGroup: trackLayer,
            }
        };

        drawControl = new L.Control.Draw(options);
    }, [map]);

    useEffect(() => {
        if (!map) {
            return;
        }

        map.addLayer(trackLayer);
    }, [map]);

    useEffect(() => {
        if (!map) {
            return;
        }

        if (!drawControl) {
            return;
        }

        map.addControl(drawControl);
    }, [map, drawControl]);

    useEffect(() => {
        if (!map) {
            return;
        }

        map.on(L.Draw.Event.CREATED, (e: any) => {
            // The event is actually DrawEvents.Created, but there is no matching definition for the `on` method,
            // which makes typescript complain about no matching overload. TODO I guess?
            const event: DrawEvents.Created = e;
            const layer = event.layer;

            trackLayer.addLayer(layer);
        });
    }, [map]);

    return null;
};
