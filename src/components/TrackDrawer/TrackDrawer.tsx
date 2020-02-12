import React, { useEffect, useContext } from 'react';
import { useLeaflet } from 'react-leaflet';

import L, { Control, DrawEvents } from 'leaflet';

import 'leaflet-draw';
import { trackContext } from '../../state/trackContext';

const track = new L.FeatureGroup();

const options: Control.DrawConstructorOptions = {
    position: 'topleft',
    draw: {
        polyline: false,
        marker: false,
        circlemarker: false,
    },
    edit: {
        featureGroup: track,
    }
};

const drawControl = new L.Control.Draw(options);

type TrackDrawerProps = {
    drawingMode?: boolean,
}

export const TrackDrawer = ({ drawingMode = false }: TrackDrawerProps) => {
    const { map } = useLeaflet();
    const { setTrack } = useContext(trackContext);

    useEffect(() => {
        if (!map) {
            return;
        }

        setTrack(track);

        map.addLayer(track);
    }, [map]);

    useEffect(() => {
        if (!map) {
            return;
        }

        if (drawingMode) {
            map.addControl(drawControl);
        } else {
            map.removeControl(drawControl);
        }
    }, [map, drawingMode]);

    useEffect(() => {
        if (!map) {
            return;
        }

        map.on(L.Draw.Event.CREATED, (e: any) => {
            // The event is actually DrawEvents.Created, but there is no matching definition for the `on` method,
            // which makes typescript complain about no matching overload. TODO I guess?
            const event: DrawEvents.Created = e;
            const layer = event.layer;

            track.addLayer(layer);
        });
    }, [map]);

    return null;
};
