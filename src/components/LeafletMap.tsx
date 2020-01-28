import React, { useState } from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import { LatLngExpression } from 'leaflet';

import './LeafletMap.scss';
import { GpxLoader } from './GpxLoader';

export const LeafletMap: React.FC = () => {
    const [position] = useState<LatLngExpression>({
        lat: 51.505,
        lng: -0.09,
    });

    const [zoom] = useState<number>(13);

    // const context = useLeaflet();

    // // Make leaflet acknowledge the container size, otherwise it wont render all tiles
    // useLayoutEffect(() => {
    //     if (!context.map) {
    //         return;
    //     }

    //     context.map.invalidateSize();
    // }, [context.map]);

    return (
        <div className="map-container">
            <Map center={position} zoom={zoom} zoomControl={false}>
                <TileLayer
                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <GpxLoader />
                <Marker position={position}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
            </Map>
        </div>
    )
};
