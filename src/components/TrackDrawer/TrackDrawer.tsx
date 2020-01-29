import React, { useEffect } from 'react';
import { useLeaflet } from 'react-leaflet';

import L, { Control, DrawEvents } from 'leaflet';

import 'leaflet-draw';

const editableLayers = new L.FeatureGroup();

const options: Control.DrawConstructorOptions = {
    position: 'topright',
    draw: {
        polyline: false,
        marker: false,
        circlemarker: false,
    },
    edit: {
        featureGroup: editableLayers,
    }
};

const drawControl = new L.Control.Draw(options);

export const TrackDrawer: React.FC = () => {
    const context = useLeaflet();

    useEffect(() => {
        if (!context.map) {
            return;
        }

        context.map.addControl(drawControl);
        context.map.addLayer(editableLayers);

        context.map.on(L.Draw.Event.CREATED, (e: any) => {
            // The event is actually DrawEvents.Created, but there is no matching definition for the `on` method,
            // which makes typescript complain about no matching overload. TODO I guess?
            const event: DrawEvents.Created = e;
            const layer = event.layer;
        
            editableLayers.addLayer(layer);
        });
    }, [context.map]);
    
    return null;
};
